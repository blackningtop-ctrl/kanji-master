import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,
  FlatList, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Button } from '../src/components/ui/Button';
import { db, schema } from '../src/db/client';
import { eq } from 'drizzle-orm';

const { width: SCREEN_W } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '🇯🇵',
    title: '漢字マスターへようこそ',
    subtitle: '教育漢字1,026字を\n楽しくマスターしよう！',
  },
  {
    emoji: '🧠',
    title: '科学的な学習法',
    subtitle: 'SRS（間隔反復）で\n効率よく長期記憶に定着',
  },
  {
    emoji: '✏️',
    title: '書いて覚える',
    subtitle: '正しい筆順で\n書き取り練習ができます',
  },
];

const PURPOSES = [
  { id: 'school', label: '学校の授業', emoji: '🏫' },
  { id: 'kanken', label: '漢字検定', emoji: '📝' },
  { id: 'japanese', label: '日本語学習', emoji: '🌏' },
  { id: 'hobby', label: '趣味', emoji: '🎌' },
];

const LEVELS = [
  { id: 0, label: '完全初心者', desc: '漢字を全く知らない' },
  { id: 1, label: '1年生レベル', desc: '簡単な漢字を少し知っている' },
  { id: 2, label: '2年生レベル', desc: '基本的な漢字200字くらい' },
  { id: 3, label: '3年生レベル', desc: '400字くらい読める' },
  { id: 4, label: '4年生レベル', desc: '600字くらい知っている' },
  { id: 5, label: '5年生以上', desc: 'かなり多くの漢字を知っている' },
];

const GOALS = [
  { minutes: 5, label: '5分', desc: '軽く' },
  { minutes: 10, label: '10分', desc: 'おすすめ' },
  { minutes: 15, label: '15分', desc: 'しっかり' },
  { minutes: 30, label: '30分', desc: '集中' },
];

type Step = 'slides' | 'name' | 'purpose' | 'level' | 'goal' | 'ready';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('slides');
  const [slideIndex, setSlideIndex] = useState(0);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [level, setLevel] = useState(0);
  const [goalMinutes, setGoalMinutes] = useState(10);
  const flatListRef = useRef<FlatList>(null);

  async function completeOnboarding() {
    await db
      .update(schema.userProfile)
      .set({
        name: name || '学習者',
        currentGrade: Math.max(1, level) as number,
        dailyGoalMinutes: goalMinutes,
      })
      .where(eq(schema.userProfile.id, 1));

    router.replace('/');
  }

  // Slide intro
  if (step === 'slides') {
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            setSlideIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
          }}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width: SCREEN_W }]}>
              <Text style={styles.slideEmoji}>{item.emoji}</Text>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>
          )}
          keyExtractor={(_, i) => String(i)}
        />
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === slideIndex && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.bottomActions}>
          <Button
            title={slideIndex === SLIDES.length - 1 ? '始めましょう' : '次へ'}
            onPress={() => {
              if (slideIndex < SLIDES.length - 1) {
                flatListRef.current?.scrollToIndex({ index: slideIndex + 1 });
                setSlideIndex(slideIndex + 1);
              } else {
                setStep('name');
              }
            }}
          />
        </View>
      </View>
    );
  }

  // Name input
  if (step === 'name') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>お名前を教えてください</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="ニックネーム"
            placeholderTextColor={colors.textLight}
            maxLength={20}
          />
        </View>
        <View style={styles.bottomActions}>
          <Button title="次へ" onPress={() => setStep('purpose')} />
          <TouchableOpacity onPress={() => setStep('purpose')}>
            <Text style={styles.skipText}>スキップ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Purpose selection
  if (step === 'purpose') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>学習の目的は？</Text>
          <View style={styles.optionGrid}>
            {PURPOSES.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[styles.optionCard, purpose === p.id && styles.optionCardSelected]}
                onPress={() => setPurpose(p.id)}
              >
                <Text style={styles.optionEmoji}>{p.emoji}</Text>
                <Text style={[styles.optionLabel, purpose === p.id && styles.optionLabelSelected]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomActions}>
          <Button title="次へ" onPress={() => setStep('level')} />
        </View>
      </View>
    );
  }

  // Level selection
  if (step === 'level') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>今のレベルは？</Text>
          {LEVELS.map((l) => (
            <TouchableOpacity
              key={l.id}
              style={[styles.levelRow, level === l.id && styles.levelRowSelected]}
              onPress={() => setLevel(l.id)}
            >
              <Text style={[styles.levelLabel, level === l.id && styles.levelLabelSelected]}>
                {l.label}
              </Text>
              <Text style={styles.levelDesc}>{l.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomActions}>
          <Button title="次へ" onPress={() => setStep('goal')} />
        </View>
      </View>
    );
  }

  // Daily goal
  if (step === 'goal') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>1日の学習目標</Text>
          <View style={styles.goalGrid}>
            {GOALS.map((g) => (
              <TouchableOpacity
                key={g.minutes}
                style={[styles.goalCard, goalMinutes === g.minutes && styles.goalCardSelected]}
                onPress={() => setGoalMinutes(g.minutes)}
              >
                <Text style={[styles.goalTime, goalMinutes === g.minutes && styles.goalTimeSelected]}>
                  {g.label}
                </Text>
                <Text style={styles.goalDesc}>{g.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomActions}>
          <Button title="次へ" onPress={() => setStep('ready')} />
        </View>
      </View>
    );
  }

  // Ready screen
  return (
    <View style={styles.container}>
      <View style={styles.readyContent}>
        <Text style={styles.readyEmoji}>🎉</Text>
        <Text style={styles.readyTitle}>準備完了！</Text>
        <Text style={styles.readySubtitle}>
          {name || '学習者'}さん{'\n'}
          漢字マスターの旅を始めましょう
        </Text>
        <View style={styles.readySummary}>
          <Text style={styles.summaryText}>📚 {level === 0 ? '1年生' : `${level}年生`}からスタート</Text>
          <Text style={styles.summaryText}>⏱️ 1日{goalMinutes}分の学習</Text>
          <Text style={styles.summaryText}>🎯 {purpose ? PURPOSES.find((p) => p.id === purpose)?.label : '自由学習'}</Text>
        </View>
      </View>
      <View style={styles.bottomActions}>
        <Button title="学習を始める！" onPress={completeOnboarding} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Slides
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  slideEmoji: { fontSize: 80, marginBottom: spacing.xl },
  slideTitle: { ...typography.h1, color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  slideSubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  // Steps
  stepContent: { flex: 1, padding: spacing.xl, paddingTop: spacing.xxxl },
  stepTitle: { ...typography.h1, color: colors.text, marginBottom: spacing.xl },
  bottomActions: { padding: spacing.xl, gap: spacing.md },
  skipText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  // Name
  nameInput: {
    ...typography.h2,
    color: colors.text,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.md,
  },
  // Purpose
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  optionCard: {
    width: '47%',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  optionCardSelected: { borderColor: colors.primary, backgroundColor: '#FEF2F2' },
  optionEmoji: { fontSize: 32, marginBottom: spacing.sm },
  optionLabel: { ...typography.label, color: colors.text },
  optionLabelSelected: { color: colors.primary },
  // Level
  levelRow: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  levelRowSelected: { borderColor: colors.primary, backgroundColor: '#FEF2F2' },
  levelLabel: { ...typography.label, color: colors.text },
  levelLabelSelected: { color: colors.primary },
  levelDesc: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  // Goal
  goalGrid: { flexDirection: 'row', gap: spacing.md },
  goalCard: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  goalCardSelected: { borderColor: colors.primary, backgroundColor: '#FEF2F2' },
  goalTime: { ...typography.h2, color: colors.text },
  goalTimeSelected: { color: colors.primary },
  goalDesc: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs },
  // Ready
  readyContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  readyEmoji: { fontSize: 80, marginBottom: spacing.lg },
  readyTitle: { ...typography.h1, color: colors.text, marginBottom: spacing.md },
  readySubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl },
  readySummary: { gap: spacing.sm },
  summaryText: { ...typography.body, color: colors.text },
});
