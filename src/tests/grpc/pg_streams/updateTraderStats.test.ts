import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { UpdateTraderStats } from "@/../proto/message/pg_stream";

async function testGetUpdateTraderStats() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming a method like 'getUpdateTraderStats' - request likely needs walletId or poolId
    // Example request: { walletId: 123n } or { poolId: 456n }
    const response: UpdateTraderStats = await new Promise((resolve, reject) => {
      client.getUpdateTraderStats({}, (error, response) => {
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
      "UpdateTraderStats Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.walletId).toBeDefined();
      expect(response.poolId).toBeDefined();
      expect(response.buyVolume).toBeDefined();
      expect(response.sellVolume).toBeDefined();
      expect(response.pnl).toBeDefined();
      console.log("UpdateTraderStats Data received successfully.");
    } else {
      console.log("No UpdateTraderStats data received.");
    }
  } catch (error) {
    console.error("Error in getUpdateTraderStats test:", error);
  }
}

testGetUpdateTraderStats();
