// The single source of truth for "what content exists at which CEFR
// level, for which module." Every screen that needs to know what's
// buildable right now (the path ladder, the progress map, each module's
// level tabs) reads this instead of keeping its own copy — so adding a
// real B1 later is one new entry here, not an edit in six files.

import { A1_CHAPTERS } from './a1-chapters'
import { A2_CHAPTERS } from './a2-chapters'
import { B1_CHAPTERS } from './b1-chapters'
import { B2_CHAPTERS } from './b2-chapters'
import { C1_CHAPTERS } from './c1-chapters'
import { C2_CHAPTERS } from './c2-chapters'
import { READING_CHAPTERS } from './reading-chapters'
import { READING_CHAPTERS_A2 } from './reading-chapters-a2'
import { READING_CHAPTERS_B1 } from './reading-chapters-b1'
import { READING_CHAPTERS_B2 } from './reading-chapters-b2'
import { READING_CHAPTERS_C1 } from './reading-chapters-c1'
import { READING_CHAPTERS_C2 } from './reading-chapters-c2'
import { LISTENING_CHAPTERS } from './listening-chapters'
import { LISTENING_CHAPTERS_A2 } from './listening-chapters-a2'
import { LISTENING_CHAPTERS_B1 } from './listening-chapters-b1'
import { LISTENING_CHAPTERS_B2 } from './listening-chapters-b2'
import { LISTENING_CHAPTERS_C1 } from './listening-chapters-c1'
import { LISTENING_CHAPTERS_C2 } from './listening-chapters-c2'
import { WRITING_CHAPTERS } from './writing-chapters'
import { WRITING_CHAPTERS_A2 } from './writing-chapters-a2'
import { WRITING_CHAPTERS_B1 } from './writing-chapters-b1'
import { WRITING_CHAPTERS_B2 } from './writing-chapters-b2'
import { WRITING_CHAPTERS_C1 } from './writing-chapters-c1'
import { WRITING_CHAPTERS_C2 } from './writing-chapters-c2'

// A level appears here only once its content for ALL FOUR modules is
// real — that's what buildLevelLadder uses to decide whether a level is
// reachable at all, versus genuinely "not built yet".
export const CHAPTERS_BY_LEVEL = {
  A1: {
    speaking: A1_CHAPTERS,
    reading: READING_CHAPTERS,
    listening: LISTENING_CHAPTERS,
    writing: WRITING_CHAPTERS,
  },
  A2: {
    speaking: A2_CHAPTERS,
    reading: READING_CHAPTERS_A2,
    listening: LISTENING_CHAPTERS_A2,
    writing: WRITING_CHAPTERS_A2,
  },
  B1: {
    speaking: B1_CHAPTERS,
    reading: READING_CHAPTERS_B1,
    listening: LISTENING_CHAPTERS_B1,
    writing: WRITING_CHAPTERS_B1,
  },
  B2: {
    speaking: B2_CHAPTERS,
    reading: READING_CHAPTERS_B2,
    listening: LISTENING_CHAPTERS_B2,
    writing: WRITING_CHAPTERS_B2,
  },
  C1: {
    speaking: C1_CHAPTERS,
    reading: READING_CHAPTERS_C1,
    listening: LISTENING_CHAPTERS_C1,
    writing: WRITING_CHAPTERS_C1,
  },
  C2: {
    speaking: C2_CHAPTERS,
    reading: READING_CHAPTERS_C2,
    listening: LISTENING_CHAPTERS_C2,
    writing: WRITING_CHAPTERS_C2,
  },
}
