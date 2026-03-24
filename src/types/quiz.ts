export type QuizType =
  // Reading
  | 'kanji-to-reading'
  | 'kanji-to-meaning'
  | 'compound-reading'
  | 'audio-to-kanji'
  // Writing
  | 'reading-to-write'
  | 'meaning-to-write'
  | 'dictation'
  | 'fill-in-blank'
  // Knowledge
  | 'radical-match'
  | 'stroke-count'
  | 'antonym-synonym'
  | 'sentence-completion';

export type QuizCategory = 'reading' | 'writing' | 'knowledge';

export const QUIZ_TYPE_INFO: Record<QuizType, { label: string; labelJa: string; category: QuizCategory; icon: string }> = {
  'kanji-to-reading': { label: 'Kanji → Reading', labelJa: '漢字→読み', category: 'reading', icon: '📖' },
  'kanji-to-meaning': { label: 'Kanji → Meaning', labelJa: '漢字→意味', category: 'reading', icon: '💡' },
  'compound-reading': { label: 'Compound Reading', labelJa: '熟語読み', category: 'reading', icon: '📝' },
  'audio-to-kanji': { label: 'Audio → Kanji', labelJa: '音→漢字', category: 'reading', icon: '🔊' },
  'reading-to-write': { label: 'Reading → Write', labelJa: '読み→書き', category: 'writing', icon: '✏️' },
  'meaning-to-write': { label: 'Meaning → Write', labelJa: '意味→書き', category: 'writing', icon: '🖊️' },
  'dictation': { label: 'Dictation', labelJa: '書き取り', category: 'writing', icon: '🎙️' },
  'fill-in-blank': { label: 'Fill in Blank', labelJa: '穴埋め', category: 'writing', icon: '🔲' },
  'radical-match': { label: 'Radical Match', labelJa: '部首', category: 'knowledge', icon: '🧩' },
  'stroke-count': { label: 'Stroke Count', labelJa: '画数', category: 'knowledge', icon: '🔢' },
  'antonym-synonym': { label: 'Antonym/Synonym', labelJa: '反対語・類義語', category: 'knowledge', icon: '🔄' },
  'sentence-completion': { label: 'Sentence', labelJa: '文章完成', category: 'knowledge', icon: '📄' },
};

export interface QuizQuestion {
  id: string;
  type: QuizType;
  kanjiId: number;
  prompt: string;          // The question text or kanji character
  correctAnswer: string;
  options?: string[];       // For multiple choice
  audioText?: string;       // Text for TTS
  hint?: string;
}

export interface QuizSession {
  id: string;
  type: QuizType;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswer[];
  startedAt: number;
  finishedAt: number | null;
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  responseTimeMs: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  accuracy: number;        // 0-100
  averageTimeMs: number;
  xpEarned: number;
}
