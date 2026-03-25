import { Platform } from 'react-native';
import * as schema from './schema';

let _db: any = null;
let _initPromise: Promise<any> | null = null;
let _isWeb = false;

// In-memory data store for web
let _webStore: {
  kanji: any[];
  radicals: any[];
  vocabulary: any[];
  mnemonics: any[];
  srsCards: any[];
  reviewHistory: any[];
  userProfile: any[];
  dailyStats: any[];
} = {
  kanji: [],
  radicals: [],
  vocabulary: [],
  mnemonics: [],
  srsCards: [],
  reviewHistory: [],
  userProfile: [],
  dailyStats: [],
};

export function isWebPlatform() {
  return _isWeb;
}

export function getWebStore() {
  return _webStore;
}

/** Initialize DB — uses expo-sqlite on native, in-memory on web */
export async function initDatabase() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _isWeb = Platform.OS === 'web';

  _initPromise = (async () => {
    if (_isWeb) {
      console.log('[DB] Web platform: using in-memory store');
      _db = createWebProxy();
    } else {
      const { drizzle } = await import('drizzle-orm/expo-sqlite');
      const { openDatabaseAsync } = await import('expo-sqlite');
      const expo = await openDatabaseAsync('kanjimaster.db');
      _db = drizzle(expo, { schema });
    }
    return _db;
  })();

  return _initPromise;
}

function createWebProxy() {
  const tableMap: Record<string, keyof typeof _webStore> = {
    kanji: 'kanji',
    radicals: 'radicals',
    vocabulary: 'vocabulary',
    mnemonics: 'mnemonics',
    srs_cards: 'srsCards',
    review_history: 'reviewHistory',
    user_profile: 'userProfile',
    daily_stats: 'dailyStats',
  };

  function resolveTableName(table: any): keyof typeof _webStore {
    if (typeof table === 'string') return tableMap[table] ?? 'kanji';
    // Drizzle schema table objects have a Symbol or _ property
    const sym = table[Symbol.for('drizzle:Name')];
    if (sym && tableMap[sym]) return tableMap[sym];
    // Fallback: check known schema objects
    if (table === schema.kanji) return 'kanji';
    if (table === schema.radicals) return 'radicals';
    if (table === schema.vocabulary) return 'vocabulary';
    if (table === schema.mnemonics) return 'mnemonics';
    if (table === schema.srsCards) return 'srsCards';
    if (table === schema.reviewHistory) return 'reviewHistory';
    if (table === schema.userProfile) return 'userProfile';
    if (table === schema.dailyStats) return 'dailyStats';
    return 'kanji';
  }

  let autoIds: Record<string, number> = {};

  return {
    run: async () => {},
    select: (fields?: any) => ({
      from: (table: any) => {
        const name = resolveTableName(table);
        return createChain(name, fields);
      },
    }),
    insert: (table: any) => ({
      values: async (data: any | any[]) => {
        const name = resolveTableName(table);
        const rows = Array.isArray(data) ? data : [data];
        for (const row of rows) {
          const newRow = { ...row };
          if (newRow.id === undefined) {
            autoIds[name] = (autoIds[name] ?? 0) + 1;
            newRow.id = autoIds[name];
          }
          _webStore[name].push(newRow);
        }
      },
    }),
    update: (table: any) => ({
      set: (data: any) => ({
        where: async (condition: any) => {
          const name = resolveTableName(table);
          const arr = _webStore[name];
          for (let i = 0; i < arr.length; i++) {
            if (matchCondition(arr[i], condition)) {
              arr[i] = { ...arr[i], ...data };
            }
          }
        },
      }),
    }),
  };

  function createChain(tableName: keyof typeof _webStore, selectFields?: any) {
    let _cond: any = null;
    let _lim: number | null = null;
    let _joins: any[] = [];

    const chain: any = {
      where: (c: any) => { _cond = c; return chain; },
      orderBy: () => chain,
      limit: (n: number) => { _lim = n; return chain; },
      groupBy: () => chain,
      innerJoin: (jTable: any, jCond: any) => {
        _joins.push({ table: jTable, cond: jCond });
        return chain;
      },
      then: (resolve: any) => {
        let data = [..._webStore[tableName]];

        if (_cond) {
          data = data.filter((row) => matchCondition(row, _cond));
        }

        // Handle SQL count aggregates
        if (selectFields) {
          const keys = Object.keys(selectFields);
          const hasAgg = keys.some((k) => {
            const v = selectFields[k];
            return v && typeof v === 'object' && (v.queryChunks || v.sql);
          });
          if (hasAgg) {
            resolve([{ count: data.length, correct: data.filter((r: any) => r.correct).length }]);
            return;
          }

          // Return only selected fields
          if (keys.length > 0 && !keys.some((k) => selectFields[k] && typeof selectFields[k] === 'object' && selectFields[k].queryChunks)) {
            // Simple field selection — just return full rows, drizzle handles mapping
          }
        }

        if (_lim) data = data.slice(0, _lim);
        resolve(data);
      },
    };
    return chain;
  }

  function matchCondition(row: any, cond: any): boolean {
    if (!cond) return true;

    // Drizzle condition objects vary. Try to extract useful info.
    // eq() produces BinaryOperator with left (column) and right (value)
    try {
      if (cond.operator === '=' && cond.left && cond.right !== undefined) {
        const colName = getColumnName(cond.left);
        const val = cond.right?.value ?? cond.right;
        return row[colName] === val;
      }
      if (cond.operator === '<=' && cond.left) {
        const colName = getColumnName(cond.left);
        const val = cond.right?.value ?? cond.right;
        return row[colName] <= val;
      }
      if (cond.operator === '!=' && cond.left) {
        const colName = getColumnName(cond.left);
        const val = cond.right?.value ?? cond.right;
        return row[colName] !== val;
      }
      // AND operator
      if (cond.operator === 'and' && Array.isArray(cond.conditions)) {
        return cond.conditions.every((c: any) => matchCondition(row, c));
      }
      // inArray
      if (cond.operator === 'in' && cond.left && cond.right) {
        const colName = getColumnName(cond.left);
        const values = cond.right?.values ?? cond.right;
        return Array.isArray(values) && values.includes(row[colName]);
      }
    } catch {
      // If we can't parse the condition, match everything
    }
    return true;
  }

  function getColumnName(col: any): string {
    if (typeof col === 'string') return col;
    if (col?.name) return toCamelCase(col.name);
    if (col?.columnName) return toCamelCase(col.columnName);
    return '';
  }

  function toCamelCase(s: string): string {
    return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  }
}

export function getDb() {
  if (!_db) throw new Error('Database not initialized. Call initDatabase() first.');
  return _db;
}

// Proxy for backward compatibility
export const db = new Proxy({} as any, {
  get(_target, prop) {
    if (!_db) throw new Error('Database not initialized. Call initDatabase() first.');
    return (_db as any)[prop];
  },
});

export { schema };
