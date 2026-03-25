import { KanjiData } from '../../types/kanji';
import { grade1Kanji } from './grade1';
import { grade2Kanji } from './grade2';

// Grade 3-6 are imported dynamically when available
let GRADE_3_KANJI: KanjiData[] = [];
let GRADE_4_KANJI: KanjiData[] = [];
let GRADE_5_KANJI: KanjiData[] = [];
let GRADE_6_KANJI: KanjiData[] = [];

try { GRADE_3_KANJI = require('./grade3').GRADE_3_KANJI; } catch {}
try { GRADE_4_KANJI = require('./grade4').GRADE_4_KANJI; } catch {}
try { GRADE_5_KANJI = require('./grade5').GRADE_5_KANJI; } catch {}
try { GRADE_6_KANJI = require('./grade6').GRADE_6_KANJI; } catch {}

export const allKanjiData: KanjiData[] = [
  ...grade1Kanji,
  ...grade2Kanji,
  ...GRADE_3_KANJI,
  ...GRADE_4_KANJI,
  ...GRADE_5_KANJI,
  ...GRADE_6_KANJI,
];

export { grade1Kanji, grade2Kanji, GRADE_3_KANJI, GRADE_4_KANJI, GRADE_5_KANJI, GRADE_6_KANJI };
