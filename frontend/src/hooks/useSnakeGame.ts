import { useState, useCallback, useRef, useEffect } from 'react'

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface Point {
  x: number
  y: number
}

export type GameStatus = 'idle' | 'running' | 'paused' | 'gameover'

const BOARD_SIZE = 20
const INITIAL_SPEED = 200
const MIN_SPEED = 80
const SPEED_DECREMENT = 5
const SCORE_PER_FOOD = 10

function randomPoint(exclude: Point[]): Point {
  let p: Point
  do {
    p = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    }
  } while (exclude.some((e) => e.x === p.x && e.y === p.y))
  return p
}

function initialSnake(): Point[] {
  const mid = Math.floor(BOARD_SIZE / 2)
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ]
}

export function useSnakeGame() {
  const [snake, setSnake] = useState<Point[]>(initialSnake)
  const [food, setFood] = useState<Point>(() => randomPoint(initialSnake()))
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle')
  const [speed, setSpeed] = useState(INITIAL_SPEED)

  // Refs for use inside the interval
  const snakeRef = useRef<Point[]>(snake)
  const foodRef = useRef<Point>(food)
  const directionRef = useRef<Direction>(direction)
  const scoreRef = useRef<number>(score)
  const speedRef = useRef<number>(speed)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const gameStatusRef = useRef<GameStatus>(gameStatus)

  // Keep refs in sync
  snakeRef.current = snake
  foodRef.current = food
  directionRef.current = direction
  scoreRef.current = score
  speedRef.current = speed
  gameStatusRef.current = gameStatus

  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const tick = useCallback(() => {
    const currentSnake = snakeRef.current
    const currentFood = foodRef.current
    const currentDir = directionRef.current

    const head = currentSnake[0]
    let newHead: Point

    switch (currentDir) {
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 }
        break
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 }
        break
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y }
        break
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y }
        break
    }

    // Wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y < 0 ||
      newHead.y >= BOARD_SIZE
    ) {
      stopInterval()
      setGameStatus('gameover')
      return
    }

    // Self collision
    if (currentSnake.some((p) => p.x === newHead.x && p.y === newHead.y)) {
      stopInterval()
      setGameStatus('gameover')
      return
    }

    const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y

    if (ateFood) {
      const newSnake = [newHead, ...currentSnake]
      const newFood = randomPoint(newSnake)
      const newScore = scoreRef.current + SCORE_PER_FOOD
      const newSpeed = Math.max(MIN_SPEED, speedRef.current - SPEED_DECREMENT)

      setSnake(newSnake)
      setFood(newFood)
      setScore(newScore)
      setSpeed(newSpeed)

      // Restart interval with new speed
      stopInterval()
      intervalRef.current = setInterval(tick, newSpeed)
    } else {
      setSnake([newHead, ...currentSnake.slice(0, -1)])
    }
  }, [stopInterval])

  const startInterval = useCallback(
    (currentSpeed: number) => {
      stopInterval()
      intervalRef.current = setInterval(tick, currentSpeed)
    },
    [tick, stopInterval]
  )

  const startGame = useCallback(() => {
    setGameStatus((prev) => {
      if (prev === 'idle' || prev === 'gameover') {
        startInterval(speedRef.current)
        return 'running'
      }
      return prev
    })
  }, [startInterval])

  const resetGame = useCallback(() => {
    stopInterval()
    const fresh = initialSnake()
    setSnake(fresh)
    setFood(randomPoint(fresh))
    setDirection('RIGHT')
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setGameStatus('idle')
  }, [stopInterval])

  const changeDirection = useCallback((dir: Direction) => {
    setDirection((prev) => {
      // Block 180-degree reversals
      if (dir === 'UP' && prev === 'DOWN') return prev
      if (dir === 'DOWN' && prev === 'UP') return prev
      if (dir === 'LEFT' && prev === 'RIGHT') return prev
      if (dir === 'RIGHT' && prev === 'LEFT') return prev
      return dir
    })
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          if (gameStatusRef.current === 'idle' || gameStatusRef.current === 'gameover') {
            // Start game on any key
          }
          changeDirection('UP')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          changeDirection('DOWN')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          changeDirection('LEFT')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          changeDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [changeDirection])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopInterval()
    }
  }, [stopInterval])

  return {
    snake,
    food,
    direction,
    score,
    gameStatus,
    speed,
    changeDirection,
    startGame,
    resetGame,
  }
}
