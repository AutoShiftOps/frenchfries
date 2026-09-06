import { describe, it, expect } from 'vitest'
import { scoreExamAttempt, examVerdict } from './examScorer'

const examSet = {
  id: 'a1-set-1',
  questions: [
    { id: 'q1', type: 'reading', answerIndex: 0 },
    { id: 'q2', type: 'listening', answerIndex: 1 },
    { id: 'q3', type: 'writing', accepted: ['bonjour', 'salut'] },
  ],
}

describe('scoreExamAttempt', () => {
  it('scores all correct as 100%', () => {
    const result = scoreExamAttempt(examSet, { q1: 0, q2: 1, q3: 'Bonjour' })
    expect(result.scorePct).toBe(100)
    expect(result.correctCount).toBe(3)
    expect(result.totalCount).toBe(3)
  })

  it('scores a mix of right and wrong', () => {
    const result = scoreExamAttempt(examSet, { q1: 0, q2: 0, q3: 'au revoir' })
    expect(result.correctCount).toBe(1)
    expect(result.scorePct).toBe(33)
    expect(result.results).toEqual([
      { id: 'q1', correct: true },
      { id: 'q2', correct: false },
      { id: 'q3', correct: false },
    ])
  })

  it('treats an unanswered question as wrong, not a crash', () => {
    const result = scoreExamAttempt(examSet, { q1: 0 })
    expect(result.correctCount).toBe(1)
    expect(result.totalCount).toBe(3)
  })

  it('accepts a close-but-not-exact writing answer, matching the Writing module\'s own leniency', () => {
    const result = scoreExamAttempt(examSet, { q1: 0, q2: 1, q3: 'bonjor' }) // 1 typo
    expect(result.correctCount).toBe(3)
  })

  it('returns 0% for an empty question set rather than dividing by zero', () => {
    const result = scoreExamAttempt({ questions: [] }, {})
    expect(result.scorePct).toBe(0)
    expect(result.totalCount).toBe(0)
  })
})

describe('examVerdict', () => {
  it('is excellent at 80% or above', () => {
    expect(examVerdict(80)).toBe('excellent')
    expect(examVerdict(100)).toBe('excellent')
  })
  it('is a pass between 60% and 79%', () => {
    expect(examVerdict(60)).toBe('pass')
    expect(examVerdict(79)).toBe('pass')
  })
  it('is keep-practicing below 60%', () => {
    expect(examVerdict(59)).toBe('keep-practicing')
    expect(examVerdict(0)).toBe('keep-practicing')
  })
})
