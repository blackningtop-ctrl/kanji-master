import { grade1Kanji } from './grade1';
import { grade2Kanji } from './grade2';

export const allKanjiData = [
  ...grade1Kanji.map((k, i) => ({ ...k, id: i + 1 })),
  ...grade2Kanji.map((k, i) => ({ ...k, id: 81 + i })),
];

export { grade1Kanji, grade2Kanji };
