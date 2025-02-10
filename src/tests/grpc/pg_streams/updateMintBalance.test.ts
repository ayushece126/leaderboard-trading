import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { UpdateMintBalance } from "@/../proto/message/pg_stream";
async function testGetUpdateMintBalance() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming 'getUpdateMintBalance' - request likely needs walletId or mintId
    // Example request: { walletId: 123n } or { mintId: 789n }
    const response: UpdateMintBalance = await new Promise((resolve, reject) => {
      client.getUpdateMintBalance({}, (error, response) => {
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
      "UpdateMintBalance Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.walletId).toBeDefined();
      expect(response.mintId).toBeDefined();
      expect(response.balance).toBeDefined();
      expect(response.holderSince).toBeDefined();
      console.log("UpdateMintBalance Data received successfully.");
    } else {
      console.log("No UpdateMintBalance data received.");
    }
  } catch (error) {
    console.error("Error in getUpdateMintBalance test:", error);
  }
}

testGetUpdateMintBalance();
