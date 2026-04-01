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

export default function HomeScreen() {
  const router = useRouter();
  const { stats, streakDays, loadStats, loadDueCards } = useStudyStore();
  const { t } = useI18n();

  useEffect(() => {
    loadStats();
  }, []);

  const totalKanji = stats.newCount + stats.learningCount + stats.reviewCount + stats.masteredCount;
  const masteredRatio = totalKanji > 0 ? stats.masteredCount / totalKanji : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 스트릭 & 인사 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{t('home.title')}</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakCount}>{streakDays}</Text>
        </View>
      </View>

      {/* 오늘의 학습 현황 */}
      <Card style={styles.todayCard}>
        <Text style={styles.cardTitle}>{t('home.todayStudy')}</Text>
        <View style={styles.statsRow}>
          <StatBlock label={t('home.dueCards')} value={stats.dueCount} color={colors.primary} />
          <StatBlock label={t('learn.studying')} value={stats.learningCount} color={colors.srsLearning} />
          <StatBlock label={t('home.mastered')} value={stats.masteredCount} color={colors.srsMastered} />
        </View>
        <Button
          title={stats.dueCount > 0 ? `${t('home.startReview')} (${stats.dueCount})` : t('home.startLearn')}
          onPress={() => {
            if (stats.dueCount > 0) {
              loadDueCards();
              router.push('/review');
            } else {
              router.push('/(tabs)/learn');
            }
          }}
          style={styles.startButton}
        />
      </Card>

      {/* 전체 진도 */}
      <Card style={styles.progressCard}>
        <Text style={styles.cardTitle}>{t('home.gradeProgress')}</Text>
        <ProgressBar
          progress={masteredRatio}
          color={colors.accent}
          showLabel
          label={`${stats.masteredCount} / ${totalKanji || 1026} ${t('home.chars')}`}
          style={styles.progressBar}
        />
      </Card>

      {/* 학년별 진도 */}
      <Card>
        <Text style={styles.cardTitle}>{t('home.gradeProgress')}</Text>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={styles.gradeRow}
            onPress={() => router.push(`/(tabs)/learn?grade=${g.grade}`)}
          >
            <Text style={styles.gradeLabel}>{g.grade}{t('learn.grade')}</Text>
            <Text style={styles.gradeCount}>{g.count}{t('home.chars')}</Text>
            <ProgressBar
              progress={0}
              color={g.color}
              height={6}
              style={styles.gradeProgress}
            />
          </TouchableOpacity>
        ))}
      </Card>
    </ScrollView>
  );
}

function StatBlock({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.statBlock}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...typography.h1,
    color: colors.text,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    ...shadow.sm,
  },
  streakEmoji: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  streakCount: {
    ...typography.label,
    color: colors.primary,
  },
  todayCard: {
    backgroundColor: colors.surface,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statBlock: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h1,
    fontSize: 32,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  startButton: {
    marginTop: spacing.sm,
  },
  progressCard: {},
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
    width: 60,
  },
  gradeCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    width: 40,
  },
  gradeProgress: {
    flex: 1,
    marginLeft: spacing.sm,
  },
});
