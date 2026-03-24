import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';

const CHALLENGES: { id: string; emoji: string; title: string; desc: string; color: string; locked?: boolean }[] = [
  { id: 'speed', emoji: '⚡', title: 'スピードクイズ', desc: '制限時間内に最多正解', color: '#EF4444' },
  { id: 'boss', emoji: '👹', title: 'ボスバトル', desc: '学年別総合テスト', color: '#8B5CF6' },
  { id: 'kanken', emoji: '📝', title: '漢検模試', desc: '漢字検定の模擬試験', color: '#3B82F6' },
  { id: 'battle', emoji: '⚔️', title: '対戦モード', desc: '他のユーザーと対決', color: '#F97316', locked: true },
];

export default function ChallengeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>挑戦</Text>
      <Text style={styles.subtitle}>実力を試そう！</Text>

      {CHALLENGES.map((c) => (
        <TouchableOpacity
          key={c.id}
          activeOpacity={c.locked ? 1 : 0.7}
          onPress={() => {
            if (!c.locked) {
              // TODO: navigate to challenge
            }
          }}
        >
          <Card style={{ ...styles.challengeCard, ...(c.locked ? styles.locked : {}) }}>
            <View style={[styles.iconCircle, { backgroundColor: c.color }]}>
              <Text style={styles.emoji}>{c.emoji}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardDesc}>{c.desc}</Text>
            </View>
            {c.locked && <Text style={styles.lockIcon}>🔒</Text>}
          </Card>
        </TouchableOpacity>
      ))}
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
    gap: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locked: {
    opacity: 0.5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
  },
  cardDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  lockIcon: {
    fontSize: 20,
  },
});
