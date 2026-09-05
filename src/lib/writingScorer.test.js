import { describe, it, expect } from 'vitest'
import { normalize, levenshtein, scoreAnswer } from './writingScorer'

describe('normalize', () => {
  it('lowercases, strips accents and punctuation, collapses whitespace', () => {
    expect(normalize("Bonjour, je m'appelle Sajja.")).toBe('bonjour je mappelle sajja')
    expect(normalize('Où est la gare ?')).toBe('ou est la gare')
    expect(normalize('  Comment   allez-vous  ')).toBe('comment allezvous')
  })

  it('is idempotent on empty input', () => {
    expect(normalize('')).toBe('')
    expect(normalize('   ')).toBe('')
  })
})

describe('levenshtein', () => {
  it('is 0 for identical strings', () => {
    expect(levenshtein('bonjour', 'bonjour')).toBe(0)
  })
  it('counts a single substitution as 1', () => {
    expect(levenshtein('cate', 'cafe')).toBe(1)
  })
  it('counts insertions and deletions', () => {
    expect(levenshtein('bonjour', 'bonjou')).toBe(1)
    expect(levenshtein('', 'abc')).toBe(3)
  })
})

describe('scoreAnswer', () => {
  const accepted = ["bonjour je m'appelle sajja", "bonjour, je m'appelle sajja"]

  it('marks an exact (post-normalize) match as correct', () => {
    expect(scoreAnswer("Bonjour, je m'appelle Sajja.", accepted).verdict).toBe('correct')
    expect(scoreAnswer("bonjour je mappelle sajja", accepted).verdict).toBe('correct')
  })

  it('marks a small typo as close', () => {
    // one character off from "bonjour je mappelle sajja"
    const result = scoreAnswer("Bonjour, je m'appele Sajja.", accepted)
    expect(result.verdict).toBe('close')
    expect(result.distance).toBeLessThanOrEqual(2)
  })

  it('marks an unrelated answer as incorrect', () => {
    expect(scoreAnswer('le chat est noir', accepted).verdict).toBe('incorrect')
  })

  it('marks empty input as empty, not incorrect', () => {
    expect(scoreAnswer('   ', accepted).verdict).toBe('empty')
    expect(scoreAnswer('', accepted).verdict).toBe('empty')
  })
})
