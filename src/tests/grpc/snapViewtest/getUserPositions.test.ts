import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import {
  GetUserPositionsRequest,
  GetUserPositionsResponse,
} from "@/../proto/snapview"; // Adjust path

async function testGetUserPositions(userUuid: string) {
  const client = createSnapviewClient();
  const request = GetUserPositionsRequest.create({ userUuid });

  try {
    const response: GetUserPositionsResponse = await new Promise(
      (resolve, reject) => {
        client.getUserPositions(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    console.log("GetUserPositions Response:", JSON.stringify(response));
    if (response.snaps && response.snaps.length > 0) {
      response.snaps.forEach((snap) => {
        console.log("User Position Snap:", JSON.stringify(snap)); // Inspect each MintWalletSnap
      });
    } else {
      console.log("No user positions found for userUuid:", userUuid);
    }
  } catch (error) {
    console.error("Error in getUserPositions test:", error);
  }
}

// Replace with a valid user UUID you want to test with
const testUserUuid = "YOUR_USER_UUID_HERE";
testGetUserPositions(testUserUuid);
