import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { WritingCanvas } from '../../src/components/canvas/WritingCanvas';
import { db, schema } from '../../src/db/client';
import { eq, sql } from 'drizzle-orm';
import { useI18n } from '../../src/i18n';

type WriteMode = 'guide' | 'hint' | 'free';

export default function WriteScreen() {
  const [kanjiList, setKanjiList] = useState<{ id: number; character: string; strokeCount: number }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<WriteMode>('guide');
  const [canvasKey, setCanvasKey] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    loadKanji();
  }, []);

  async function loadKanji() {
    try {
      const rows = await db
        .select({ id: schema.kanji.id, character: schema.kanji.character, strokeCount: schema.kanji.strokeCount })
        .from(schema.kanji)
        .where(eq(schema.kanji.grade, 1))
        .limit(20);
      setKanjiList(rows);
    } catch {}
  }

  const currentKanji = kanjiList[currentIndex];

  function handleClear() {
    setCanvasKey((k) => k + 1);
  }

  function handleNext() {
    if (currentIndex + 1 < kanjiList.length) {
      setCurrentIndex(currentIndex + 1);
      setCanvasKey((k) => k + 1);
    } else {
      setCurrentIndex(0);
      setCanvasKey((k) => k + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCanvasKey((k) => k + 1);
    }
  }

  return (
    <View style={styles.container}>
      {/* Target kanji */}
      <View style={styles.targetArea}>
        <KanjiText size="medium">{currentKanji?.character ?? '一'}</KanjiText>
        <Text style={styles.hint}>
          {currentKanji ? `${currentKanji.strokeCount}${t('kanji.strokes')}` : ''} ・ {mode === 'guide' ? t('write.guide') : mode === 'hint' ? t('write.hint') : t('write.free')}
        </Text>
      </View>

      {/* Mode selector */}
      <View style={styles.modeSelector}>
        {(['guide', 'hint', 'free'] as WriteMode[]).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.modeButton, mode === m && styles.modeButtonActive]}
            onPress={() => { setMode(m); setCanvasKey((k) => k + 1); }}
          >
            <Text style={[styles.modeButtonText, mode === m && styles.modeButtonTextActive]}>
              {m === 'guide' ? t('write.guide') : m === 'hint' ? t('write.hint') : t('write.free')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Canvas */}
      <WritingCanvas
        key={canvasKey}
        targetKanji={currentKanji?.character ?? '一'}
        mode={mode}
      />

      {/* Controls */}
      <View style={styles.controls}>
        <Button title={`◀ ${t('write.prev')}`} variant="ghost" size="sm" onPress={handlePrev} />
        <Button title={t('write.clear')} variant="outline" size="sm" onPress={handleClear} />
        <Button title={`${t('write.next')} ▶`} variant="primary" size="sm" onPress={handleNext} />
      </View>

      {/* Progress */}
      <Text style={styles.progress}>
        {currentIndex + 1} / {kanjiList.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  targetArea: { alignItems: 'center', paddingVertical: spacing.md },
  hint: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
  modeSelector: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.md },
  modeButton: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  modeButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  modeButtonText: { ...typography.label, color: colors.textSecondary },
  modeButtonTextActive: { color: '#fff' },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  progress: { ...typography.caption, color: colors.textLight, textAlign: 'center' },
});
