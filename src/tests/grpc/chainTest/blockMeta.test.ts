import { createChainClient } from "@/grpc/chainClient"; // Adjust path
import { BlockMeta } from "@/grpc/proto/chain"; // Adjust path

async function testGetBlockMeta() {
  const client = createChainClient();

  try {
    // Assuming there's a GetBlockMeta method that takes an empty request
    // or maybe a request with a slot number (you'll need to check the actual service definition)
    const response: BlockMeta = await new Promise((resolve, reject) => {
      // Assuming the method is called 'getBlockMeta' - adjust if different
      client.getBlockMeta({}, (error, response) => {
        // Replace {} with actual request if needed
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    const replacer = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;

    console.log("BlockMeta Response:", JSON.stringify(response, replacer, 2));

    if (response) {
      expect(response.slot).toBeDefined(); // Add basic assertions based on expected response
      expect(response.timestamp).toBeDefined();
      console.log("Block Meta Data received successfully.");
    } else {
      console.log("No BlockMeta data received.");
    }
  } catch (error) {
    console.error("Error in getBlockMeta test:", error);
    // Consider using a testing framework's fail assertion here if needed.
    // For simple tests, console.error is enough.
  }
}

testGetBlockMeta();
