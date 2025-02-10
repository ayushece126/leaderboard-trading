import { createChainClient } from "@/grpc/chainClient"; // Assuming chainClient is still relevant
import { InsertGlobalWalletTag } from "@/../proto/message/pg_stream"; // Adjust path

async function testGetInsertGlobalWalletTag() {
  const client = createChainClient(); // Or a pgStreamClient if different service

  try {
    // Assuming 'getInsertGlobalWalletTag' - request likely needs walletId
    // Example request: { walletId: 123n }
    const response: InsertGlobalWalletTag = await new Promise(
      (resolve, reject) => {
        client.getInsertGlobalWalletTag({}, (error, response) => {
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
      "InsertGlobalWalletTag Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.walletId).toBeDefined();
      expect(response.tagType).toBeDefined();
      expect(response.tag).toBeDefined();
      console.log("InsertGlobalWalletTag Data received successfully.");
    } else {
      console.log("No InsertGlobalWalletTag data received.");
    }
  } catch (error) {
    console.error("Error in getInsertGlobalWalletTag test:", error);
  }
}

testGetInsertGlobalWalletTag();
