import { createChainClient } from "@/grpc/chainClient";
import { RaydiumSwap } from "@/grpc/proto/chain";

async function testGetRaydiumSwap() {
  const client = createChainClient();

  try {
    // Assuming 'getRaydiumSwap' - request might need ammId or user address
    // Example request: { ammId: "amm_id" } or { user: "user_address" }
    const response: RaydiumSwap = await new Promise((resolve, reject) => {
      client.getRaydiumSwap({}, (error, response) => {
        // Adjust request if needed
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    const replacer = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;

    console.log("RaydiumSwap Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.ammId).toBeDefined();
      expect(response.user).toBeDefined();
      expect(response.direction).toBeDefined();
      expect(response.baseAmount).toBeDefined();
      expect(response.quoteAmount).toBeDefined();
      console.log("RaydiumSwap Data received successfully.");
    } else {
      console.log("No RaydiumSwap data received.");
    }
  } catch (error) {
    console.error("Error in getRaydiumSwap test:", error);
  }
}

testGetRaydiumSwap();
