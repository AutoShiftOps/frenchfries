import { useState, useEffect } from 'react'
import AuthBar from './auth/AuthBar'
import ProgressMap from './ProgressMap'
import { loadProgress } from '../lib/supabase'

// The detail view behind "You": full CEFR/CLB breakdown with the
// general-vs-PR goal toggle — the Home path stays a quick glance,
// this is where the whole picture and the account live.
export default function YouTab({ session }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => { loadProgress(session).then(setProgress) }, [session])

  return (
    <div style={styles.page}>
      <p style={styles.eyebrow}>Your account &amp; progress</p>
      <AuthBar session={session} />
      <ProgressMap progress={progress} />
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
    margin: '0 0 16px',
  },
}
