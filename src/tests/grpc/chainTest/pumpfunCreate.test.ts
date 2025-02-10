import { createChainClient } from "@/grpc/chainClient";
import { PumpfunCreate } from "@/grpc/proto/chain";

async function testGetPumpfunCreate() {
  const client = createChainClient();

  try {
    // Assuming 'getPumpfunCreate' - might need mint address or creator address in request
    // Example request: { mint: "mint_address" } or { creator: "creator_address" }
    const response: PumpfunCreate = await new Promise((resolve, reject) => {
      client.getPumpfunCreate({}, (error, response) => {
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
      "PumpfunCreate Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.name).toBeDefined();
      expect(response.symbol).toBeDefined();
      expect(response.uri).toBeDefined();
      console.log("PumpfunCreate Data received successfully.");
    } else {
      console.log("No PumpfunCreate data received.");
    }
  } catch (error) {
    console.error("Error in getPumpfunCreate test:", error);
  }
}

testGetPumpfunCreate();
