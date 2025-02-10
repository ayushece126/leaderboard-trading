import type { NextApiRequest, NextApiResponse } from "next";
import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path if needed
import {
  GetUserPositionsRequest,
  GetUserPositionsResponse,
} from "@/../proto/snapview";
import { promisifyGrpc } from "@/../proto/promisify";
import { db } from "@/db/drizzle"; // Adjust path to your Drizzle DB instance
import { users } from "@/db/schema"; // Adjust path to your Drizzle schema
import { eq } from "drizzle-orm";

interface LeaderboardEntry {
  username: string | null | undefined;
  userUuid: string;
  totalRealizedPnl: number;
  walletPublicKey: string | null | undefined; // Consider if you want to expose this
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. Fetch User UUIDs of Leaderboard Registered Users from your DB
    // For simplicity, let's fetch all users for now (in a real app, you'd have a more efficient way to select top users)
    const leaderboardUsers = await db
      .select({
        uuid: users.uuid,
        username: users.username,
        primaryWalletPubKey: users.primaryWalletPubKey,
      })
      .from(users);
    if (!leaderboardUsers || leaderboardUsers.length === 0) {
      return res.status(200).json([]); // Return empty array if no users are registered yet
    }

    const client = createSnapviewClient();
    const leaderboardEntries: LeaderboardEntry[] = [];

    // 2. Fetch PNL Data for Each User and Aggregate
    for (const user of leaderboardUsers) {
      const userUuid = user.uuid;
      const request = GetUserPositionsRequest.create({ userUuid });
      let totalRealizedPnl = 0;

      try {
        const response: GetUserPositionsResponse = await promisifyGrpc<
          GetUserPositionsRequest,
          GetUserPositionsResponse
        >(client.getUserPositions.bind(client), request);

        if (response.snaps) {
          response.snaps.forEach((snap) => {
            if (snap.realizedPnl !== undefined) {
              totalRealizedPnl += snap.realizedPnl;
            }
          });
        }
      } catch (grpcError) {
        console.error(`Error fetching PNL for user ${userUuid}:`, grpcError);
        totalRealizedPnl = 0; // Set PNL to 0 in case of gRPC error, or handle differently
      }

      leaderboardEntries.push({
        userUuid: userUuid,
        username: user.username,
        totalRealizedPnl: totalRealizedPnl,
        walletPublicKey: user.primaryWalletPubKey, // Consider if you want to expose wallet pub key
      });
    }

    // 3. Sort by PNL (Descending)
    leaderboardEntries.sort((a, b) => b.totalRealizedPnl - a.totalRealizedPnl);

    // 4. Limit to Top 10 (or as needed)
    const topLeaderboard = leaderboardEntries.slice(0, 10);

    return res.status(200).json(topLeaderboard);
  } catch (error: any) {
    console.error("Error fetching leaderboard data:", error);
    return res.status(500).json({
      error: "Failed to fetch leaderboard data",
      details: error.message,
    });
  }
}
