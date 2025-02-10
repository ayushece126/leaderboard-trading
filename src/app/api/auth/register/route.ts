import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema"; // Assuming your Drizzle schema is in '@/db/schema' - Adjust path
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, referralTag, walletPublicKey } = req.body; // Get registration data

  if (!username || !walletPublicKey) {
    return res.status(400).json({
      error: "Username and walletPublicKey are required for registration",
    });
  }

  const userUuid = uuidv4(); // Generate a UUID for the user

  try {
    // Check if wallet is already registered (Optional - depends on your requirements)
    // const existingRegistration = await db.select().from(leaderboardRegistrations).where(eq(leaderboardRegistrations.walletPublicKey, walletPublicKey));
    // if (existingRegistration.length > 0) {
    //   return res.status(409).json({ error: 'Wallet already registered' });
    // }

    // Insert new user into 'users' table (adjust schema as needed)
    await db.insert(users).values({
      uuid: userUuid,
      username: username,
      primaryWalletPubKey: walletPublicKey, // Store wallet public key
      referralTag: referralTag || null, // Optional referral tag
      telegramId: "", // You might want to collect Telegram ID later or leave it empty initially
      // ... other user fields as per your schema
    });

    // Optionally, you could also add an entry to a 'leaderboard_registrations' table here if needed.

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userUuid: userUuid,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (dbError: any) {
    console.error("Database error during user registration:", dbError);
    return res
      .status(500)
      .json({ error: "Failed to register user", details: dbError.message });
  }
}
