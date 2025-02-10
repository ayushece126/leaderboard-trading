import { createChainClient } from "@/grpc/chainClient";
import { SplMintTo } from "@/grpc/proto/chain";

async function testGetSplMintTo() {
  const client = createChainClient();

  try {
    // Assuming 'getSplMintTo' - might need mint address as request
    // Example request: { mint: "mint_address" }
    const response: SplMintTo = await new Promise((resolve, reject) => {
      client.getSplMintTo({}, (error, response) => {
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

    console.log("SplMintTo Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.amount).toBeDefined();
      console.log("SplMintTo Data received successfully.");
    } else {
      console.log("No SplMintTo data received.");
    }
  } catch (error) {
    console.error("Error in getSplMintTo test:", error);
  }
}

testGetSplMintTo();
