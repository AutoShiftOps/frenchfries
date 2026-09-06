// Scores one practice-exam attempt. Pure and framework-free, like
// writingScorer.js and continueTarget.js, so it's unit-testable without
// mounting a component.
//
// A mixed exam set has three question shapes (see src/data/exams-*.js):
//   - 'reading' / 'listening': multiple choice — answers[q.id] is the
//     chosen option index, correct iff it equals q.answerIndex.
//   - 'writing': free text — answers[q.id] is the typed string, graded
//     with the same normalized-match logic writingScorer.js already uses
//     for the Writing module, so a learner isn't held to a stricter bar
//     here than they are in ordinary practice.
import { scoreAnswer } from './writingScorer'

/**
 * @param {object} examSet - one entry from EXAMS_BY_LEVEL[level] (a `questions` array)
 * @param {Record<string, number|string>} answers - keyed by question id
 * @returns {{ scorePct: number, correctCount: number, totalCount: number,
 *             results: Array<{id: string, correct: boolean}> }}
 */
export function scoreExamAttempt(examSet, answers) {
  const questions = examSet?.questions || []
  const results = questions.map((q) => {
    const given = answers?.[q.id]
    let correct = false
    if (q.type === 'writing') {
      const verdict = given != null ? scoreAnswer(given, q.accepted).verdict : 'empty'
      correct = verdict === 'correct' || verdict === 'close'
    } else {
      correct = given === q.answerIndex
    }
    return { id: q.id, correct }
  })

  const totalCount = results.length
  const correctCount = results.filter(r => r.correct).length
  const scorePct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  return { scorePct, correctCount, totalCount, results }
}

// A pass/fail read on the percentage — used for the result screen's
// framing only, never to gate or unlock anything (exams are practice,
// not a checkpoint the app enforces).
export function examVerdict(scorePct) {
  if (scorePct >= 80) return 'excellent'
  if (scorePct >= 60) return 'pass'
  return 'keep-practicing'
}
