import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Button } from '../src/components/ui/Button';
import { db, schema } from '../src/db/client';
import { eq } from 'drizzle-orm';
import { useI18n } from '../src/i18n';
import { onboardingDone } from '../src/stores/onboardingFlag';

type Step = 'intro' | 'jlpt' | 'daily';

type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

const JLPT_OPTIONS: { id: JlptLevel; desc: string; grade: number }[] = [
  { id: 'N5', desc: '기초 한자 80자 (1단계)', grade: 1 },
  { id: 'N4', desc: '일상 한자 240자 (1-2단계)', grade: 2 },
  { id: 'N3', desc: '중급 한자 640자 (1-4단계)', grade: 4 },
  { id: 'N2', desc: '상급 한자 1,026자 (전체)', grade: 6 },
  { id: 'N1', desc: '전체 + 심화 학습', grade: 6 },
];

const DAILY_OPTIONS = [5, 10, 15, 20];

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useI18n();

  const [step, setStep] = useState<Step>('intro');
  const [jlpt, setJlpt] = useState<JlptLevel>('N5');
  const [dailyCount, setDailyCount] = useState(10);

  async function completeOnboarding() {
    const today = new Date().toISOString().split('T')[0];
    const selected = JLPT_OPTIONS.find((o) => o.id === jlpt)!;
    try {
      await db
        .update(schema.userProfile)
        .set({
          currentGrade: selected.grade,
          dailyNewLimit: dailyCount,
          lastStudyDate: today,
        })
        .where(eq(schema.userProfile.id, 1));
    } catch (e) {
      console.warn('[Onboarding] Failed to save profile:', e);
    }
    onboardingDone();
    router.replace('/');
  }

  // Step 1: Intro
  if (step === 'intro') {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.introTitle}>
            {t('onboarding.slide1Title')}
          </Text>
          <Text style={styles.introSubtitle}>
            {t('onboarding.slide1Desc')}
          </Text>
        </View>
        <View style={styles.bottomActions}>
          <Button
            title={t('onboarding.start')}
            onPress={() => setStep('jlpt')}
          />
        </View>
      </View>
    );
  }

  // Step 2: JLPT Goal Selection
  if (step === 'jlpt') {
    return (
      <View style={styles.container}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            {t('onboarding.slide2Title')}
          </Text>
          <View style={styles.jlptList}>
            {JLPT_OPTIONS.map((option) => {
              const selected = jlpt === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.jlptRow, selected && styles.jlptRowSelected]}
                  onPress={() => setJlpt(option.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.jlptLabel,
                      selected && styles.jlptLabelSelected,
                    ]}
                  >
                    {option.id}
                  </Text>
                  <Text
                    style={[
                      styles.jlptDesc,
                      selected && styles.jlptDescSelected,
                    ]}
                  >
                    {option.desc}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomActions}>
          <Button
            title={t('onboarding.next')}
            onPress={() => setStep('daily')}
          />
        </View>
      </View>
    );
  }

  // Step 3: Daily Kanji Count
  return (
    <View style={styles.container}>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>
          {t('onboarding.slide3Title')}
        </Text>
        <View style={styles.chipRow}>
          {DAILY_OPTIONS.map((count) => {
            const selected = dailyCount === count;
            return (
              <TouchableOpacity
                key={count}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setDailyCount(count)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    selected && styles.chipTextSelected,
                  ]}
                >
                  {count}{t('home.chars')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.bottomActions}>
        <Button
          title={t('onboarding.start')}
          onPress={completeOnboarding}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Intro
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  introTitle: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  introSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  // Steps
  stepContent: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  stepTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  bottomActions: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 48,
  },
  // JLPT list
  jlptList: {
    gap: spacing.sm,
  },
  jlptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  jlptRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '0A',
  },
  jlptLabel: {
    ...typography.h2,
    color: colors.text,
    width: 48,
  },
  jlptLabelSelected: {
    color: colors.primary,
  },
  jlptDesc: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  jlptDescSelected: {
    color: colors.text,
  },
  // Daily chips
  chipRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  chip: {
    flex: 1,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '0A',
  },
  chipText: {
    ...typography.label,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.primary,
  },
});
