// "use server";

// import { db, leaderboardCache } from "@/db/drizzle";
// import { sql } from "drizzle-orm";
// import { z } from "zod";
// import { LeaderboardEntry } from "../../leaderboard";

// export const timeframeSchema = z.enum(["daily", "weekly", "monthly"]);

// export async function getLeaderboard(
//   timeframe: z.infer<typeof timeframeSchema>
// ): Promise<LeaderboardEntry[]> {
//   const parsedTimeframe = timeframeSchema.parse(timeframe);
//   const cacheKey = `leaderboard-${parsedTimeframe}`;

//   const cached = leaderboardCache.get(cacheKey);
//   if (cached) return cached;

//   try {
//     const data = await db.execute<LeaderboardEntry>(sql`
//       WITH user_stats AS (
//         SELECT
//           u.id,
//           u.username,
//           u.wallet_address,
//           COUNT(t.id) as total_trades,
//           COUNT(t.id) FILTER (WHERE t.success) as successful_trades,
//           SUM(t.sol_amount::numeric) as total_sol_pnl,
//           SUM(t.usd_value::numeric) as total_usd_pnl
//         FROM users u
//         LEFT JOIN trades t ON u.id = t.user_id
//         WHERE t.timestamp >= CASE ${parsedTimeframe}
//           WHEN 'daily' THEN NOW() - INTERVAL '1 DAY'
//           WHEN 'weekly' THEN NOW() - INTERVAL '1 WEEK'
//           WHEN 'monthly' THEN NOW() - INTERVAL '1 MONTH'
//         END
//         GROUP BY u.id
//       )
//       SELECT
//         ROW_NUMBER() OVER (ORDER BY total_sol_pnl DESC) as rank,
//         username,
//         wallet_address as "walletId",
//         CONCAT(successful_trades, '/', total_trades) as stats,
//         total_sol_pnl::float as "solPnl",
//         total_usd_pnl::float as "usdPnl"
//       FROM user_stats
//       ORDER BY rank
//       LIMIT 100
//     `);

//     const result = data.rows as LeaderboardEntry[];
//     leaderboardCache.set(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch leaderboard");
//   }
// }

import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path if needed
import {
  GetUserPositionsRequest,
  GetUserPositionsResponse,
} from "@/../proto/snapview"; // Adjust path if needed
import { promisifyGrpc } from "@/../proto/promisify"; // Adjust path if needed

interface UserPNLData {
  userUuid: string;
  totalRealizedPnl: number;
}

export async function fetchUserPNL(userUuid: string): Promise<UserPNLData> {
  const client = createSnapviewClient();
  const request = GetUserPositionsRequest.create({ userUuid });

  try {
    const response: GetUserPositionsResponse = await promisifyGrpc<
      GetUserPositionsRequest,
      GetUserPositionsResponse
    >(
      client.getUserPositions.bind(client), // Use .bind(client) to ensure correct 'this' context
      request
    );

    let totalRealizedPnl = 0;
    if (response.snaps) {
      response.snaps.forEach((snap) => {
        if (snap.realizedPnl !== undefined) {
          totalRealizedPnl += snap.realizedPnl;
        }
      });
    }

    return { userUuid, totalRealizedPnl };
  } catch (error) {
    console.error(`Error fetching PNL data for user ${userUuid}:`, error);
    return { userUuid, totalRealizedPnl: 0 }; // Return 0 PNL in case of error, or handle differently
  }
}
