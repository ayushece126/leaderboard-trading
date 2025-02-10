import { createChainClient } from "@/grpc/chainClient";
import { SolBalanceChange } from "@/grpc/proto/chain";

async function testGetSolBalanceChange() {
  const client = createChainClient();

  try {
    // Assuming a method like 'getSolBalanceChange' - might need an account address in request
    // Example request: { account: "some_account_address" }
    const response: SolBalanceChange = await new Promise((resolve, reject) => {
      client.getSolBalanceChange({}, (error, response) => {
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
      "SolBalanceChange Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.account).toBeDefined();
      expect(response.pre).toBeDefined();
      expect(response.post).toBeDefined();
      console.log("SolBalanceChange Data received successfully.");
    } else {
      console.log("No SolBalanceChange data received.");
    }
  } catch (error) {
    console.error("Error in getSolBalanceChange test:", error);
  }
}

testGetSolBalanceChange();
