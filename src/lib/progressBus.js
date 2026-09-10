// Tiny pub/sub so screens that don't own the attempt that just happened
// can still refresh live instead of only picking up new data on their
// next mount. Most progress displays (PathHome, each practice module,
// the full Board tab) are conditionally rendered per tab in App.jsx, so
// switching tabs remounts them and they refetch naturally — but the
// Sidebar/SummaryPanel rail sits outside that conditional and mounts
// once for the whole session, so without this it only ever shows
// whatever progress existed when the page first loaded, not what a
// learner just did in Speaking a moment ago.
//
// saveAttempt() (lib/supabase.js) is the single place progress actually
// changes, so it's the only publisher; anything that displays progress
// or the leaderboard can subscribe.
const listeners = new Set()

/** Subscribe to progress changes. Returns an unsubscribe function. */
export function onProgressChange(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

/** Call after progress or the leaderboard changes (see saveAttempt). */
export function notifyProgressChange() {
  listeners.forEach(cb => cb())
}
