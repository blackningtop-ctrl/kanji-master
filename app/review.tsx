import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { KanjiText } from '../src/components/ui/KanjiText';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { useStudyStore } from '../src/stores/useStudyStore';
import { previewIntervals } from '../src/engine/srs';
import { ReviewGrade } from '../src/types/srs';
import { db, schema } from '../src/db/client';
import { eq } from 'drizzle-orm';

const GRADE_BUTTONS: { grade: ReviewGrade; label: string; color: string }[] = [
  { grade: 'again', label: 'もう一度', color: colors.error },
  { grade: 'hard', label: '難しい', color: colors.warning },
  { grade: 'good', label: '良い', color: colors.success },
  { grade: 'easy', label: '簡単', color: colors.info },
];

export default function ReviewScreen() {
  const router = useRouter();
  const { dueCards, currentCardIndex, answerCard, loadDueCards } = useStudyStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [kanjiChar, setKanjiChar] = useState('');
  const [readings, setReadings] = useState({ on: '', kun: '' });
  const [meanings, setMeanings] = useState('');

  const card = dueCards[currentCardIndex];
  const totalCards = dueCards.length;
  const progress = totalCards > 0 ? currentCardIndex / totalCards : 0;

  useEffect(() => {
    if (card) {
      loadCardData(card.kanjiId);
      setShowAnswer(false);
    }
  }, [card?.id]);

  async function loadCardData(kanjiId: number) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length > 0) {
      const row = rows[0];
      setKanjiChar(row.character);
      setReadings({
        on: JSON.parse(row.onReadings).join('・'),
        kun: JSON.parse(row.kunReadings).join('・'),
      });
      setMeanings(JSON.parse(row.meaningsJa).join('、'));
    }
  }

  // 모든 카드 완료
  if (!card || currentCardIndex >= totalCards) {
    return (
      <View style={styles.complete}>
        <Text style={styles.completeEmoji}>🎉</Text>
        <Text style={styles.completeTitle}>復習完了！</Text>
        <Text style={styles.completeDesc}>
          {totalCards}枚のカードを復習しました
        </Text>
        <Button
          title="ホームに戻る"
          onPress={() => router.back()}
          style={styles.homeButton}
        />
      </View>
    );
  }

  const intervals = previewIntervals(card);

  return (
    <View style={styles.container}>
      {/* 진행 바 */}
      <ProgressBar
        progress={progress}
        color={colors.primary}
        height={4}
        style={styles.progressBar}
      />
      <Text style={styles.counter}>
        {currentCardIndex + 1} / {totalCards}
      </Text>

      {/* 카드 영역 */}
      <View style={styles.cardArea}>
        <TouchableOpacity
          style={styles.kanjiCard}
          activeOpacity={0.8}
          onPress={() => setShowAnswer(true)}
        >
          <KanjiText size="huge">{kanjiChar}</KanjiText>

          {showAnswer ? (
            <View style={styles.answerArea}>
              <Text style={styles.readingOn}>音: {readings.on}</Text>
              <Text style={styles.readingKun}>訓: {readings.kun}</Text>
              <Text style={styles.meaningText}>{meanings}</Text>
            </View>
          ) : (
            <Text style={styles.tapHint}>タップして答えを見る</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 채점 버튼 */}
      {showAnswer ? (
        <View style={styles.gradeButtons}>
          {GRADE_BUTTONS.map((btn) => (
            <TouchableOpacity
              key={btn.grade}
              style={[styles.gradeButton, { borderColor: btn.color }]}
              onPress={async () => {
                await answerCard(btn.grade);
              }}
            >
              <Text style={[styles.gradeLabel, { color: btn.color }]}>{btn.label}</Text>
              <Text style={styles.gradeInterval}>{intervals[btn.grade]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.gradeButtons}>
          <Button
            title="答えを見る"
            onPress={() => setShowAnswer(true)}
            size="lg"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressBar: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  kanjiCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  answerArea: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  readingOn: {
    ...typography.h3,
    color: colors.primary,
  },
  readingKun: {
    ...typography.h3,
    color: colors.secondary,
  },
  meaningText: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.sm,
  },
  tapHint: {
    ...typography.body,
    color: colors.textLight,
    marginTop: spacing.xl,
  },
  gradeButtons: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  gradeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  gradeLabel: {
    ...typography.label,
  },
  gradeInterval: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // 완료 화면
  complete: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xxl,
  },
  completeEmoji: {
    fontSize: 64,
  },
  completeTitle: {
    ...typography.h1,
    color: colors.text,
    marginTop: spacing.lg,
  },
  completeDesc: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  homeButton: {
    marginTop: spacing.xxl,
    minWidth: 200,
  },
});
