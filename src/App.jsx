import { useState } from 'react'
import Landing from './components/Landing'
import SpeakingPractice from './components/speaking/SpeakingPractice'

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null)

  if (activeSkill === 'speaking') {
    return <SpeakingPractice onBack={() => setActiveSkill(null)} />
  }

  return <Landing onSelectSkill={setActiveSkill} />
}
