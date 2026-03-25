/**
 * 확장 퀴즈 엔진 — 12가지 퀴즈 타입 지원
 */
import { QuizQuestion, QuizType } from '../types/quiz';
import { db, schema } from '../db/client';
import { eq, ne, sql, and, inArray } from 'drizzle-orm';

/** Fisher-Yates 셔플 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 범용 4지선다 퀴즈 생성기 */
async function generateMultipleChoice(
  kanjiIds: number[],
  count: number,
  type: QuizType,
  getPrompt: (row: any) => string,
  getCorrect: (row: any) => string,
  getDistractorField: string,
  extractDistractor: (row: any) => string | null,
  questionLabel?: string,
): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length === 0) continue;
    const target = rows[0];

    const correctAnswer = getCorrect(target);
    if (!correctAnswer) continue;

    const distractorRows = await db
      .select()
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, target.grade))
      .orderBy(sql`RANDOM()`)
      .limit(12);

    const distractors: string[] = [];
    for (const row of distractorRows) {
      const val = extractDistractor(row);
      if (val && val !== correctAnswer && !distractors.includes(val)) {
        distractors.push(val);
      }
      if (distractors.length >= 3) break;
    }

    if (distractors.length < 3) continue;

    questions.push({
      id: `q_${type}_${kanjiId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      kanjiId,
      prompt: getPrompt(target),
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors.slice(0, 3)]),
      hint: questionLabel,
    });
  }

  return questions;
}

/** 1. 한자 → 읽기 */
export async function genKanjiToReading(kanjiIds: number[], count = 10) {
  return generateMultipleChoice(
    kanjiIds, count, 'kanji-to-reading',
    (r) => r.character,
    (r) => { const ons: string[] = JSON.parse(r.onReadings); const kuns: string[] = JSON.parse(r.kunReadings); return ons[0] ?? kuns[0] ?? ''; },
    'onReadings',
    (r) => { const ons: string[] = JSON.parse(r.onReadings); const kuns: string[] = JSON.parse(r.kunReadings); return ons[0] ?? kuns[0] ?? null; },
  );
}

/** 2. 한자 → 의미 */
export async function genKanjiToMeaning(kanjiIds: number[], count = 10) {
  return generateMultipleChoice(
    kanjiIds, count, 'kanji-to-meaning',
    (r) => r.character,
    (r) => { const m: string[] = JSON.parse(r.meaningsJa); return m[0] ?? ''; },
    'meaningsJa',
    (r) => { const m: string[] = JSON.parse(r.meaningsJa); return m[0] ?? null; },
  );
}

/** 3. 숙어 읽기 */
export async function genCompoundReading(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const vocabRows = await db
    .select()
    .from(schema.vocabulary)
    .where(inArray(schema.vocabulary.kanjiId, kanjiIds))
    .orderBy(sql`RANDOM()`)
    .limit(count * 2);

  for (const vocab of vocabRows.slice(0, count)) {
    const allVocab = await db
      .select({ reading: schema.vocabulary.reading })
      .from(schema.vocabulary)
      .where(ne(schema.vocabulary.id, vocab.id))
      .orderBy(sql`RANDOM()`)
      .limit(6);

    const distractors: string[] = [];
    for (const v of allVocab) {
      if (v.reading !== vocab.reading && !distractors.includes(v.reading)) {
        distractors.push(v.reading);
      }
      if (distractors.length >= 3) break;
    }
    if (distractors.length < 3) continue;

    questions.push({
      id: `q_compound_${vocab.id}_${Date.now()}`,
      type: 'compound-reading',
      kanjiId: vocab.kanjiId,
      prompt: vocab.word,
      correctAnswer: vocab.reading,
      options: shuffle([vocab.reading, ...distractors.slice(0, 3)]),
    });
  }
  return questions;
}

/** 4. 음성 → 한자 (TTS text 포함) */
export async function genAudioToKanji(kanjiIds: number[], count = 10) {
  return generateMultipleChoice(
    kanjiIds, count, 'audio-to-kanji',
    (r) => { const ons: string[] = JSON.parse(r.onReadings); return ons[0] ?? ''; },
    (r) => r.character,
    'character',
    (r) => r.character,
  );
}

/** 5. 읽기 → 쓰기 (쓰기 계열, 4지선다 아님) */
export async function genReadingToWrite(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length === 0) continue;
    const target = rows[0];
    const ons: string[] = JSON.parse(target.onReadings);
    const kuns: string[] = JSON.parse(target.kunReadings);
    const reading = kuns[0] ?? ons[0] ?? '';
    if (!reading) continue;

    questions.push({
      id: `q_write_${kanjiId}_${Date.now()}`,
      type: 'reading-to-write',
      kanjiId,
      prompt: reading,
      correctAnswer: target.character,
    });
  }
  return questions;
}

/** 6. 의미 → 쓰기 */
export async function genMeaningToWrite(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length === 0) continue;
    const target = rows[0];
    const meanings: string[] = JSON.parse(target.meaningsJa);

    questions.push({
      id: `q_mwrite_${kanjiId}_${Date.now()}`,
      type: 'meaning-to-write',
      kanjiId,
      prompt: meanings.join('、'),
      correctAnswer: target.character,
    });
  }
  return questions;
}

/** 9. 부수 맞추기 */
export async function genRadicalMatch(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const kanjiRows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (kanjiRows.length === 0) continue;
    const target = kanjiRows[0];

    const radicalRows = await db.select().from(schema.radicals).where(eq(schema.radicals.id, target.radicalId));
    if (radicalRows.length === 0) continue;
    const correctRadical = radicalRows[0];

    const otherRadicals = await db
      .select()
      .from(schema.radicals)
      .where(ne(schema.radicals.id, correctRadical.id))
      .orderBy(sql`RANDOM()`)
      .limit(3);

    if (otherRadicals.length < 3) continue;

    const options = shuffle([
      `${correctRadical.character}（${correctRadical.meaning}）`,
      ...otherRadicals.map((r: any) => `${r.character}（${r.meaning}）`),
    ]);

    questions.push({
      id: `q_radical_${kanjiId}_${Date.now()}`,
      type: 'radical-match',
      kanjiId,
      prompt: target.character,
      correctAnswer: `${correctRadical.character}（${correctRadical.meaning}）`,
      options,
    });
  }
  return questions;
}

/** 10. 획수 맞추기 */
export async function genStrokeCount(kanjiIds: number[], count = 10) {
  return generateMultipleChoice(
    kanjiIds, count, 'stroke-count',
    (r) => r.character,
    (r) => `${r.strokeCount}画`,
    'strokeCount',
    (r) => r.strokeCount ? `${r.strokeCount}画` : null,
  );
}

/** 11. 반대어/유사어 */
export async function genAntonymSynonym(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length === 0) continue;
    const target = rows[0];

    const antonyms: string[] = JSON.parse(target.antonymKanji);
    if (antonyms.length === 0) continue;

    const correctAnswer = antonyms[0];
    const distractorRows = await db
      .select({ character: schema.kanji.character })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, target.grade))
      .orderBy(sql`RANDOM()`)
      .limit(8);

    const distractors: string[] = [];
    for (const r of distractorRows) {
      if (r.character !== correctAnswer && r.character !== target.character && !distractors.includes(r.character)) {
        distractors.push(r.character);
      }
      if (distractors.length >= 3) break;
    }
    if (distractors.length < 3) continue;

    questions.push({
      id: `q_ant_${kanjiId}_${Date.now()}`,
      type: 'antonym-synonym',
      kanjiId,
      prompt: `「${target.character}」の反対語は？`,
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors.slice(0, 3)]),
    });
  }
  return questions;
}

/** 12. 문장 완성 (빈칸에 맞는 숙어 선택) */
export async function genSentenceCompletion(kanjiIds: number[], count = 10): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];

  const vocabRows = await db
    .select()
    .from(schema.vocabulary)
    .where(inArray(schema.vocabulary.kanjiId, kanjiIds))
    .orderBy(sql`RANDOM()`)
    .limit(count * 2);

  for (const vocab of vocabRows) {
    if (!vocab.exampleSentence) continue;

    const sentence = vocab.exampleSentence.replace(vocab.word, '＿＿＿');
    if (sentence === vocab.exampleSentence) continue;

    const allVocab = await db
      .select({ word: schema.vocabulary.word })
      .from(schema.vocabulary)
      .where(ne(schema.vocabulary.id, vocab.id))
      .orderBy(sql`RANDOM()`)
      .limit(6);

    const distractors: string[] = [];
    for (const v of allVocab) {
      if (v.word !== vocab.word && !distractors.includes(v.word)) {
        distractors.push(v.word);
      }
      if (distractors.length >= 3) break;
    }
    if (distractors.length < 3) continue;

    questions.push({
      id: `q_sent_${vocab.id}_${Date.now()}`,
      type: 'sentence-completion',
      kanjiId: vocab.kanjiId,
      prompt: sentence,
      correctAnswer: vocab.word,
      options: shuffle([vocab.word, ...distractors.slice(0, 3)]),
    });

    if (questions.length >= count) break;
  }
  return questions;
}

/** 타입별 퀴즈 생성 디스패처 */
export async function generateQuizByType(
  type: QuizType,
  kanjiIds: number[],
  count = 10,
): Promise<QuizQuestion[]> {
  switch (type) {
    case 'kanji-to-reading': return genKanjiToReading(kanjiIds, count);
    case 'kanji-to-meaning': return genKanjiToMeaning(kanjiIds, count);
    case 'compound-reading': return genCompoundReading(kanjiIds, count);
    case 'audio-to-kanji': return genAudioToKanji(kanjiIds, count);
    case 'reading-to-write': return genReadingToWrite(kanjiIds, count);
    case 'meaning-to-write': return genMeaningToWrite(kanjiIds, count);
    case 'radical-match': return genRadicalMatch(kanjiIds, count);
    case 'stroke-count': return genStrokeCount(kanjiIds, count);
    case 'antonym-synonym': return genAntonymSynonym(kanjiIds, count);
    case 'sentence-completion': return genSentenceCompletion(kanjiIds, count);
    // Writing types return questions without options (handled by canvas UI)
    case 'dictation': return genReadingToWrite(kanjiIds, count);
    case 'fill-in-blank': return genSentenceCompletion(kanjiIds, count);
    default: return genKanjiToReading(kanjiIds, count);
  }
}
