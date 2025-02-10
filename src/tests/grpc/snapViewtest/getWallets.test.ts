import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import { GetWalletsRequest, GetWalletsResponse } from "@/../proto/snapview"; // Adjust path

async function testGetWallets(userUuid: string) {
  const client = createSnapviewClient();
  const request = GetWalletsRequest.create({ userUuid });

  try {
    const response: GetWalletsResponse = await new Promise(
      (resolve, reject) => {
        client.getWallets(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    console.log("GetWallets Response:", JSON.stringify(response));
    if (response.wallets && response.wallets.length > 0) {
      response.wallets.forEach((wallet) => {
        console.log("Wallet:", JSON.stringify(wallet)); // Inspect each Wallet object
      });
    } else {
      console.log("No wallets found for userUuid:", userUuid);
    }
  } catch (error) {
    console.error("Error in getWallets test:", error);
  }
}

// Replace with a valid user UUID for testing
const testUserUuidForWallets = "YOUR_USER_UUID_HERE";
testGetWallets(testUserUuidForWallets);
