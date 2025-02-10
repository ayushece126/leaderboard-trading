import { createChainClient } from "@/grpc/chainClient";
import { SplBurn } from "@/grpc/proto/chain";

async function testGetSplBurn() {
  const client = createChainClient();

  try {
    // Assuming 'getSplBurn' - might need mint address as request
    // Example request: { mint: "mint_address" }
    const response: SplBurn = await new Promise((resolve, reject) => {
      client.getSplBurn({}, (error, response) => {
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

    console.log("SplBurn Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.amount).toBeDefined();
      console.log("SplBurn Data received successfully.");
    } else {
      console.log("No SplBurn data received.");
    }
  } catch (error) {
    console.error("Error in getSplBurn test:", error);
  }
}

testGetSplBurn();
