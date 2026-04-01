import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,
  FlatList, TextInput, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Button } from '../src/components/ui/Button';
import { db, schema } from '../src/db/client';
import { eq } from 'drizzle-orm';
import { useI18n } from '../src/i18n';
import { onboardingDone } from '../src/stores/onboardingFlag';
import { useBottomInset } from '../src/hooks/useBottomInset';

const { width: SCREEN_W } = Dimensions.get('window');

// Slides, purposes, levels, and goals are now generated dynamically with i18n in the component

type Step = 'slides' | 'name' | 'purpose' | 'level' | 'goal' | 'ready';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const bottomInset = useBottomInset();

  const SLIDES = [
    {
      emoji: '🇯🇵',
      title: t('onboarding.slide1Title'),
      subtitle: t('onboarding.slide1Desc'),
    },
    {
      emoji: '🧠',
      title: t('onboarding.slide2Title'),
      subtitle: t('onboarding.slide2Desc'),
    },
    {
      emoji: '✏️',
      title: t('onboarding.slide3Title'),
      subtitle: t('onboarding.slide3Desc'),
    },
  ];

  const PURPOSES = [
    { id: 'school', label: t('onboarding.purposeSchool'), emoji: '🏫' },
    { id: 'kanken', label: t('onboarding.purposeKanken'), emoji: '📝' },
    { id: 'japanese', label: t('onboarding.purposeJapanese'), emoji: '🌏' },
    { id: 'hobby', label: t('onboarding.purposeHobby'), emoji: '🎌' },
  ];

  const LEVELS = [
    { id: 0, label: t('onboarding.beginner'), desc: '' },
    { id: 1, label: '1', desc: '' },
    { id: 2, label: '2', desc: '' },
    { id: 3, label: '3', desc: '' },
    { id: 4, label: '4', desc: '' },
    { id: 5, label: '5+', desc: '' },
  ];

  const GOALS = [
    { minutes: 5, label: '5', desc: '' },
    { minutes: 10, label: '10', desc: '' },
    { minutes: 15, label: '15', desc: '' },
    { minutes: 30, label: '30', desc: '' },
  ];
  const [step, setStep] = useState<Step>('slides');
  const [slideIndex, setSlideIndex] = useState(0);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [level, setLevel] = useState(0);
  const [goalMinutes, setGoalMinutes] = useState(10);
  const flatListRef = useRef<FlatList>(null);

  async function completeOnboarding() {
    const today = new Date().toISOString().split('T')[0];
    try {
      await db
        .update(schema.userProfile)
        .set({
          name: name || t('onboarding.namePlaceholder'),
          currentGrade: Math.max(1, level) as number,
          dailyGoalMinutes: goalMinutes,
          lastStudyDate: today,
        })
        .where(eq(schema.userProfile.id, 1));
    } catch (e) {
      console.warn('[Onboarding] Failed to save profile:', e);
    }
    onboardingDone();
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
            title={slideIndex === SLIDES.length - 1 ? t('onboarding.start') : t('onboarding.next')}
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
          <Text style={styles.stepTitle}>{t('onboarding.name')}</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder={t('onboarding.namePlaceholder')}
            placeholderTextColor={colors.textLight}
            maxLength={20}
          />
        </View>
        <View style={styles.bottomActions}>
          <Button title={t('onboarding.next')} onPress={() => setStep('purpose')} />
        </View>
      </View>
    );
  }

  // Purpose selection
  if (step === 'purpose') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{t('onboarding.purpose')}</Text>
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
          <Button title={t('onboarding.next')} onPress={() => setStep('level')} />
        </View>
      </View>
    );
  }

  // Level selection
  if (step === 'level') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.stepScroll} contentContainerStyle={styles.stepScrollContent}>
          <Text style={styles.stepTitle}>{t('onboarding.level')}</Text>
          <View style={styles.levelGrid}>
            {LEVELS.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[styles.levelChip, level === l.id && styles.levelChipSelected]}
                onPress={() => setLevel(l.id)}
              >
                <Text style={[styles.levelChipText, level === l.id && styles.levelChipTextSelected]}>
                  {l.id === 0 ? t('onboarding.beginner') : `${l.label}${t('learn.grade')}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.bottomActions}>
          <Button title={t('onboarding.next')} onPress={() => setStep('goal')} />
        </View>
      </View>
    );
  }

  // Daily goal
  if (step === 'goal') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{t('onboarding.goal')}</Text>
          <View style={styles.goalGrid}>
            {GOALS.map((g) => (
              <TouchableOpacity
                key={g.minutes}
                style={[styles.goalCard, goalMinutes === g.minutes && styles.goalCardSelected]}
                onPress={() => setGoalMinutes(g.minutes)}
              >
                <Text style={[styles.goalTime, goalMinutes === g.minutes && styles.goalTimeSelected]}>
                  {g.label}{t('settings.min')}
                </Text>
                <Text style={styles.goalDesc}>{g.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomActions}>
          <Button title={t('onboarding.next')} onPress={() => setStep('ready')} />
        </View>
      </View>
    );
  }

  // Ready screen
  return (
    <View style={styles.container}>
      <View style={styles.readyContent}>
        <Text style={styles.readyEmoji}>🎉</Text>
        <Text style={styles.readyTitle}>{t('onboarding.ready')}</Text>
        <Text style={styles.readySubtitle}>
          {t('onboarding.welcome')}, {name || ''}
        </Text>
        <View style={styles.readySummary}>
          <Text style={styles.summaryText}>📚 {level === 0 ? 1 : level}{t('learn.grade')} start</Text>
          <Text style={styles.summaryText}>⏱️ {goalMinutes}{t('settings.min')}</Text>
          <Text style={styles.summaryText}>🎯 {purpose ? PURPOSES.find((p) => p.id === purpose)?.label : ''}</Text>
        </View>
      </View>
      <View style={styles.bottomActions}>
        <Button title={t('onboarding.start')} onPress={completeOnboarding} />
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
  bottomActions: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: 48, gap: spacing.md },
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
  stepScroll: { flex: 1 },
  stepScrollContent: { padding: spacing.xl, paddingTop: spacing.xxxl },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  levelChip: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    minWidth: '45%',
    alignItems: 'center',
  },
  levelChipSelected: { borderColor: colors.primary, backgroundColor: '#FEF2F2' },
  levelChipText: { ...typography.label, color: colors.text },
  levelChipTextSelected: { color: colors.primary },
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
