import { createChainClient } from "@/grpc/chainClient";
import { RaydiumInitialize } from "@/grpc/proto/chain";

async function testGetRaydiumInitialize() {
  const client = createChainClient();

  try {
    // Assuming 'getRaydiumInitialize' - request might need ammId or market address
    // Example request: { ammId: "amm_id" } or { market: "market_address" }
    const response: RaydiumInitialize = await new Promise((resolve, reject) => {
      client.getRaydiumInitialize({}, (error, response) => {
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
      "RaydiumInitialize Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.ammId).toBeDefined();
      expect(response.baseMint).toBeDefined();
      expect(response.quoteMint).toBeDefined();
      expect(response.lpMint).toBeDefined();
      console.log("RaydiumInitialize Data received successfully.");
    } else {
      console.log("No RaydiumInitialize data received.");
    }
  } catch (error) {
    console.error("Error in getRaydiumInitialize test:", error);
  }
}

testGetRaydiumInitialize();
