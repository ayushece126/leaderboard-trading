import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { SetWalletFundedAt } from "@/../proto/message/pg_stream";

async function testGetSetWalletFundedAt() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming 'getSetWalletFundedAt' - request likely needs walletId
    // Example request: { walletId: 123n }
    const response: SetWalletFundedAt = await new Promise((resolve, reject) => {
      client.getSetWalletFundedAt({}, (error, response) => {
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
      "SetWalletFundedAt Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.walletId).toBeDefined();
      expect(response.fundedAt).toBeDefined();
      console.log("SetWalletFundedAt Data received successfully.");
    } else {
      console.log("No SetWalletFundedAt data received.");
    }
  } catch (error) {
    console.error("Error in getSetWalletFundedAt test:", error);
  }
}

testGetSetWalletFundedAt();
