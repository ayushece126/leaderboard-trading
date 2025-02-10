import { createChainClient } from "@/grpc/chainClient";
import { SplInitialize } from "@/grpc/proto/chain";

async function testGetSplInitialize() {
  const client = createChainClient();

  try {
    // Assuming 'getSplInitialize' - might need mint address as request
    // Example request: { mint: "mint_address" }
    const response: SplInitialize = await new Promise((resolve, reject) => {
      client.getSplInitialize({}, (error, response) => {
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
      "SplInitialize Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.decimals).toBeDefined();
      console.log("SplInitialize Data received successfully.");
    } else {
      console.log("No SplInitialize data received.");
    }
  } catch (error) {
    console.error("Error in getSplInitialize test:", error);
  }
}

testGetSplInitialize();
