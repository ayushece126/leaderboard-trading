import { createChainClient } from "@/grpc/chainClient";
import { SplSetAuthority } from "@/grpc/proto/chain";

async function testGetSplSetAuthority() {
  const client = createChainClient();

  try {
    // Assuming 'getSplSetAuthority' - might need mint address as request
    // Example request: { mint: "mint_address" }
    const response: SplSetAuthority = await new Promise((resolve, reject) => {
      client.getSplSetAuthority({}, (error, response) => {
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
      "SplSetAuthority Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.authorityType).toBeDefined();
      console.log("SplSetAuthority Data received successfully.");
    } else {
      console.log("No SplSetAuthority data received.");
    }
  } catch (error) {
    console.error("Error in getSplSetAuthority test:", error);
  }
}

testGetSplSetAuthority();
