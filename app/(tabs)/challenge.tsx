import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';
import { GRADE_INFO } from '../../src/types/kanji';
import { QUIZ_TYPE_INFO, QuizType } from '../../src/types/quiz';

const CHALLENGES = [
  { id: 'speed', emoji: '⚡', title: 'スピードクイズ', desc: '制限時間内に最多正解', color: '#EF4444' },
  { id: 'boss', emoji: '👹', title: 'ボスバトル', desc: '学年別総合テスト', color: '#8B5CF6' },
  { id: 'kanken', emoji: '📝', title: '漢検模試', desc: '漢字検定の模擬試験', color: '#3B82F6' },
];

const QUIZ_TYPES: { type: QuizType; free: boolean }[] = [
  { type: 'kanji-to-reading', free: true },
  { type: 'kanji-to-meaning', free: true },
  { type: 'compound-reading', free: true },
  { type: 'audio-to-kanji', free: true },
  { type: 'reading-to-write', free: true },
  { type: 'meaning-to-write', free: true },
  { type: 'radical-match', free: true },
  { type: 'stroke-count', free: true },
  { type: 'antonym-synonym', free: true },
  { type: 'sentence-completion', free: true },
  { type: 'dictation', free: true },
  { type: 'fill-in-blank', free: true },
];

export default function ChallengeScreen() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState(1);

  function startQuiz(type: QuizType) {
    const gradeInfo = GRADE_INFO[selectedGrade - 1];
    const startId = GRADE_INFO.slice(0, selectedGrade - 1).reduce((sum, g) => sum + g.count, 0) + 1;
    const ids = Array.from({ length: gradeInfo.count }, (_, i) => startId + i);

    const writingTypes: QuizType[] = ['reading-to-write', 'meaning-to-write', 'dictation', 'fill-in-blank'];
    if (writingTypes.includes(type)) {
      router.push(`/write-quiz?type=${type}&kanjiIds=${JSON.stringify(ids)}`);
    } else {
      router.push(`/quiz?type=${type}&kanjiIds=${JSON.stringify(ids)}`);
    }
  }

  function startBoss() {
    const gradeInfo = GRADE_INFO[selectedGrade - 1];
    const startId = GRADE_INFO.slice(0, selectedGrade - 1).reduce((sum, g) => sum + g.count, 0) + 1;
    const ids = Array.from({ length: gradeInfo.count }, (_, i) => startId + i);
    // Boss battle rotates through reading quiz types
    const bossTypes: QuizType[] = ['kanji-to-reading', 'kanji-to-meaning', 'compound-reading', 'radical-match'];
    const randomType = bossTypes[Math.floor(Math.random() * bossTypes.length)];
    router.push(`/quiz?type=${randomType}&kanjiIds=${JSON.stringify(ids)}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>挑戦</Text>
      <Text style={styles.subtitle}>実力を試そう！</Text>

      {/* Grade selector */}
      <View style={styles.gradeSelector}>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={[styles.gradeTab, selectedGrade === g.grade && { backgroundColor: g.color }]}
            onPress={() => setSelectedGrade(g.grade)}
          >
            <Text style={[styles.gradeTabText, selectedGrade === g.grade && { color: '#fff' }]}>
              {g.grade}年
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Special challenges */}
      {CHALLENGES.map((c) => (
        <TouchableOpacity
          key={c.id}
          activeOpacity={0.7}
          onPress={() => {
            if (c.id === 'boss') startBoss();
            else if (c.id === 'speed') startQuiz('kanji-to-reading');
            else if (c.id === 'kanken') startQuiz('kanji-to-meaning');
          }}
        >
          <Card style={styles.challengeCard}>
            <View style={[styles.iconCircle, { backgroundColor: c.color }]}>
              <Text style={styles.emoji}>{c.emoji}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardDesc}>{c.desc}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      {/* Quiz type selection */}
      <Text style={styles.sectionTitle}>クイズ12種</Text>
      <View style={styles.quizGrid}>
        {QUIZ_TYPES.map(({ type }) => {
          const info = QUIZ_TYPE_INFO[type];
          return (
            <TouchableOpacity
              key={type}
              style={styles.quizTypeCard}
              onPress={() => startQuiz(type)}
            >
              <Text style={styles.quizIcon}>{info.icon}</Text>
              <Text style={styles.quizLabel} numberOfLines={1}>{info.labelJa}</Text>
              <Text style={styles.quizCategory}>{info.category === 'reading' ? '読み' : info.category === 'writing' ? '書き' : '知識'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm },
  gradeSelector: { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.sm },
  gradeTab: {
    flex: 1, paddingVertical: spacing.sm, borderRadius: radius.md,
    alignItems: 'center', backgroundColor: colors.surface, ...shadow.sm,
  },
  gradeTabText: { ...typography.label, color: colors.textSecondary },
  challengeCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconCircle: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 24 },
  cardContent: { flex: 1 },
  cardTitle: { ...typography.h3, color: colors.text },
  cardDesc: { ...typography.bodySmall, color: colors.textSecondary },
  sectionTitle: { ...typography.h2, color: colors.text, marginTop: spacing.md },
  quizGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quizTypeCard: {
    width: '31%', backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center', ...shadow.sm,
  },
  quizIcon: { fontSize: 28, marginBottom: spacing.xs },
  quizLabel: { ...typography.caption, color: colors.text, fontWeight: '600', textAlign: 'center' },
  quizCategory: { ...typography.caption, color: colors.textLight, fontSize: 10, marginTop: 2 },
});
