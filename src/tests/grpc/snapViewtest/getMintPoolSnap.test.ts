import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import {
  GetMintPoolSnapRequest,
  GetMintPoolSnapResponse,
} from "@/../proto/snapview"; // Adjust path

async function testGetMintPoolSnap(mintAddress: string) {
  const client = createSnapviewClient();
  const request = GetMintPoolSnapRequest.create({ mintAddress });

  try {
    const response: GetMintPoolSnapResponse = await new Promise(
      (resolve, reject) => {
        client.getMintPoolSnap(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );
    const replacer = (key, value) => {
      if (typeof value === "bigint") {
        return value.toString(); // Convert BigInt to string
      }
      return value;
    };

    console.log(
      "GetMintPoolSnap Response:",
      JSON.stringify(response, replacer, 2)
    );
    if (response.snap) {
      console.log(
        "Mint Pool Snap Data:",
        JSON.stringify(response.snap, replacer, 2)
      ); // Inspect the MintPoolSnap structure
    } else {
      console.log("No MintPoolSnap found for address:", mintAddress);
    }
  } catch (error) {
    console.error("Error in getMintPoolSnap test:", error);
  }
}

// Replace with a valid mint address you want to test with
const testMintAddress = "7DdHyxLZQuudndfrX3ZDDqgK6zPFbm17wGwKJqgjpump";
testGetMintPoolSnap(testMintAddress);
