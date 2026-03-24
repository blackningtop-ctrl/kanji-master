export interface KanjiData {
  id: number;
  character: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  strokeCount: number;
  jlptLevel: number | null;
  kankenLevel: number | null;
  frequencyRank: number | null;
  meanings: KanjiMeanings;
  onReadings: string[];
  kunReadings: string[];
  radicalId: number;
  componentRadicalIds: number[];
  tags: string[];
  similarKanji: string[];
  antonymKanji: string[];
}

export interface KanjiMeanings {
  ja: string[];
  ko: string[];
  en: string[];
}

export interface RadicalData {
  id: number;
  character: string;
  meaning: string;
  meaningEn: string;
  strokeCount: number;
  kangxiNumber: number;
  nameJa: string;
  position: RadicalPosition | null;
}

export type RadicalPosition =
  | 'hen'    // 偏 (left)
  | 'tsukuri' // 旁 (right)
  | 'kanmuri' // 冠 (top)
  | 'ashi'   // 脚 (bottom)
  | 'tare'   // 垂 (top-left wrap)
  | 'nyou'   // 繞 (bottom-left wrap)
  | 'kamae'  // 構 (enclosure)
  ;

export interface VocabularyData {
  id: number;
  kanjiId: number;
  word: string;
  reading: string;
  meaning: string;
  meaningKo: string;
  meaningEn: string;
  exampleSentence: string | null;
  exampleMeaning: string | null;
  furigana: string | null;
  jlptLevel: number | null;
}

export interface MnemonicData {
  id: number;
  kanjiId: number;
  language: 'ja' | 'ko' | 'en';
  story: string;
  isDefault: boolean;
  authorId: string | null;
}

export interface StrokeData {
  paths: string[];       // SVG path d attributes in stroke order
  strokeTypes: string[]; // e.g. 'horizontal', 'vertical', 'dot', etc.
  viewBox: string;       // e.g. '0 0 109 109'
}

export const GRADE_INFO = [
  { grade: 1, label: '1年生', count: 80, color: '#EF4444' },
  { grade: 2, label: '2年生', count: 160, color: '#F97316' },
  { grade: 3, label: '3年生', count: 200, color: '#EAB308' },
  { grade: 4, label: '4年生', count: 202, color: '#22C55E' },
  { grade: 5, label: '5年生', count: 193, color: '#3B82F6' },
  { grade: 6, label: '6年生', count: 191, color: '#8B5CF6' },
] as const;
