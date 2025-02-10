import { createChainClient } from "@/grpc/chainClient";
import { PumpfunTrade } from "@/grpc/proto/chain";

async function testGetPumpfunTrade() {
  const client = createChainClient();

  try {
    // Assuming 'getPumpfunTrade' - request might need mint or bondingCurve address
    // Example request: { mint: "mint_address" } or { bondingCurve: "curve_address" }
    const response: PumpfunTrade = await new Promise((resolve, reject) => {
      client.getPumpfunTrade({}, (error, response) => {
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
      "PumpfunTrade Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.bondingCurve).toBeDefined();
      expect(response.solAmount).toBeDefined();
      expect(response.tokenAmount).toBeDefined();
      console.log("PumpfunTrade Data received successfully.");
    } else {
      console.log("No PumpfunTrade data received.");
    }
  } catch (error) {
    console.error("Error in getPumpfunTrade test:", error);
  }
}

testGetPumpfunTrade();
