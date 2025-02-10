import { createTradeClient } from "@/grpc/tradeClient"; // Adjust path
import {
  SpotBuyRequest,
  SpotBuyResponse,
} from "@/grpc/generated/service/trade_pb"; // Adjust path
import { BigInt } from "@bufbuild/protobuf"; // Import BigInt

async function testSpotBuy() {
  const client = createTradeClient();
  const request = SpotBuyRequest.create({
    fromPubKey: "YOUR_PUBLIC_KEY_HERE", // Replace with a valid public key
    quoteAmount: BigInt(100), // Example quote amount, replace with your amount
    configPresetName: "default", // Example preset name, replace if needed
    password: "YOUR_PASSWORD_HERE", // Replace with your password
    asset: "ETH", // Optional asset, replace if needed
  });

  try {
    const response: SpotBuyResponse = await new Promise((resolve, reject) => {
      client.spotBuy(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    console.log("SpotBuy Response:", response.toJSON());
    console.log("Signature:", response.signature);
  } catch (error) {
    console.error("Error in spotBuy test:", error);
  }
}

testSpotBuy();
