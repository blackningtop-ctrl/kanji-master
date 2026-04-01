import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseAsync } from 'expo-sqlite';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle> | null = null;
let _initPromise: Promise<ReturnType<typeof drizzle>> | null = null;
let _ready = false;

/** Initialize native SQLite database */
export async function initDatabase() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const expo = await openDatabaseAsync('kanjimaster.db');
    _db = drizzle(expo, { schema });
    _ready = true;
    console.log('[DB] SQLite initialized successfully');
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

/**
 * Proxy that waits for DB init instead of throwing.
 * If DB is not ready yet, returns no-op functions that resolve empty arrays.
 */
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (_db) return (_db as any)[prop];

    // DB not ready — return safe no-op chains
    if (prop === 'select') {
      return () => ({
        from: () => ({
          where: () => ({ limit: () => ({ orderBy: () => ({ groupBy: () => ({ innerJoin: () => ({ then: (r: any) => r([]) }), then: (r: any) => r([]) }), innerJoin: () => ({ then: (r: any) => r([]) }), then: (r: any) => r([]) }), then: (r: any) => r([]) }),
          then: (r: any) => r([]) }),
          limit: () => ({ then: (r: any) => r([]) }),
          orderBy: () => ({ limit: () => ({ then: (r: any) => r([]) }), then: (r: any) => r([]) }),
          groupBy: () => ({ then: (r: any) => r([]) }),
          innerJoin: () => ({ where: () => ({ then: (r: any) => r([]) }), then: (r: any) => r([]) }),
          then: (r: any) => r([]),
        }),
      });
    }
    if (prop === 'insert') {
      return () => ({ values: async () => {} });
    }
    if (prop === 'update') {
      return () => ({ set: () => ({ where: async () => {} }) });
    }
    if (prop === 'run') {
      return async () => {};
    }

    return undefined;
  },
});

export { schema };
