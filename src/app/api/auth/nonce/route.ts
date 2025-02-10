import type { NextApiRequest, NextApiResponse } from "next";
import { createAuthClient } from "@/grpc/authClient"; // Adjust path if needed
import { CreateSessionRequest, CreateSessionResponse } from "@/../proto/auth"; // Adjust path if needed
import { promisifyGrpc } from "@/../proto/promisify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { telegramId, username, fingerprint, referrer } = req.body; // Get data from request body

  if (!fingerprint) {
    return res.status(400).json({ error: "Fingerprint is required" });
  }

  const client = createAuthClient();
  const createSessionRequest = CreateSessionRequest.create({
    telegramId: telegramId || "", // Placeholders if not available yet
    username: username || "", // Placeholders if not available yet
    fingerprint: fingerprint,
    referrer: referrer || "", // Optional referrer
  });

  try {
    const createSessionResponse: CreateSessionResponse = await promisifyGrpc<
      CreateSessionRequest,
      CreateSessionResponse
    >(client.createSession.bind(client), createSessionRequest);

    return res.status(200).json({ nonce: createSessionResponse.nonce });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating session/nonce:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate nonce", details: error.message });
  }
}
