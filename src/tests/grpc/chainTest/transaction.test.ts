import { createChainClient } from "@/grpc/chainClient";
import { Transaction } from "@/grpc/proto/chain";

async function testGetTransaction() {
  const client = createChainClient();

  // Example transaction signature - replace with a valid one if you know one.
  const testSignature = "YOUR_TEST_TRANSACTION_SIGNATURE_HERE"; // Replace this!

  try {
    const response: Transaction = await new Promise((resolve, reject) => {
      // Assuming a method like 'getTransaction' that takes a request with signature
      client.getTransaction({ signature: testSignature }, (error, response) => {
        // Adjust request type if needed
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    const replacer = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;

    console.log("Transaction Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.signature).toBeDefined();
      expect(response.slot).toBeDefined();
      expect(response.timestamp).toBeDefined();
      expect(response.signers).toBeInstanceOf(Array); // Check if signers is an array
      console.log("Transaction Data received successfully.");
    } else {
      console.log("No Transaction data received.");
    }
  } catch (error) {
    console.error("Error in getTransaction test:", error);
  }
}

testGetTransaction();
