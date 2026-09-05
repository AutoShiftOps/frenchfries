import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Only set in production, where Clerk's instance lives on a Vercel-owned
// *.vercel.app domain and needs to reach Clerk's Frontend API through this
// app's own /__clerk proxy (api/__clerk/[...path].js) instead of contacting
// Clerk directly — see that file for why. Left undefined in development,
// where Clerk's own *.accounts.dev domain is used directly, no proxy needed.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL || undefined

if (!clerkPublishableKey) {
  throw new Error(
    'Missing VITE_CLERK_PUBLISHABLE_KEY — copy your Publishable Key from ' +
    'the Clerk dashboard (API Keys) into .env.'
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey} proxyUrl={clerkProxyUrl}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
)
