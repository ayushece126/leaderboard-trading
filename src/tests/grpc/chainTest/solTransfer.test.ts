import { createChainClient } from "@/grpc/chainClient";
import { SolTransfer } from "@/grpc/proto/chain";

async function testGetSolTransfer() {
  const client = createChainClient();

  try {
    // Assuming a method like 'getSolTransfer' might exist, and takes some identifier.
    // You'll need to replace {} with an actual request if needed, e.g., { signature: "some_tx_sig" }
    const response: SolTransfer = await new Promise((resolve, reject) => {
      client.getSolTransfer({}, (error, response) => {
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

    console.log("SolTransfer Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.sender).toBeDefined();
      expect(response.receiver).toBeDefined();
      expect(response.lamports).toBeDefined();
      console.log("SolTransfer Data received successfully.");
    } else {
      console.log("No SolTransfer data received.");
    }
  } catch (error) {
    console.error("Error in getSolTransfer test:", error);
  }
}

testGetSolTransfer();
