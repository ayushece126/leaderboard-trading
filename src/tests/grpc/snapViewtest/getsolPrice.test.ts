import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import { GetSolPriceRequest, GetSolPriceResponse } from "@/../proto/snapview";

async function testGetSolPrice() {
  const client = createSnapviewClient();
  const request = GetSolPriceRequest.create({});

  try {
    const response: GetSolPriceResponse = await new Promise(
      (resolve, reject) => {
        client.getSolPrice(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    console.log("GetSolPrice Response:", JSON.stringify(response));
    console.log("SOL Price:", response.price);
  } catch (error) {
    console.error("Error in getSolPrice test:", error);
  }
}

testGetSolPrice();
