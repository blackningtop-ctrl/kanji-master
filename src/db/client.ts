import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseAsync } from 'expo-sqlite';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle> | null = null;
let _initPromise: Promise<ReturnType<typeof drizzle>> | null = null;

/** Initialize native SQLite database */
export async function initDatabase() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const expo = await openDatabaseAsync('kanjimaster.db');
    _db = drizzle(expo, { schema });
    return _db;
  })();

  return _initPromise;
}

export function getDb() {
  if (!_db) throw new Error('Database not initialized. Call initDatabase() first.');
  return _db;
}

// Proxy for backward compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (!_db) throw new Error('Database not initialized. Call initDatabase() first.');
    return (_db as any)[prop];
  },
});

export { schema };
