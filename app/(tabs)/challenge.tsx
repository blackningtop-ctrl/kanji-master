import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';
import { GRADE_INFO } from '../../src/types/kanji';
import { QUIZ_TYPE_INFO, QuizType } from '../../src/types/quiz';
import { useI18n } from '../../src/i18n';

interface PracticeItem {
  key: string;
  labelKey: string;
  descKey: string;
  action: () => void;
}

interface PracticeSection {
  titleKey: string;
  items: PracticeItem[];
}

export default function ChallengeScreen() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState(1);
  const { t } = useI18n();

  function getKanjiIdsForGrade(grade: number): number[] {
    const startId = GRADE_INFO.slice(0, grade - 1).reduce((sum, g) => sum + g.count, 0) + 1;
    const count = GRADE_INFO[grade - 1].count;
    return Array.from({ length: count }, (_, i) => startId + i);
  }

  function navigateQuiz(type: QuizType) {
    const ids = getKanjiIdsForGrade(selectedGrade);
    const writingTypes: QuizType[] = ['reading-to-write', 'meaning-to-write', 'dictation', 'fill-in-blank'];
    if (writingTypes.includes(type)) {
      router.push(`/write-quiz?type=${type}&kanjiIds=${JSON.stringify(ids)}`);
    } else {
      router.push(`/quiz?type=${type}&kanjiIds=${JSON.stringify(ids)}`);
    }
  }

  function navigateComprehensive() {
    const ids = getKanjiIdsForGrade(selectedGrade);
    const allTypes: QuizType[] = [
      'kanji-to-reading', 'kanji-to-meaning', 'compound-reading',
      'audio-to-kanji', 'reading-to-write', 'meaning-to-write',
    ];
    const randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
    const writingTypes: QuizType[] = ['reading-to-write', 'meaning-to-write', 'dictation', 'fill-in-blank'];
    if (writingTypes.includes(randomType)) {
      router.push(`/write-quiz?type=${randomType}&kanjiIds=${JSON.stringify(ids)}`);
    } else {
      router.push(`/quiz?type=${randomType}&kanjiIds=${JSON.stringify(ids)}`);
    }
  }

  const sections: PracticeSection[] = [
    {
      titleKey: 'challenge.readingPractice',
      items: [
        {
          key: 'kanji-to-reading',
          labelKey: 'challenge.kanjiToReading',
          descKey: 'challenge.kanjiToReadingDesc',
          action: () => navigateQuiz('kanji-to-reading'),
        },
        {
          key: 'kanji-to-meaning',
          labelKey: 'challenge.kanjiToMeaning',
          descKey: 'challenge.kanjiToMeaningDesc',
          action: () => navigateQuiz('kanji-to-meaning'),
        },
        {
          key: 'compound-reading',
          labelKey: 'challenge.compoundReading',
          descKey: 'challenge.compoundReadingDesc',
          action: () => navigateQuiz('compound-reading'),
        },
      ],
    },
    {
      titleKey: 'challenge.writingPractice',
      items: [
        {
          key: 'reading-to-write',
          labelKey: 'challenge.readingToWrite',
          descKey: 'challenge.readingToWriteDesc',
          action: () => navigateQuiz('reading-to-write'),
        },
        {
          key: 'meaning-to-write',
          labelKey: 'challenge.meaningToWrite',
          descKey: 'challenge.meaningToWriteDesc',
          action: () => navigateQuiz('meaning-to-write'),
        },
      ],
    },
    {
      titleKey: 'challenge.listeningPractice',
      items: [
        {
          key: 'audio-to-kanji',
          labelKey: 'challenge.audioToKanji',
          descKey: 'challenge.audioToKanjiDesc',
          action: () => navigateQuiz('audio-to-kanji'),
        },
      ],
    },
    {
      titleKey: 'challenge.comprehensiveTest',
      items: [
        {
          key: 'comprehensive-mixed',
          labelKey: 'challenge.comprehensiveMixed',
          descKey: 'challenge.comprehensiveMixedDesc',
          action: () => navigateComprehensive(),
        },
      ],
    },
    {
      titleKey: 'challenge.kankenMock',
      items: [
        {
          key: 'kanken-by-level',
          labelKey: 'challenge.kankenByLevel',
          descKey: 'challenge.kankenByLevelDesc',
          action: () => navigateQuiz('kanji-to-meaning'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('challenge.title')}</Text>
      <Text style={styles.subtitle}>{t('challenge.subtitle')}</Text>

      {/* Grade selector */}
      <View style={styles.gradeSelector}>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={[styles.gradeTab, selectedGrade === g.grade && { backgroundColor: g.color }]}
            onPress={() => setSelectedGrade(g.grade)}
          >
            <Text style={[styles.gradeTabText, selectedGrade === g.grade && { color: '#fff' }]}>
              {g.grade}{t('learn.grade')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Practice sections */}
      {sections.map((section) => (
        <View key={section.titleKey} style={styles.section}>
          <Text style={styles.sectionTitle}>{t(section.titleKey)}</Text>
          <Card style={styles.sectionCard}>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.practiceRow,
                  index < section.items.length - 1 && styles.practiceRowBorder,
                ]}
                activeOpacity={0.6}
                onPress={item.action}
              >
                <View style={styles.practiceRowContent}>
                  <Text style={styles.practiceLabel}>{t(item.labelKey)}</Text>
                  <Text style={styles.practiceDesc}>{t(item.descKey)}</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xxxl },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xs },
  gradeSelector: { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.sm },
  gradeTab: {
    flex: 1, paddingVertical: spacing.sm, borderRadius: radius.md,
    alignItems: 'center', backgroundColor: colors.surface, ...shadow.sm,
  },
  gradeTabText: { ...typography.label, color: colors.textSecondary },
  section: { gap: spacing.xs },
  sectionTitle: { ...typography.h3, color: colors.text, fontWeight: '700' },
  sectionCard: { padding: 0, overflow: 'hidden' },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  practiceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  practiceRowContent: { flex: 1 },
  practiceLabel: { ...typography.body, color: colors.text, fontWeight: '600' },
  practiceDesc: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  arrow: { ...typography.body, color: colors.textLight, fontSize: 18, marginLeft: spacing.sm },
});
