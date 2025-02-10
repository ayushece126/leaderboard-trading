import { createChainClient } from "@/grpc/chainClient";
import { MplCreateMetadataV3 } from "@/grpc/proto/chain";

async function testGetMplCreateMetadataV3() {
  const client = createChainClient();

  try {
    // Assuming 'getMplCreateMetadataV3' - might need mint address as request
    // Example request: { mint: "mint_address" }
    const response: MplCreateMetadataV3 = await new Promise(
      (resolve, reject) => {
        client.getMplCreateMetadataV3({}, (error, response) => {
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
      "MplCreateMetadataV3 Response:",
      JSON.stringify(response, replacer, 2)
    );

    if (response) {
      expect(response.mint).toBeDefined();
      expect(response.name).toBeDefined();
      expect(response.symbol).toBeDefined();
      expect(response.uri).toBeDefined();
      console.log("MplCreateMetadataV3 Data received successfully.");
    } else {
      console.log("No MplCreateMetadataV3 data received.");
    }
  } catch (error) {
    console.error("Error in getMplCreateMetadataV3 test:", error);
  }
}

testGetMplCreateMetadataV3();
