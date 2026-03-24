import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { WritingCanvas } from '../../src/components/canvas/WritingCanvas';

export default function WriteScreen() {
  const [currentKanji, setCurrentKanji] = useState('一');

  return (
    <View style={styles.container}>
      {/* 대상 한자 표시 */}
      <View style={styles.targetArea}>
        <KanjiText size="medium">{currentKanji}</KanjiText>
        <Text style={styles.hint}>なぞって書いてみましょう</Text>
      </View>

      {/* 쓰기 캔버스 */}
      <WritingCanvas targetKanji={currentKanji} mode="guide" />

      {/* 하단 컨트롤 */}
      <View style={styles.controls}>
        <Button title="消す" variant="outline" size="sm" onPress={() => {}} />
        <Button title="ヒント" variant="ghost" size="sm" onPress={() => {}} />
        <Button title="次へ" variant="primary" size="sm" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  targetArea: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
});
