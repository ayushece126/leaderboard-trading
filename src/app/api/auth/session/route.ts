/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { createAuthClient } from "@/grpc/authClient"; // Adjust path if needed
import { NonceExchangeRequest, NonceExchangeResponse } from "@/../proto/auth"; // Adjust path if needed
import { promisifyGrpc } from "@/../proto/promisify"; // Adjust path if needed
import { ethers } from "ethers"; // For signature verification - Install: `npm install ethers`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { nonce, fingerprint, sessionInfo, walletAddress, signedMessage } =
    req.body;

  if (
    !nonce ||
    !fingerprint ||
    !sessionInfo ||
    !walletAddress ||
    !signedMessage
  ) {
    return res
      .status(400)
      .json({ error: "Missing required parameters for session exchange" });
  }

  // **Wallet Signature Verification (Crucial Step)**
  try {
    const verifiedAddress = ethers.verifyMessage(nonce, signedMessage);
    if (verifiedAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res
        .status(401)
        .json({ error: "Wallet signature verification failed" });
    }
    // Signature is valid - User owns the wallet!
  } catch (signatureError: any) {
    console.error("Signature verification error:", signatureError);
    return res
      .status(401)
      .json({ error: "Invalid signature format or verification issue" });
  }

  const client = createAuthClient();
  const nonceExchangeRequest = NonceExchangeRequest.create({
    nonce,
    fingerprint,
    sessionInfo,
  });

  try {
    const nonceExchangeResponse: NonceExchangeResponse = await promisifyGrpc<
      NonceExchangeRequest,
      NonceExchangeResponse
    >(client.nonceExchange.bind(client), nonceExchangeRequest);

    return res
      .status(200)
      .json({ sessionToken: nonceExchangeResponse.sessionToken });
  } catch (error: any) {
    console.error("Error during nonce exchange:", error);
    return res
      .status(500)
      .json({ error: "Session token exchange failed", details: error.message });
  }
}
