import { db, schema } from './client';
import { sql } from 'drizzle-orm';
import { allKanjiData } from '../data/kanji';
import { RADICAL_DATA } from '../data/radicals';

/**
 * 한자 + 부수 + 어휘 + 니모닉 시드 데이터를 DB에 삽입합니다.
 * 이미 데이터가 있으면 스킵합니다.
 */
export async function seedDatabase() {
  // 이미 데이터가 있는지 확인
  const existing = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.kanji);

  if (existing[0]?.count > 0) {
    console.log('[Seed] Already seeded, skipping.');
    return;
  }

  console.log(`[Seed] Inserting ${RADICAL_DATA.length} radicals...`);
  // 부수 데이터 — 한번에 삽입
  if (RADICAL_DATA.length > 0) {
    await db.insert(schema.radicals).values(
      RADICAL_DATA.map((r) => ({
        id: r.id,
        character: r.character,
        meaning: r.meaning,
        meaningEn: r.meaningEn,
        strokeCount: r.strokeCount,
        kangxiNumber: r.kangxiNumber,
        nameJa: r.nameJa,
        position: r.position,
      })),
    );
  }

  console.log(`[Seed] Inserting ${allKanjiData.length} kanji...`);
  // 한자 데이터 — 100개씩 배치
  const BATCH = 100;
  for (let i = 0; i < allKanjiData.length; i += BATCH) {
    const batch = allKanjiData.slice(i, i + BATCH);
    await db.insert(schema.kanji).values(
      batch.map((k) => ({
        id: k.id,
        character: k.character,
        grade: k.grade,
        strokeCount: k.strokeCount,
        jlptLevel: k.jlptLevel ?? null,
        kankenLevel: k.kankenLevel ?? null,
        frequencyRank: k.frequencyRank ?? null,
        meaningsJa: JSON.stringify(k.meanings.ja),
        meaningsKo: JSON.stringify(k.meanings.ko),
        meaningsEn: JSON.stringify(k.meanings.en),
        onReadings: JSON.stringify(k.onReadings),
        kunReadings: JSON.stringify(k.kunReadings),
        radicalId: k.radicalId,
        componentRadicalIds: JSON.stringify(k.componentRadicalIds),
        tags: JSON.stringify(k.tags),
        similarKanji: JSON.stringify(k.similarKanji),
        antonymKanji: JSON.stringify(k.antonymKanji),
      })),
    );
    console.log(`[Seed] Kanji ${i + batch.length}/${allKanjiData.length}`);
  }

  // 어휘 데이터
  try {
    const { VOCABULARY_DATA } = require('../data/vocabulary');
    if (VOCABULARY_DATA?.length > 0) {
      console.log(`[Seed] Inserting ${VOCABULARY_DATA.length} vocabulary...`);
      for (let i = 0; i < VOCABULARY_DATA.length; i += BATCH) {
        const batch = VOCABULARY_DATA.slice(i, i + BATCH);
        await db.insert(schema.vocabulary).values(
          batch.map((v: any) => ({
            kanjiId: v.kanjiId,
            word: v.word,
            reading: v.reading,
            meaning: v.meaning,
            meaningKo: v.meaningKo,
            meaningEn: v.meaningEn,
            exampleSentence: v.exampleSentence,
            exampleMeaning: v.exampleMeaning,
            furigana: v.furigana,
            jlptLevel: v.jlptLevel,
          })),
        );
      }
    }
  } catch (e) {
    console.log('[Seed] Vocabulary data not available, skipping.');
  }

  // 니모닉 데이터
  try {
    const { MNEMONIC_DATA } = require('../data/mnemonics');
    if (MNEMONIC_DATA?.length > 0) {
      console.log(`[Seed] Inserting ${MNEMONIC_DATA.length} mnemonics...`);
      for (let i = 0; i < MNEMONIC_DATA.length; i += BATCH) {
        const batch = MNEMONIC_DATA.slice(i, i + BATCH);
        await db.insert(schema.mnemonics).values(
          batch.map((m: any) => ({
            kanjiId: m.kanjiId,
            language: m.language,
            story: m.story,
            isDefault: m.isDefault,
            authorId: m.authorId,
          })),
        );
      }
    }
  } catch (e) {
    console.log('[Seed] Mnemonic data not available, skipping.');
  }

  // 필순 SVG 데이터
  try {
    const { STROKE_DATA } = require('../data/strokes');
    if (STROKE_DATA?.length > 0) {
      console.log(`[Seed] Inserting ${STROKE_DATA.length} stroke data entries...`);
      for (let i = 0; i < STROKE_DATA.length; i += BATCH) {
        const batch = STROKE_DATA.slice(i, i + BATCH);
        await db.insert(schema.strokeData).values(
          batch.map((s: any) => ({
            kanjiId: s.kanjiId,
            paths: JSON.stringify(s.paths),
            strokeTypes: JSON.stringify([]),
            viewBox: s.viewBox,
          })),
        );
      }
      console.log(`[Seed] Stroke data: ${STROKE_DATA.length} entries.`);
    }
  } catch (e) {
    console.log('[Seed] Stroke data not available, skipping.');
  }

  // 기본 유저 프로필 생성
  console.log('[Seed] Creating user profile...');
  await db.insert(schema.userProfile).values({
    id: 1,
    name: '学習者',
    level: 1,
    xp: 0,
    currentGrade: 1,
    dailyNewLimit: 5,
    dailyGoalMinutes: 10,
    streakDays: 0,
    language: 'ko',
    createdAt: Date.now(),
  });

  console.log('[Seed] Done!');
}
