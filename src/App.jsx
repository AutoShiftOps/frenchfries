import { useState, useEffect, useMemo, useRef } from 'react'
import { useUser, useAuth, AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import PathHome from './components/PathHome'
import YouTab from './components/YouTab'
import BottomNav from './components/BottomNav'
import SpeakingPractice from './components/speaking/SpeakingPractice'
import ReadingPractice from './components/reading/ReadingPractice'
import ListeningPractice from './components/listening/ListeningPractice'
import WritingPractice from './components/writing/WritingPractice'
import AmbientBackground from './components/AmbientBackground'
import ExamPractice from './components/exams/ExamPractice'
import Leaderboard from './components/Leaderboard'
import Sidebar from './components/Sidebar'
import SummaryPanel from './components/SummaryPanel'
import { migrateAnonProgressToAccount } from './lib/supabase'

const MODULES = {
  speaking: SpeakingPractice,
  reading: ReadingPractice,
  listening: ListeningPractice,
  writing: WritingPractice,
}

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null)
  const [tab, setTab] = useState('path') // 'path' | 'you' — only relevant when no module is open
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const migratedRef = useRef(false)

  // Every other component in this app was built against a plain
  // { user: { id, email } } "session" shape (Supabase's shape) — rather
  // than touch every call site, Clerk's richer user object is narrowed
  // down to that same small shape here, once. `getToken` is carried
  // alongside it so the Speaking/Listening modules can attach a real
  // Clerk session token to their Azure-proxy API calls.
  const session = useMemo(() => {
    if (!isLoaded || !isSignedIn || !user) return null
    return {
      user: {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? '',
        // Leaderboard display name — first name only, never the email,
        // falling back gracefully if Clerk has no name on file yet.
        firstName: user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Learner',
      },
      getToken,
    }
  }, [isLoaded, isSignedIn, user, getToken])

  useEffect(() => {
    if (session?.user?.id && !migratedRef.current) {
      migratedRef.current = true
      migrateAnonProgressToAccount(session.user.id)
    }
  }, [session])

  const ActiveModule = activeSkill ? MODULES[activeSkill] : null

  // Sidebar (desktop only) stays reachable even while a practice module is
  // open full-screen — picking a different destination there exits the
  // module and switches tabs in one step, since there's no other way back
  // to Exams/Board/You from inside a module on a wide screen (BottomNav,
  // the mobile equivalent, is hidden at desktop widths).
  const goToTab = (t) => { setActiveSkill(null); setTab(t) }

  // Google sends the browser back here after OAuth — this one path is the
  // exception to the app's "no full-screen wall" rule, since Google's own
  // consent screen is itself an unavoidable redirect away from the app.
  // Clerk's component completes the sign-in and then sends the browser on
  // to redirectUrlComplete (the app's own root) on its own.
  if (typeof window !== 'undefined' && window.location.pathname === '/sso-callback') {
    return <AuthenticateWithRedirectCallback />
  }

  if (ActiveModule) {
    return (
      <>
        <AmbientBackground />
        <div className="app-shell">
          <Sidebar tab={activeSkill} onSelectTab={goToTab} session={session} />
          <ActiveModule onBack={() => setActiveSkill(null)} session={session} />
          <SummaryPanel session={session} />
        </div>
      </>
    )
  }

  return (
    <>
      <AmbientBackground />
      <div className="app-shell">
        <Sidebar tab={tab} onSelectTab={goToTab} session={session} />
        {/* A real app shell: the middle column owns its own scroll, so its
            sticky "Continue" bar sticks to the bottom of THAT scroll area —
            never fighting with BottomNav, which sits outside it in a fixed
            footer that never moves. */}
        <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            {tab === 'path' && <PathHome onSelectSkill={setActiveSkill} session={session} />}
            {tab === 'exams' && <ExamPractice session={session} />}
            {tab === 'board' && <Leaderboard session={session} />}
            {tab === 'you' && <YouTab session={session} />}
          </div>
          <BottomNav tab={tab} onSelectTab={setTab} />
        </div>
        <SummaryPanel session={session} />
      </div>
    </>
  )
}
