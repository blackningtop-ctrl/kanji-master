import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { useI18n } from '../../src/i18n';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{emoji}</Text>
  );
}

export default function TabLayout() {
  const { t } = useI18n();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
        },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tab.learn'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="📖" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: t('tab.write'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="✏️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: t('tab.challenge'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏆" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab.profile'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
});
