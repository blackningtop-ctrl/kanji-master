/**
 * 퀴즈 생성 엔진
 * 한자 → 읽기 (4지선다) 퀴즈를 생성합니다.
 */

import { QuizQuestion, QuizType } from '../types/quiz';
import { db, schema } from '../db/client';
import { eq, ne, sql } from 'drizzle-orm';

/** 지정된 한자 ID 목록으로 읽기 4지선다 퀴즈 생성 */
export async function generateReadingQuiz(
  kanjiIds: number[],
  count: number = 10,
): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db
      .select()
      .from(schema.kanji)
      .where(eq(schema.kanji.id, kanjiId));

    if (rows.length === 0) continue;
    const target = rows[0];

    const onReadings: string[] = JSON.parse(target.onReadings);
    const kunReadings: string[] = JSON.parse(target.kunReadings);
    const correctAnswer = onReadings[0] ?? kunReadings[0] ?? '';
    if (!correctAnswer) continue;

    // 오답 보기: 같은 학년의 다른 한자에서 추출
    const distractorRows = await db
      .select({ onReadings: schema.kanji.onReadings, kunReadings: schema.kanji.kunReadings })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, target.grade))
      .orderBy(sql`RANDOM()`)
      .limit(10);

    const distractors: string[] = [];
    for (const row of distractorRows) {
      const ons: string[] = JSON.parse(row.onReadings);
      const kuns: string[] = JSON.parse(row.kunReadings);
      const reading = ons[0] ?? kuns[0];
      if (reading && reading !== correctAnswer && !distractors.includes(reading)) {
        distractors.push(reading);
      }
      if (distractors.length >= 3) break;
    }

    // 보기가 부족하면 스킵
    if (distractors.length < 3) continue;

    const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

    questions.push({
      id: `q_${kanjiId}_${Date.now()}`,
      type: 'kanji-to-reading',
      kanjiId,
      prompt: target.character,
      correctAnswer,
      options,
    });
  }

  return questions;
}

/** 한자 → 의미 퀴즈 생성 */
export async function generateMeaningQuiz(
  kanjiIds: number[],
  count: number = 10,
): Promise<QuizQuestion[]> {
  const questions: QuizQuestion[] = [];
  const selected = shuffle(kanjiIds).slice(0, count);

  for (const kanjiId of selected) {
    const rows = await db
      .select()
      .from(schema.kanji)
      .where(eq(schema.kanji.id, kanjiId));

    if (rows.length === 0) continue;
    const target = rows[0];

    const meanings: string[] = JSON.parse(target.meaningsJa);
    const correctAnswer = meanings[0] ?? '';
    if (!correctAnswer) continue;

    const distractorRows = await db
      .select({ meaningsJa: schema.kanji.meaningsJa })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, target.grade))
      .orderBy(sql`RANDOM()`)
      .limit(10);

    const distractors: string[] = [];
    for (const row of distractorRows) {
      const m: string[] = JSON.parse(row.meaningsJa);
      if (m[0] && m[0] !== correctAnswer && !distractors.includes(m[0])) {
        distractors.push(m[0]);
      }
      if (distractors.length >= 3) break;
    }

    if (distractors.length < 3) continue;

    const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

    questions.push({
      id: `q_${kanjiId}_${Date.now()}`,
      type: 'kanji-to-meaning',
      kanjiId,
      prompt: target.character,
      correctAnswer,
      options,
    });
  }

  return questions;
}

/** Fisher-Yates 셔플 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
