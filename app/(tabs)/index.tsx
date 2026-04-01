import { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { Button } from '../../src/components/ui/Button';
import { useStudyStore } from '../../src/stores/useStudyStore';
import { GRADE_INFO } from '../../src/types/kanji';
import { useI18n } from '../../src/i18n';

const TOTAL_KANJI = 1026;

export default function HomeScreen() {
  const router = useRouter();
  const { stats, streakDays, loadStats, loadDueCards } = useStudyStore();
  const { t } = useI18n();

  useEffect(() => {
    loadStats();
  }, []);

  const learnedCount = stats.learningCount + stats.reviewCount + stats.masteredCount;
  const progressRatio = learnedCount / TOTAL_KANJI;
  const progressPercent = Math.round(progressRatio * 100);
  const newAvailable = TOTAL_KANJI - learnedCount - stats.newCount;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 오늘의 학습 */}
      <Card style={styles.todayCard}>
        <Text style={styles.cardTitle}>오늘의 학습</Text>
        <View style={styles.dualStat}>
          <View style={styles.dualStatBlock}>
            <Text style={styles.bigNumber}>{stats.dueCount}</Text>
            <Text style={styles.bigNumberLabel}>복습 대기</Text>
          </View>
          <View style={styles.dualStatDivider} />
          <View style={styles.dualStatBlock}>
            <Text style={[styles.bigNumber, { color: colors.info }]}>{newAvailable > 0 ? newAvailable : 0}</Text>
            <Text style={styles.bigNumberLabel}>신규 한자</Text>
          </View>
        </View>
        <View style={styles.ctaRow}>
          <Button
            title="복습 시작"
            onPress={() => {
              loadDueCards();
              router.push('/review');
            }}
            style={{...styles.ctaButton, ...(!stats.dueCount ? styles.ctaDisabled : {})}}
          />
          <Button
            title="새 한자 학습"
            variant="outline"
            onPress={() => router.push('/(tabs)/learn')}
            style={styles.ctaButton}
          />
        </View>
      </Card>

      {/* 전체 진도 */}
      <Card style={styles.progressCard}>
        <Text style={styles.sectionLabel}>전체 진도</Text>
        <ProgressBar
          progress={progressRatio}
          color={colors.accent}
          showLabel
          label={`${learnedCount} / ${TOTAL_KANJI}자  ${progressPercent}%`}
          style={styles.progressBar}
        />
      </Card>

      {/* 단계별 진도 */}
      <Card>
        <Text style={styles.sectionLabel}>단계별 진도</Text>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={styles.gradeRow}
            onPress={() => router.push(`/(tabs)/learn?grade=${g.grade}`)}
          >
            <Text style={styles.gradeLabel}>{g.label}</Text>
            <Text style={styles.gradeCount}>{g.count}자</Text>
            <ProgressBar
              progress={0}
              color={g.color}
              height={6}
              style={styles.gradeProgress}
            />
          </TouchableOpacity>
        ))}
      </Card>

      {/* 연속 학습 */}
      <Text style={styles.streakText}>연속 학습 {streakDays}일</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  todayCard: {
    backgroundColor: colors.surface,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  dualStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dualStatBlock: {
    flex: 1,
    alignItems: 'center',
  },
  dualStatDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.border,
  },
  bigNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 48,
  },
  bigNumberLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  ctaButton: {
    flex: 1,
  },
  ctaSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ctaDisabled: {
    opacity: 0.5,
  },
  progressCard: {},
  sectionLabel: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  progressBar: {
    marginTop: spacing.sm,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  gradeLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    width: 110,
  },
  gradeCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    width: 45,
    textAlign: 'right',
    marginRight: spacing.sm,
  },
  gradeProgress: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  streakText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
