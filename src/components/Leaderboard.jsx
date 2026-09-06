import { useState, useEffect } from 'react'
import { loadLeaderboard } from '../lib/supabase'

// Global, all-learners ranking by total phrases completed (not points —
// simplest metric that's fair across levels and needs no new scoring
// formula, per the founding decision this session). Readable whether or
// not you're signed in; only signed-in learners ever appear IN it, since
// there's no account to attribute an anonymous row to.
const MEDAL = ['🥇', '🥈', '🥉']

export default function Leaderboard({ session }) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadLeaderboard(20)
      .then(data => { if (!cancelled) setRows(data) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  const myId = session?.user?.id

  return (
    <div style={styles.page}>
      <p style={styles.eyebrow}>Leaderboard</p>
      <p style={styles.sub}>Ranked by total phrases completed, across every level and module.</p>

      {rows === null && !error && <p style={styles.status}>Loading…</p>}
      {error && <p style={styles.status}>Couldn't load the leaderboard right now — try again shortly.</p>}

      {rows && rows.length === 0 && (
        <p style={styles.status}>No one's on the board yet — complete a phrase to be the first.</p>
      )}

      {rows && rows.length > 0 && (
        <div style={styles.list}>
          {rows.map((row, i) => {
            const isMe = row.user_id === myId
            return (
              <div key={row.user_id} style={{ ...styles.row, ...(isMe ? styles.rowMe : {}) }}>
                <span style={styles.rank}>{MEDAL[i] || `#${i + 1}`}</span>
                <span style={styles.name}>{row.display_name}{isMe ? ' (you)' : ''}</span>
                <span style={styles.count}>{row.total_completed}</span>
              </div>
            )
          })}
        </div>
      )}

      {!myId && (
        <p style={styles.nudge}>Sign in to save your progress and claim your spot on the board.</p>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '28px 20px 24px',
  },
  eyebrow: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 500,
    color: 'var(--ink)',
    textAlign: 'center',
    margin: '0 0 4px',
  },
  sub: {
    fontSize: 12.5,
    color: 'var(--ink-soft)',
    textAlign: 'center',
    margin: '0 0 20px',
  },
  status: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    textAlign: 'center',
    marginTop: 24,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-sm)',
  },
  rowMe: {
    borderColor: 'var(--terracotta-deep)',
    background: 'var(--cream)',
  },
  rank: {
    width: 28,
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--ink-soft)',
    textAlign: 'center',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--ink)',
  },
  count: {
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--terracotta-deep)',
  },
  nudge: {
    fontSize: 12.5,
    color: 'var(--ink-soft)',
    textAlign: 'center',
    marginTop: 20,
  },
}
