// Single source of truth for practice exams — mirrors chaptersByLevel.js's
// role for the four practice modules. 6 sets per CEFR level, each a mixed
// (reading + listening + writing) auto-graded exam at increasing
// within-level difficulty.

import { EXAMS_A1 } from './exams-a1'
import { EXAMS_A2 } from './exams-a2'
import { EXAMS_B1 } from './exams-b1'
import { EXAMS_B2 } from './exams-b2'
import { EXAMS_C1 } from './exams-c1'
import { EXAMS_C2 } from './exams-c2'

export const EXAMS_BY_LEVEL = {
  A1: EXAMS_A1,
  A2: EXAMS_A2,
  B1: EXAMS_B1,
  B2: EXAMS_B2,
  C1: EXAMS_C1,
  C2: EXAMS_C2,
}

// The 6 within-level difficulty steps every level's sets follow, in
// order — purely descriptive labeling, not a separate gating mechanism.
export const EXAM_DIFFICULTY_LABELS = [
  'Warm-up', 'Building', 'Standard', 'Applied', 'Challenge', 'Mastery check',
]
