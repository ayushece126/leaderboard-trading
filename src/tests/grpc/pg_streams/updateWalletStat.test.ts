import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { UpdateWalletStat } from "@/../proto/message/pg_stream";

async function testGetUpdateWalletStat() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming 'getUpdateWalletStat' - request likely needs walletId
    // Example request: { walletId: 123n }
    const response: UpdateWalletStat = await new Promise((resolve, reject) => {
      client.getUpdateWalletStat({}, (error, response) => {
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
      "UpdateWalletStat Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.walletId).toBeDefined();
      // Balance, txCount, avgHoldTime are optional, so check if defined if expected in response
      console.log("UpdateWalletStat Data received successfully.");
    } else {
      console.log("No UpdateWalletStat data received.");
    }
  } catch (error) {
    console.error("Error in getUpdateWalletStat test:", error);
  }
}

testGetUpdateWalletStat();
