import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius, shadow } from '../src/theme/spacing';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { QuizQuestion, QuizResult, QuizType } from '../src/types/quiz';
import { generateReadingQuiz, generateMeaningQuiz } from '../src/engine/quiz';
import { generateQuizByType } from '../src/engine/quizAll';
import { useStudyStore } from '../src/stores/useStudyStore';
import { useGameStore } from '../src/stores/useGameStore';
import { XP_REWARDS } from '../src/types/gamification';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { db, schema } from '../src/db/client';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function QuizScreen() {
  const { type = 'kanji-to-reading', kanjiIds: kanjiIdsParam } = useLocalSearchParams<{
    type?: string;
    kanjiIds?: string;
  }>();
  const router = useRouter();
  const { addXP } = useGameStore();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean; timeMs: number }[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    loadQuiz();
  }, []);

  async function loadQuiz() {
    setIsLoading(true);
    const ids = kanjiIdsParam ? JSON.parse(kanjiIdsParam) : Array.from({ length: 80 }, (_, i) => i + 1);
    const qs = await generateQuizByType(type as QuizType, ids, 10);

    setQuestions(qs);
    setStartTime(Date.now());
    setIsLoading(false);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex + 1) / questions.length : 0;
  const isAudioQuiz = type === 'audio-to-kanji';

  function playAudio() {
    if (currentQuestion?.audioText) {
      Speech.speak(currentQuestion.audioText, { language: 'ja-JP', rate: 0.8 });
    }
  }

  // Auto-play audio for audio quiz
  useEffect(() => {
    if (isAudioQuiz && currentQuestion?.audioText && !isLoading) {
      playAudio();
    }
  }, [currentIndex, isLoading]);

  function handleAnswer(answer: string) {
    if (selectedAnswer !== null) return; // prevent double tap

    const timeMs = Date.now() - startTime;
    const correct = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setAnswers([...answers, { correct, timeMs }]);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    if (!correct) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }

    // Auto-advance after delay
    setTimeout(() => nextQuestion(), correct ? 800 : 1500);
  }

  async function nextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      const allAnswers = [...answers];
      const correctCount = allAnswers.filter((a) => a.correct).length;
      const totalTime = allAnswers.reduce((sum, a) => sum + a.timeMs, 0);
      const accuracy = Math.round((correctCount / allAnswers.length) * 100);
      const xp = correctCount * XP_REWARDS.quizCorrect +
        (accuracy === 100 ? XP_REWARDS.quizPerfect : 0);

      // Save each answer to review history
      try {
        for (let i = 0; i < allAnswers.length; i++) {
          const q = questions[i];
          if (q) {
            await db.insert(schema.reviewHistory).values({
              kanjiId: q.kanjiId,
              quizType: type as string,
              correct: allAnswers[i].correct,
              responseTimeMs: allAnswers[i].timeMs,
              reviewedAt: Date.now(),
            });
          }
        }
      } catch {}

      const quizResult: QuizResult = {
        totalQuestions: allAnswers.length,
        correctCount,
        accuracy,
        averageTimeMs: Math.round(totalTime / allAnswers.length),
        xpEarned: xp,
      };

      setResult(quizResult);
      await addXP(xp);
      return;
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex(currentIndex + 1);
    setStartTime(Date.now());
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>問題を準備中...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>問題がありません</Text>
        <Button title="戻る" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  // Result screen
  if (result) {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>
            {result.accuracy >= 90 ? '🎉' : result.accuracy >= 70 ? '👍' : '💪'}
          </Text>
          <Text style={styles.resultTitle}>結果発表</Text>

          <Card style={styles.resultCard}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>正解率</Text>
              <Text style={[styles.resultValue, { color: result.accuracy >= 80 ? colors.success : colors.warning }]}>
                {result.accuracy}%
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>正解</Text>
              <Text style={styles.resultValue}>
                {result.correctCount} / {result.totalQuestions}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>平均時間</Text>
              <Text style={styles.resultValue}>
                {(result.averageTimeMs / 1000).toFixed(1)}秒
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>獲得XP</Text>
              <Text style={[styles.resultValue, { color: colors.accent }]}>
                +{result.xpEarned} XP
              </Text>
            </View>
          </Card>

          <View style={styles.resultActions}>
            <Button
              title="もう一度"
              onPress={() => {
                setResult(null);
                setCurrentIndex(0);
                setAnswers([]);
                setSelectedAnswer(null);
                setIsCorrect(null);
                loadQuiz();
              }}
            />
            <Button title="ホームに戻る" variant="outline" onPress={() => router.push('/')} />
          </View>
        </View>
      </View>
    );
  }

  // Quiz question screen
  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <ProgressBar
          progress={progress}
          color={colors.primary}
          height={8}
          style={styles.progressBar}
        />
        <Text style={styles.counter}>
          {currentIndex + 1}/{questions.length}
        </Text>
      </View>

      {/* Question */}
      <Animated.View
        style={[
          styles.questionContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateX: shakeAnim }] },
        ]}
      >
        <Text style={styles.questionLabel}>{getQuestionLabel(type as QuizType)}</Text>
        {isAudioQuiz ? (
          <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
            <Text style={styles.audioIcon}>🔊</Text>
            <Text style={styles.audioHint}>タップして聞く</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.kanjiPrompt}>{currentQuestion.prompt}</Text>
        )}
      </Animated.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options?.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === currentQuestion.correctAnswer;
          let bgColor: string = colors.surface;
          let borderColor: string = colors.border;

          if (selectedAnswer !== null) {
            if (isAnswer) {
              bgColor = '#DCFCE7';
              borderColor = colors.success;
            } else if (isSelected && !isCorrect) {
              bgColor = '#FEE2E2';
              borderColor = colors.error;
            }
          }

          return (
            <TouchableOpacity
              key={i}
              style={[styles.optionButton, { backgroundColor: bgColor, borderColor }]}
              onPress={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              activeOpacity={0.7}
            >
              <Text style={styles.optionNumber}>{i + 1}</Text>
              <Text style={[styles.optionText, selectedAnswer !== null && isAnswer && { fontWeight: '700' }]}>
                {option}
              </Text>
              {selectedAnswer !== null && isAnswer && (
                <Text style={styles.correctMark}>○</Text>
              )}
              {isSelected && !isCorrect && selectedAnswer !== null && (
                <Text style={styles.wrongMark}>✕</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback */}
      {selectedAnswer !== null && (
        <View style={[styles.feedback, { backgroundColor: isCorrect ? '#DCFCE7' : '#FEE2E2' }]}>
          <Text style={[styles.feedbackText, { color: isCorrect ? colors.success : colors.error }]}>
            {isCorrect ? '正解！' : `不正解… 正解は「${currentQuestion.correctAnswer}」`}
          </Text>
        </View>
      )}
    </View>
  );
}

function getQuestionLabel(quizType: QuizType): string {
  switch (quizType) {
    case 'kanji-to-reading': return 'この漢字の読みは？';
    case 'kanji-to-meaning': return 'この漢字の意味は？';
    case 'compound-reading': return 'この熟語の読みは？';
    case 'audio-to-kanji': return '聞こえた漢字はどれ？';
    case 'radical-match': return 'この漢字の部首は？';
    case 'stroke-count': return 'この漢字の画数は？';
    case 'antonym-synonym': return '反対語・類義語を選べ';
    case 'sentence-completion': return '正しい漢字を選べ';
    default: return 'この漢字の読みは？';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  closeButton: {
    fontSize: 22,
    color: colors.textSecondary,
    padding: spacing.xs,
  },
  progressBar: {
    flex: 1,
  },
  counter: {
    ...typography.label,
    color: colors.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
  questionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  questionLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  kanjiPrompt: {
    fontFamily: 'NotoSerifJP',
    fontSize: 96,
    color: colors.text,
    lineHeight: 120,
  },
  audioButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  audioIcon: {
    fontSize: 48,
  },
  audioHint: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  optionsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    ...shadow.sm,
  },
  optionNumber: {
    ...typography.caption,
    color: colors.textLight,
    width: 24,
  },
  optionText: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  correctMark: {
    fontSize: 24,
    color: colors.success,
    fontWeight: '700',
  },
  wrongMark: {
    fontSize: 24,
    color: colors.error,
    fontWeight: '700',
  },
  feedback: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    alignItems: 'center',
  },
  feedbackText: {
    ...typography.h3,
  },
  // Result styles
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  resultTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  resultCard: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  resultValue: {
    ...typography.h3,
    color: colors.text,
  },
  resultActions: {
    width: '100%',
    gap: spacing.md,
  },
});
