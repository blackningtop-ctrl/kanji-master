import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { initDatabase } from '../src/db/client';
import { runMigrations } from '../src/db/migrate';
import { seedDatabase } from '../src/db/seed';
import { colors } from '../src/theme/colors';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        console.log('[KanjiMaster] Initializing DB...');
        await initDatabase();
        console.log('[KanjiMaster] Starting migrations...');
        await runMigrations();
        console.log('[KanjiMaster] Migrations done. Seeding...');
        await seedDatabase();
        console.log('[KanjiMaster] Seed complete!');
      } catch (e) {
        console.error('[KanjiMaster] DB init failed:', e);
      } finally {
        setReady(true);
        SplashScreen.hideAsync();
      }
    }
    init();
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="kanji/[id]"
          options={{ title: '漢字詳細', presentation: 'card' }}
        />
        <Stack.Screen
          name="review"
          options={{ title: '復習', presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="quiz"
          options={{ title: 'クイズ', presentation: 'fullScreenModal', headerShown: false }}
        />
        <Stack.Screen
          name="write-quiz"
          options={{ title: '書き取り', presentation: 'fullScreenModal', headerShown: false }}
        />
        <Stack.Screen
          name="onboarding"
          options={{ title: '初期設定', presentation: 'fullScreenModal', headerShown: false }}
        />
        <Stack.Screen
          name="collection"
          options={{ title: '漢字図鑑', presentation: 'card' }}
        />
        <Stack.Screen
          name="radical"
          options={{ title: '部首', presentation: 'card' }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
