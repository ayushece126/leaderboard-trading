import { db } from "@/db";
import { eq } from "drizzle-orm";
import { nonces } from "@/db/schema";
import crypto from "crypto";

export const generateNonce = async (walletAddress: string) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  await db.insert(nonces).values({
    walletAddress,
    nonce,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });
  return nonce;
};

export const verifyNonce = async (walletAddress: string, signature: string) => {
  const result = await db
    .delete(nonces)
    .where(eq(nonces.walletAddress, walletAddress))
    .returning();

  if (!result[0] || new Date() > result[0].expiresAt) {
    throw new Error("Invalid or expired nonce");
  }

  // Add actual signature verification logic here
  return true;
};
