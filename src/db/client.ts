import * as schema from './schema';

let _db: any = null;
let _initPromise: Promise<any> | null = null;

/** Initialize DB asynchronously (required for web WASM support) */
export async function initDatabase() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const { drizzle } = await import('drizzle-orm/expo-sqlite');
    const { openDatabaseAsync } = await import('expo-sqlite');
    const expo = await openDatabaseAsync('kanjimaster.db');
    _db = drizzle(expo, { schema });
    return _db;
  })();

  return _initPromise;
}

/** Get the initialized DB instance (throws if not initialized) */
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
