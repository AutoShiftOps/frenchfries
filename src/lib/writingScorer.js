// Heuristic string-matching scorer for Writing prompts — normalize +
// edit distance, not grammar-aware AI grading (no LLM/grammar-eval
// endpoint is wired up; only Azure Speech is configured). Extracted out
// of WritingPractice.jsx so it's unit-testable on its own.

export function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s]/g, '') // strip punctuation
    .replace(/\s+/g, ' ')
    .trim()
}

export function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

export function scoreAnswer(input, accepted) {
  const norm = normalize(input)
  if (!norm) return { verdict: 'empty', distance: null }
  let best = Infinity
  for (const a of accepted) {
    const na = normalize(a)
    if (norm === na) return { verdict: 'correct', distance: 0 }
    best = Math.min(best, levenshtein(norm, na))
  }
  if (best <= 2) return { verdict: 'close', distance: best }
  return { verdict: 'incorrect', distance: best }
}
