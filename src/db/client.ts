import { Platform } from 'react-native';
import * as schema from './schema';

let _db: any = null;
let _initPromise: Promise<any> | null = null;
let _ready = false;

/** Initialize database — expo-sqlite on native, in-memory on web */
export async function initDatabase() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    if (Platform.OS === 'web') {
      // Web: use in-memory proxy (no real DB)
      _db = createWebProxy();
      console.log('[DB] Web platform: using in-memory proxy');
    } else {
      // Native: use expo-sqlite + drizzle
      const { drizzle } = await import('drizzle-orm/expo-sqlite');
      const { openDatabaseAsync } = await import('expo-sqlite');
      const expo = await openDatabaseAsync('kanjimaster.db');
      _db = drizzle(expo, { schema });
      console.log('[DB] SQLite initialized successfully');
    }
    _ready = true;
    return _db;
  })();

  return _initPromise;
}

export function isDbReady() {
  return _ready;
}

export function getDb() {
  if (!_db) throw new Error('Database not initialized. Call initDatabase() first.');
  return _db;
}

// ─── In-memory web proxy ───
function createWebProxy() {
  const store: Record<string, any[]> = {
    kanji: [], radicals: [], vocabulary: [], mnemonics: [],
    srsCards: [], reviewHistory: [], userProfile: [], dailyStats: [],
    strokeData: [], unlockedBadges: [], writingScores: [],
  };

  const tableNameMap: Record<string, string> = {
    kanji: 'kanji', radicals: 'radicals', vocabulary: 'vocabulary',
    mnemonics: 'mnemonics', srs_cards: 'srsCards', review_history: 'reviewHistory',
    user_profile: 'userProfile', daily_stats: 'dailyStats',
    stroke_data: 'strokeData', unlocked_badges: 'unlockedBadges',
    writing_scores: 'writingScores',
  };
  let autoIds: Record<string, number> = {};

  function resolve(table: any): string {
    if (typeof table === 'string') return tableNameMap[table] ?? table;
    const sym = table?.[Symbol.for('drizzle:Name')];
    if (sym && tableNameMap[sym]) return tableNameMap[sym];
    for (const [schemaKey, schemaTable] of Object.entries(schema)) {
      if (table === schemaTable && tableNameMap[schemaKey]) return tableNameMap[schemaKey];
    }
    return 'kanji';
  }

  function chain(name: string) {
    let data = () => [...(store[name] ?? [])];
    const c: any = {
      where: () => c, orderBy: () => c, limit: (n: number) => {
        const prev = data; data = () => prev().slice(0, n); return c;
      },
      groupBy: () => c, innerJoin: () => c,
      then: (r: any) => r(data()),
    };
    return c;
  }

  return {
    run: async () => {},
    select: (_fields?: any) => ({
      from: (table: any) => chain(resolve(table)),
    }),
    insert: (table: any) => ({
      values: async (rows: any) => {
        const name = resolve(table);
        if (!store[name]) store[name] = [];
        const arr = Array.isArray(rows) ? rows : [rows];
        for (const row of arr) {
          const r = { ...row };
          if (r.id === undefined) {
            autoIds[name] = (autoIds[name] ?? 0) + 1;
            r.id = autoIds[name];
          }
          store[name].push(r);
        }
      },
    }),
    update: (table: any) => ({
      set: (_data: any) => ({
        where: async () => {
          const name = resolve(table);
          const arr = store[name] ?? [];
          if (arr.length > 0) Object.assign(arr[0], _data);
        },
      }),
    }),
  };
}

/**
 * Proxy: uses real DB when ready, safe no-op chains when not.
 */
export const db = new Proxy({} as any, {
  get(_target, prop) {
    if (_db) return (_db as any)[prop];

    // DB not ready — return safe no-op chains
    if (prop === 'select') {
      return () => ({
        from: () => {
          const c: any = {
            where: () => c, orderBy: () => c, groupBy: () => c,
            innerJoin: () => c, limit: () => c,
            then: (r: any) => r([]),
          };
          return c;
        },
      });
    }
    if (prop === 'insert') return () => ({ values: async () => {} });
    if (prop === 'update') return () => ({ set: () => ({ where: async () => {} }) });
    if (prop === 'run') return async () => {};
    return undefined;
  },
});

export { schema };
