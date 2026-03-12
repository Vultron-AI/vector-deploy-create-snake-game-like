import { useState, useEffect, useCallback } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DialogProvider } from '@/components/ui'
import { useSnakeGame } from '@/hooks/useSnakeGame'
import { SnakeBoard } from '@/components/SnakeBoard'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { NameEntryModal } from '@/components/NameEntryModal'
import { leaderboardApi } from '@/services/leaderboardApi'
import type { LeaderboardEntry } from '@/services/leaderboardApi'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10000,
    },
  },
})

function SnakeGame() {
  const qc = useQueryClient()
  const { snake, food, score, gameStatus, startGame, resetGame } = useSnakeGame()

  const [personalBest, setPersonalBest] = useState<number>(() => {
    const stored = localStorage.getItem('snake-personal-best')
    return stored ? parseInt(stored, 10) : 0
  })

  const [showNameModal, setShowNameModal] = useState(false)
  const [currentPlayerName, setCurrentPlayerName] = useState<string | undefined>(undefined)
  const [scoreSubmitted, setScoreSubmitted] = useState(false)

  // Fetch leaderboard
  const { data: leaderboardEntries = [], isLoading: leaderboardLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboardApi.getTopScores(),
  })

  // Submit score mutation
  const submitMutation = useMutation({
    mutationFn: ({ name, s }: { name: string; s: number }) =>
      leaderboardApi.submitScore(name, s),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leaderboard'] })
    },
  })

  // Update personal best and check leaderboard qualification on game over
  useEffect(() => {
    if (gameStatus === 'gameover') {
      if (score > personalBest) {
        setPersonalBest(score)
        localStorage.setItem('snake-personal-best', String(score))
      }
      // Check if qualifies for leaderboard
      if (score > 0 && !scoreSubmitted) {
        const qualifies =
          leaderboardEntries.length < 10 ||
          score > (leaderboardEntries[leaderboardEntries.length - 1]?.score ?? 0)
        if (qualifies) {
          setShowNameModal(true)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus])

  // Reset scoreSubmitted when game restarts
  useEffect(() => {
    if (gameStatus === 'running') {
      setScoreSubmitted(false)
    }
  }, [gameStatus])

  const handleNameSubmit = useCallback(
    async (name: string) => {
      setCurrentPlayerName(name)
      setScoreSubmitted(true)
      await submitMutation.mutateAsync({ name, s: score })
      setShowNameModal(false)
    },
    [score, submitMutation]
  )

  const handleModalClose = useCallback(() => {
    setShowNameModal(false)
    setScoreSubmitted(true)
  }, [])

  const handleRestartClick = useCallback(() => {
    resetGame()
    startGame()
  }, [resetGame, startGame])

  // Allow clicking anywhere to restart when gameover
  const handleBoardClick = useCallback(() => {
    if (gameStatus === 'gameover') {
      resetGame()
      startGame()
    } else if (gameStatus === 'idle') {
      startGame()
    }
  }, [gameStatus, resetGame, startGame])

  // Start game on any keypress when idle/gameover
  useEffect(() => {
    const handleKey = (_e: KeyboardEvent) => {
      if (gameStatus === 'idle') {
        startGame()
      } else if (gameStatus === 'gameover' && !showNameModal) {
        resetGame()
        startGame()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameStatus, showNameModal, startGame, resetGame])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0f0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <div
        className="flex flex-col md:flex-row gap-6 items-start justify-center w-full max-w-3xl"
      >
        {/* Game board */}
        <div className="flex flex-col items-center" style={{ position: 'relative' }}>
          <div
            onClick={handleBoardClick}
            style={{ cursor: gameStatus !== 'running' ? 'pointer' : 'default' }}
          >
            <SnakeBoard
              snake={snake}
              food={food}
              gameStatus={gameStatus}
              score={score}
              personalBest={personalBest}
            />
          </div>

          {/* Game over overlay on the board */}
          {gameStatus === 'gameover' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.75)',
                borderRadius: '24px',
                cursor: 'pointer',
              }}
              onClick={handleRestartClick}
            >
              <div
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: '#f85149',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.3em',
                  marginBottom: '8px',
                }}
              >
                GAME OVER
              </div>
              <div
                style={{
                  color: '#4afe4a',
                  fontSize: '0.85rem',
                  marginBottom: '4px',
                }}
              >
                SCORE: {score}
              </div>
              <div
                style={{
                  color: '#ffee4a',
                  fontSize: '0.75rem',
                  marginBottom: '12px',
                }}
              >
                BEST: {personalBest}
              </div>
              <div
                style={{
                  color: '#2a8a2a',
                  fontSize: '0.65rem',
                  animation: 'blink 1.2s step-end infinite',
                  letterSpacing: '0.05em',
                }}
              >
                PRESS ANY KEY TO RESTART
              </div>
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <LeaderboardTable
            entries={leaderboardEntries}
            currentName={currentPlayerName}
            isLoading={leaderboardLoading}
          />
          <div
            style={{
              color: '#1a4a1a',
              fontSize: '0.6rem',
              marginTop: '8px',
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            ARROW KEYS / WASD TO MOVE
          </div>
        </div>
      </div>

      {/* Name entry modal */}
      <NameEntryModal
        open={showNameModal}
        score={score}
        onSubmit={handleNameSubmit}
        onClose={handleModalClose}
      />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <SnakeGame />
      </DialogProvider>
    </QueryClientProvider>
  )
}

export default App
