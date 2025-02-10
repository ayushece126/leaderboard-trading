import { createTradeClient } from "@/grpc/tradeClient"; // Adjust path
import { SpotSellRequest, SpotSellResponse } from "@/../proto/trade"; // Adjust path

async function testSpotSell() {
  const client = createTradeClient();
  const request = SpotSellRequest.create({
    fromPubKey: "YOUR_PUBLIC_KEY_HERE", // Replace with a valid public key
    baseAmount: BigInt(1), // Example base amount, replace with your amount
    configPresetName: "fast", // Example preset name, replace if needed
    password: "YOUR_PASSWORD_HERE", // Replace with your password
    asset: "ETH", // Optional asset, replace if needed
  });

  try {
    const response: SpotSellResponse = await new Promise((resolve, reject) => {
      client.spotSell(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    console.log("SpotSell Response:", JSON.stringify(response));
    console.log("Signature:", response.signature);
  } catch (error) {
    console.error("Error in spotSell test:", error);
  }
}

testSpotSell();
