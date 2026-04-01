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

export const QUIZ_TYPE_INFO: Record<QuizType, { label: string; labelJa: string; labelKo: string; category: QuizCategory; icon: string }> = {
  'kanji-to-reading': { label: 'Kanji → Reading', labelJa: '漢字→読み', labelKo: '한자→읽기', category: 'reading', icon: '📖' },
  'kanji-to-meaning': { label: 'Kanji → Meaning', labelJa: '漢字→意味', labelKo: '한자→의미', category: 'reading', icon: '💡' },
  'compound-reading': { label: 'Compound Reading', labelJa: '熟語読み', labelKo: '숙어 읽기', category: 'reading', icon: '📝' },
  'audio-to-kanji': { label: 'Audio → Kanji', labelJa: '音→漢字', labelKo: '듣기→한자', category: 'reading', icon: '🔊' },
  'reading-to-write': { label: 'Reading → Write', labelJa: '読み→書き', labelKo: '읽기→쓰기', category: 'writing', icon: '✏️' },
  'meaning-to-write': { label: 'Meaning → Write', labelJa: '意味→書き', labelKo: '의미→쓰기', category: 'writing', icon: '🖊️' },
  'dictation': { label: 'Dictation', labelJa: '書き取り', labelKo: '받아쓰기', category: 'writing', icon: '🎙️' },
  'fill-in-blank': { label: 'Fill in Blank', labelJa: '穴埋め', labelKo: '빈칸 채우기', category: 'writing', icon: '🔲' },
  'radical-match': { label: 'Radical Match', labelJa: '部首', labelKo: '부수', category: 'knowledge', icon: '🧩' },
  'stroke-count': { label: 'Stroke Count', labelJa: '画数', labelKo: '획수', category: 'knowledge', icon: '🔢' },
  'antonym-synonym': { label: 'Antonym/Synonym', labelJa: '反対語・類義語', labelKo: '반대어·유사어', category: 'knowledge', icon: '🔄' },
  'sentence-completion': { label: 'Sentence', labelJa: '文章完成', labelKo: '문장 완성', category: 'knowledge', icon: '📄' },
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
