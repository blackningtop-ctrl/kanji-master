import { KanjiData } from '../../types/kanji';
import { grade1Kanji } from './grade1';
import { grade2Kanji } from './grade2';

// Helper to assign sequential IDs
function assignIds(data: Omit<KanjiData, 'id'>[], startId: number): KanjiData[] {
  return data.map((k, i) => ({ ...k, id: startId + i } as KanjiData));
}

// Build grade 1-2 (always available)
const g1 = assignIds(grade1Kanji, 1);      // 1-80
const g2 = assignIds(grade2Kanji, 81);     // 81-240

// Grade 3-6: dynamically imported (may not exist yet)
let g3: KanjiData[] = [];
let g4: KanjiData[] = [];
let g5: KanjiData[] = [];
let g6: KanjiData[] = [];

try {
  const mod3 = require('./grade3');
  const data3 = mod3.grade3Kanji ?? mod3.GRADE_3_KANJI ?? [];
  g3 = assignIds(data3, 241); // 241-440
} catch {}

try {
  const mod4 = require('./grade4');
  const data4 = mod4.grade4Kanji ?? mod4.GRADE_4_KANJI ?? [];
  g4 = assignIds(data4, 441); // 441-642
} catch {}

try {
  const mod5 = require('./grade5');
  const data5 = mod5.grade5Kanji ?? mod5.GRADE_5_KANJI ?? [];
  g5 = assignIds(data5, 643); // 643-835
} catch {}

try {
  const mod6 = require('./grade6');
  const data6 = mod6.grade6Kanji ?? mod6.GRADE_6_KANJI ?? [];
  g6 = assignIds(data6, 836); // 836-1026
} catch {}

export const allKanjiData: KanjiData[] = [
  ...g1, ...g2, ...g3, ...g4, ...g5, ...g6,
];

export { grade1Kanji, grade2Kanji };
