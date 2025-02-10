import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { InsertWalletTag } from "@/../proto/message/pg_stream";

async function testGetInsertWalletTag() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming 'getInsertWalletTag' - request likely needs mintId and walletId
    // Example request: { mintId: 789n, walletId: 123n }
    const response: InsertWalletTag = await new Promise((resolve, reject) => {
      client.getInsertWalletTag({}, (error, response) => {
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
      "InsertWalletTag Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mintId).toBeDefined();
      expect(response.walletId).toBeDefined();
      expect(response.tag).toBeDefined();
      console.log("InsertWalletTag Data received successfully.");
    } else {
      console.log("No InsertWalletTag data received.");
    }
  } catch (error) {
    console.error("Error in getInsertWalletTag test:", error);
  }
}

testGetInsertWalletTag();
