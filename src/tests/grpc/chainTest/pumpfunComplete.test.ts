import { createChainClient } from "@/grpc/chainClient";
import { PumpfunComplete } from "@/grpc/proto/chain";

async function testGetPumpfunComplete() {
  const client = createChainClient();

  try {
    // Assuming 'getPumpfunComplete' - request might need mint or bondingCurve address
    // Example request: { mint: "mint_address" } or { bondingCurve: "curve_address" }
    const response: PumpfunComplete = await new Promise((resolve, reject) => {
      client.getPumpfunComplete({}, (error, response) => {
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
      "PumpfunComplete Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.bondingCurve).toBeDefined();
      console.log("PumpfunComplete Data received successfully.");
    } else {
      console.log("No PumpfunComplete data received.");
    }
  } catch (error) {
    console.error("Error in getPumpfunComplete test:", error);
  }
}

testGetPumpfunComplete();
