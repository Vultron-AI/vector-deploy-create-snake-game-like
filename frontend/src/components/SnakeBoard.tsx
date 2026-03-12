import type { Point, GameStatus } from '@/hooks/useSnakeGame'

interface SnakeBoardProps {
  snake: Point[]
  food: Point
  gameStatus: GameStatus
  score: number
  personalBest: number
}

const BOARD_SIZE = 20

function isCellSnake(x: number, y: number, snake: Point[]): boolean {
  return snake.some((p) => p.x === x && p.y === y)
}

function isCellFood(x: number, y: number, food: Point): boolean {
  return food.x === x && food.y === y
}

export function SnakeBoard({ snake, food, gameStatus, score, personalBest }: SnakeBoardProps) {
  const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => {
    const x = i % BOARD_SIZE
    const y = Math.floor(i / BOARD_SIZE)
    return { x, y }
  })

  return (
    <div className="flex flex-col items-center select-none">
      {/* Title */}
      <h1
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          color: '#4afe4a',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '0.4em',
          marginBottom: '0.5rem',
          textShadow: '0 0 10px #4afe4a',
        }}
      >
        SNAKE
      </h1>

      {/* Nokia Bezel */}
      <div
        style={{
          background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          border: '2px solid #333',
        }}
      >
        {/* Score bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.75rem',
            color: '#4afe4a',
            padding: '0 4px',
          }}
        >
          <span data-testid="snake.score">SCR: {score}</span>
          <span data-testid="snake.personal-best">BEST: {personalBest}</span>
        </div>

        {/* Screen inset */}
        <div
          style={{
            background: '#1a2e1a',
            borderRadius: '8px',
            padding: '4px',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          {/* Game grid */}
          <div
            data-testid="snake.board"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              width: 'min(400px, 90vw)',
              height: 'min(400px, 90vw)',
              gap: '1px',
              background: '#0f1f0f',
            }}
          >
            {cells.map(({ x, y }) => {
              const isSnake = isCellSnake(x, y, snake)
              const isFood = isCellFood(x, y, food)
              const isHead = snake.length > 0 && snake[0].x === x && snake[0].y === y

              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    background: isHead
                      ? '#7aff7a'
                      : isSnake
                      ? '#4afe4a'
                      : isFood
                      ? '#ffee4a'
                      : '#1a2e1a',
                    boxShadow: isSnake
                      ? 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)'
                      : isFood
                      ? '0 0 4px #ffee4a'
                      : 'none',
                    borderRadius: isFood ? '50%' : '1px',
                    transition: 'background 0.05s',
                  }}
                />
              )
            })}
          </div>

          {/* Overlay text */}
          {(gameStatus === 'idle' || gameStatus === 'paused') && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: '#4afe4a',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  animation: 'blink 1.2s step-end infinite',
                }}
              >
                {gameStatus === 'idle' ? 'PRESS ANY KEY' : 'PAUSED'}
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes foodBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
