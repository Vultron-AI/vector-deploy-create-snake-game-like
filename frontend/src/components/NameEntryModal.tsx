import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui'

interface NameEntryModalProps {
  open: boolean
  score: number
  onSubmit: (name: string) => void | Promise<void>
  onClose: () => void
}

export function NameEntryModal({ open, score, onSubmit, onClose }: NameEntryModalProps) {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    const trimmed = name.trim().toUpperCase()
    if (trimmed.length < 1) return
    setIsSubmitting(true)
    try {
      await onSubmit(trimmed)
      setName('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/, '')
    if (val.length <= 3) setName(val)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          background: '#1a2e1a',
          border: '2px solid #4afe4a',
          color: '#4afe4a',
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: '#4afe4a', letterSpacing: '0.2em' }}>
            NEW HIGH SCORE!
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffee4a' }}>{score}</div>
            <div style={{ fontSize: '0.75rem', color: '#2a8a2a', marginTop: '4px' }}>
              ENTER YOUR INITIALS
            </div>
          </div>
          <input
            data-testid="leaderboard.name-input"
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={3}
            placeholder="AAA"
            autoFocus
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: '#0f1f0f',
              border: '1px solid #4afe4a',
              color: '#4afe4a',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '1.5rem',
              textAlign: 'center',
              letterSpacing: '0.5em',
              padding: '8px',
              borderRadius: '4px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </DialogBody>
        <DialogFooter>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              background: 'transparent',
              border: '1px solid #2a6a2a',
              color: '#2a8a2a',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '0.75rem',
              padding: '6px 12px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            SKIP
          </button>
          <button
            data-testid="leaderboard.name-submit"
            onClick={handleSubmit}
            disabled={isSubmitting || name.trim().length === 0}
            style={{
              background: name.trim().length > 0 ? '#4afe4a' : '#2a4a2a',
              border: 'none',
              color: '#0f1f0f',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '6px 12px',
              cursor: name.trim().length > 0 ? 'pointer' : 'not-allowed',
              borderRadius: '4px',
              letterSpacing: '0.1em',
            }}
          >
            {isSubmitting ? '...' : 'SUBMIT'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
