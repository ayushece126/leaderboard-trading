import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, trades } from "@/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { wallet: string } }
) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.walletAddress, params.wallet),
      with: {
        trades: {
          limit: 50,
          orderBy: (trades, { desc }) => [desc(trades.timestamp)],
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      username: user.username,
      trades: user.trades,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
