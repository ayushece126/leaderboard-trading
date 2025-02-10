// app/api/auth/nonce/route.ts
import { NextResponse } from "next/server";
import { generateNonce } from "@/lib/nonce";

export async function POST(request: Request) {
  const { walletAddress } = await request.json();

  try {
    const nonce = await generateNonce(walletAddress);
    return NextResponse.json({ nonce });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}

// app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { verifyNonce } from "@/lib/nonce";

export async function POST(request: Request) {
  const { walletAddress, signature } = await request.json();

  try {
    const isValid = await verifyNonce(walletAddress, signature);
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 401 });
  }
}
