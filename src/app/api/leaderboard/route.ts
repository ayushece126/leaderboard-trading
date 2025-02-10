import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/grpc/leaderboard";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get("timeframe") || "ALL_TIME";

  try {
    const entries = await getLeaderboard(timeframe);
    return NextResponse.json(entries);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
