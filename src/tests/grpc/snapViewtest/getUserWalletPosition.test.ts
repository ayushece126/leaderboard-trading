import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import {
  GetUserPositionRequest,
  GetUserPositionResponse,
} from "@/../proto/snapview"; // Adjust path

async function testGetUserPosition(walletAddress: string, mintAddress: string) {
  const client = createSnapviewClient();
  const request = GetUserPositionRequest.create({ walletAddress, mintAddress });

  try {
    const response: GetUserPositionResponse = await new Promise(
      (resolve, reject) => {
        client.getUserPosition(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    console.log("GetUserPosition Response:", JSON.stringify(response));
    if (response.snap) {
      console.log("User Position Snap:", JSON.stringify(response.snap)); // Inspect MintWalletSnap
    } else {
      console.log(
        `No position found for wallet: ${walletAddress}, mint: ${mintAddress}`
      );
    }
  } catch (error) {
    console.error("Error in getUserPosition test:", error);
  }
}

// Replace with valid wallet and mint addresses for testing
const testWalletAddress = "Ed8Li5WB82WEtJaTTCWYEyogcHQC32XtpBi7enCUowQW";
const testMintAddressForPosition =
  "7DdHyxLZQuudndfrX3ZDDqgK6zPFbm17wGwKJqgjpump";
testGetUserPosition(testWalletAddress, testMintAddressForPosition);
