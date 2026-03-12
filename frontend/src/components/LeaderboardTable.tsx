import type { LeaderboardEntry } from '@/services/leaderboardApi'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentName?: string
  isLoading?: boolean
}

export function LeaderboardTable({ entries, currentName, isLoading }: LeaderboardTableProps) {
  return (
    <div
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        background: '#1a2e1a',
        border: '2px solid #2a4a2a',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '200px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          color: '#4afe4a',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: '0.2em',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: '1px solid #2a4a2a',
          paddingBottom: '6px',
        }}
      >
        HIGH SCORES
      </div>

      {isLoading ? (
        <div style={{ color: '#4afe4a', fontSize: '0.7rem', textAlign: 'center', padding: '8px' }}>
          LOADING...
        </div>
      ) : entries.length === 0 ? (
        <div style={{ color: '#2a6a2a', fontSize: '0.7rem', textAlign: 'center', padding: '8px' }}>
          NO SCORES YET
        </div>
      ) : (
        <table
          data-testid="leaderboard.table"
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}
        >
          <thead>
            <tr style={{ color: '#2a8a2a' }}>
              <th style={{ textAlign: 'left', padding: '2px 4px', width: '24px' }}>#</th>
              <th style={{ textAlign: 'left', padding: '2px 4px' }}>NAME</th>
              <th style={{ textAlign: 'right', padding: '2px 4px' }}>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const isCurrentPlayer = currentName && entry.name === currentName
              return (
                <tr
                  key={entry.id}
                  data-testid="leaderboard.entry"
                  style={{
                    color: isCurrentPlayer ? '#ffee4a' : '#4afe4a',
                    background: isCurrentPlayer ? 'rgba(255,238,74,0.08)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '2px 4px' }}>{index + 1}</td>
                  <td style={{ padding: '2px 4px', letterSpacing: '0.1em' }}>{entry.name}</td>
                  <td style={{ padding: '2px 4px', textAlign: 'right' }}>{entry.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
