import { createChainClient } from "@/grpc/chainClient";
import { SplBalanceChange } from "@/grpc/proto/chain";

async function testGetSplBalanceChange() {
  const client = createChainClient();

  try {
    // Assuming 'getSplBalanceChange' and request might need mint and owner
    // Example request: { mint: "mint_address", owner: "owner_address" }
    const response: SplBalanceChange = await new Promise((resolve, reject) => {
      client.getSplBalanceChange({}, (error, response) => {
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
      "SplBalanceChange Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.owner).toBeDefined();
      expect(response.pre).toBeDefined();
      expect(response.post).toBeDefined();
      console.log("SplBalanceChange Data received successfully.");
    } else {
      console.log("No SplBalanceChange data received.");
    }
  } catch (error) {
    console.error("Error in getSplBalanceChange test:", error);
  }
}

testGetSplBalanceChange();
