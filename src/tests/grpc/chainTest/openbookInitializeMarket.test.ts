import { createChainClient } from "@/grpc/chainClient";
import { OpenbookInitializeMarket } from "@/grpc/proto/chain";

async function testGetOpenbookInitializeMarket() {
  const client = createChainClient();

  try {
    // Assuming 'getOpenbookInitializeMarket' - request might need market address
    // Example request: { market: "market_address" }
    const response: OpenbookInitializeMarket = await new Promise(
      (resolve, reject) => {
        client.getOpenbookInitializeMarket({}, (error, response) => {
          // Adjust request if needed
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    const replacer = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;

    console.log(
      "OpenbookInitializeMarket Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.market).toBeDefined();
      expect(response.baseMint).toBeDefined();
      expect(response.quoteMint).toBeDefined();
      console.log("OpenbookInitializeMarket Data received successfully.");
    } else {
      console.log("No OpenbookInitializeMarket data received.");
    }
  } catch (error) {
    console.error("Error in getOpenbookInitializeMarket test:", error);
  }
}

testGetOpenbookInitializeMarket();
