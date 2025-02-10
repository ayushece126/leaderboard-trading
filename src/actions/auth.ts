"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function registerWallet(walletAddress: string) {
  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1);

    if (existing) {
      await tx
        .update(users)
        .set({ lastActive: new Date() })
        .where(eq(users.id, existing.id));
      return existing;
    }

    const [newUser] = await tx
      .insert(users)
      .values({ walletAddress })
      .returning();

    return newUser;
  });
}
