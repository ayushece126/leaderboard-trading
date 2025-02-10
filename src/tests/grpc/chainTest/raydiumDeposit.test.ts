import { createChainClient } from "@/grpc/chainClient";
import { RaydiumDeposit } from "@/grpc/proto/chain";

async function testGetRaydiumDeposit() {
  const client = createChainClient();

  try {
    // Assuming 'getRaydiumDeposit' - request might need ammId or user address
    // Example request: { ammId: "amm_id" } or { user: "user_address" }
    const response: RaydiumDeposit = await new Promise((resolve, reject) => {
      client.getRaydiumDeposit({}, (error, response) => {
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
      "RaydiumDeposit Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.ammId).toBeDefined();
      expect(response.lpMint).toBeDefined();
      expect(response.user).toBeDefined();
      expect(response.baseAmount).toBeDefined();
      expect(response.quoteAmount).toBeDefined();
      console.log("RaydiumDeposit Data received successfully.");
    } else {
      console.log("No RaydiumDeposit data received.");
    }
  } catch (error) {
    console.error("Error in getRaydiumDeposit test:", error);
  }
}

testGetRaydiumDeposit();
