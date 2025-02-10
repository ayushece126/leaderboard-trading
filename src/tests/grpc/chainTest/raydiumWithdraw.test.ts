import { createChainClient } from "@/grpc/chainClient";
import { RaydiumWithdraw } from "@/grpc/proto/chain";

async function testGetRaydiumWithdraw() {
  const client = createChainClient();

  try {
    // Assuming 'getRaydiumWithdraw' - request might need ammId or user address
    // Example request: { ammId: "amm_id" } or { user: "user_address" }
    const response: RaydiumWithdraw = await new Promise((resolve, reject) => {
      client.getRaydiumWithdraw({}, (error, response) => {
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

    console.log(
      "RaydiumWithdraw Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.ammId).toBeDefined();
      expect(response.lpMint).toBeDefined();
      expect(response.user).toBeDefined();
      expect(response.lpAmount).toBeDefined();
      expect(response.baseAmount).toBeDefined();
      expect(response.quoteAmount).toBeDefined();
      console.log("RaydiumWithdraw Data received successfully.");
    } else {
      console.log("No RaydiumWithdraw data received.");
    }
  } catch (error) {
    console.error("Error in getRaydiumWithdraw test:", error);
  }
}

testGetRaydiumWithdraw();
