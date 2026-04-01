import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Button } from '../src/components/ui/Button';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { WritingCanvas } from '../src/components/canvas/WritingCanvas';
import { QuizQuestion } from '../src/types/quiz';
import { genReadingToWrite, genMeaningToWrite } from '../src/engine/quizAll';
import { useGameStore } from '../src/stores/useGameStore';
import { XP_REWARDS } from '../src/types/gamification';
import { db, schema } from '../src/db/client';
import * as Haptics from 'expo-haptics';
import { useI18n } from '../src/i18n';

export default function WriteQuizScreen() {
  const { type = 'reading-to-write', kanjiIds: idsParam } = useLocalSearchParams<{
    type?: string;
    kanjiIds?: string;
  }>();
  const router = useRouter();
  const { addXP } = useGameStore();
  const { t } = useI18n();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setIsLoading(true);
    const ids = idsParam ? JSON.parse(idsParam) : Array.from({ length: 80 }, (_, i) => i + 1);
    let qs: QuizQuestion[];
    if (type === 'meaning-to-write') {
      qs = await genMeaningToWrite(ids, 5);
    } else {
      qs = await genReadingToWrite(ids, 5);
    }
    setQuestions(qs);
    setIsLoading(false);
  }

  const currentQ = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex + 1) / questions.length : 0;

  async function handleNext(score: number) {
    const newScores = [...scores, score];
    setScores(newScores);

    // Haptic feedback based on score
    if (score >= 80) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (score >= 60) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }

    // Save writing score + review history to DB
    const q = currentQ;
    if (q) {
      try {
        await db.insert(schema.writingScores).values({
          kanjiId: q.kanjiId,
          score,
          strokeOrder: score,
          formAccuracy: score,
          balance: score,
          grade: score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'fair',
          scoredAt: Date.now(),
        });
        await db.insert(schema.reviewHistory).values({
          kanjiId: q.kanjiId,
          quizType: type as string,
          correct: score >= 60,
          responseTimeMs: 0,
          reviewedAt: Date.now(),
        });
      } catch {}
    }

    if (currentIndex + 1 >= questions.length) {
      const avgScore = Math.round(newScores.reduce((a, b) => a + b, 0) / newScores.length);
      const xp = newScores.length * XP_REWARDS.writingComplete +
        (avgScore >= 90 ? XP_REWARDS.writingPerfect : 0);
      await addXP(xp);
      setFinished(true);
      return;
    }

    setShowAnswer(false);
    setCurrentIndex(currentIndex + 1);
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>{t('quiz.preparing')}</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>{t('quiz.noQuestions')}</Text>
        <Button title={t('quiz.back')} onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  if (finished) {
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{avgScore >= 80 ? '🎉' : '💪'}</Text>
          <Text style={styles.resultTitle}>{t('writeQuiz.result')}</Text>
          <Text style={styles.resultScore}>{avgScore}{t('writeQuiz.points')}</Text>
          <Text style={styles.resultDetail}>
            {scores.length}{t('writeQuiz.completed')} ・ {t('writeQuiz.avgScore')}{avgScore}{t('writeQuiz.points')}
          </Text>
          <View style={styles.resultActions}>
            <Button title={t('quiz.retry')} onPress={() => {
              setFinished(false);
              setCurrentIndex(0);
              setScores([]);
              setShowAnswer(false);
              loadQuestions();
            }} />
            <Button title={t('quiz.back')} variant="outline" onPress={() => router.back()} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <ProgressBar progress={progress} color={colors.primary} height={8} style={{ flex: 1 }} />
        <Text style={styles.counter}>{currentIndex + 1}/{questions.length}</Text>
      </View>

      {/* Prompt */}
      <View style={styles.promptSection}>
        <Text style={styles.promptLabel}>
          {type === 'meaning-to-write' ? t('writeQuiz.meaningPrompt') : t('writeQuiz.readingPrompt')}
        </Text>
        <Text style={styles.promptText}>{currentQ.prompt}</Text>
      </View>

      {/* Writing canvas */}
      <View style={styles.canvasWrapper}>
        <WritingCanvas
          targetCharacter={showAnswer ? currentQ.correctAnswer : undefined}
          onStrokeComplete={() => {}}
          mode={showAnswer ? 'guide' : 'free'}
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {!showAnswer ? (
          <>
            <Button
              title={t('writeQuiz.showAnswer')}
              variant="outline"
              onPress={() => setShowAnswer(true)}
            />
            <View style={styles.scoreButtons}>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.error + '20' }]}
                onPress={() => handleNext(30)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.error }]}>{t('writeQuiz.couldntWrite')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.warning + '20' }]}
                onPress={() => handleNext(60)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.warning }]}>{t('writeQuiz.partialWrite')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.success + '20' }]}
                onPress={() => handleNext(90)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.success }]}>{t('writeQuiz.wrote')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.answerSection}>
            <Text style={styles.answerLabel}>{t('writeQuiz.answer')}</Text>
            <Text style={styles.answerKanji}>{currentQ.correctAnswer}</Text>
            <View style={styles.scoreButtons}>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.error + '20' }]}
                onPress={() => handleNext(30)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.error }]}>△</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.warning + '20' }]}
                onPress={() => handleNext(60)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.warning }]}>○</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreBtn, { backgroundColor: colors.success + '20' }]}
                onPress={() => handleNext(90)}
              >
                <Text style={[styles.scoreBtnText, { color: colors.success }]}>◎</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg },
  loadingText: { ...typography.body, color: colors.textSecondary },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  closeButton: { fontSize: 22, color: colors.textSecondary, padding: spacing.xs },
  counter: { ...typography.label, color: colors.textSecondary, minWidth: 40, textAlign: 'right' },
  promptSection: { alignItems: 'center', paddingVertical: spacing.lg },
  promptLabel: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm },
  promptText: { ...typography.h1, color: colors.primary, fontSize: 36 },
  canvasWrapper: {
    flex: 1, marginHorizontal: spacing.lg,
    borderRadius: radius.lg, overflow: 'hidden',
  },
  actions: { padding: spacing.lg, gap: spacing.md },
  scoreButtons: { flexDirection: 'row', gap: spacing.sm },
  scoreBtn: {
    flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center',
  },
  scoreBtnText: { ...typography.label },
  answerSection: { alignItems: 'center', gap: spacing.md },
  answerLabel: { ...typography.caption, color: colors.textSecondary },
  answerKanji: { fontFamily: 'NotoSerifJP', fontSize: 64, color: colors.text },
  // Result
  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  resultEmoji: { fontSize: 64, marginBottom: spacing.lg },
  resultTitle: { ...typography.h1, color: colors.text, marginBottom: spacing.md },
  resultScore: { fontSize: 48, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  resultDetail: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl },
  resultActions: { width: '100%', gap: spacing.md },
});
