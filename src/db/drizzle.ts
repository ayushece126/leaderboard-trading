import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { LRUCache } from "lru-cache";
import { LeaderboardEntry } from "../../leaderboard";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, { schema });

export const leaderboardCache = new LRUCache<string, LeaderboardEntry[]>({
  max: 100,
  ttl: 15_000,
});

export async function checkDBHealth() {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
