import { createTradeClient } from "@/grpc/tradeClient"; // Adjust path
import {
  SetTradeConfigPresetRequest,
  SetTradeConfigPresetResponse,
  TradeConfigPreset,
  TradeConfig,
} from "@/../proto/trade"; // Adjust path

async function testSetTradeConfigPreset() {
  const client = createTradeClient();

  const newPreset = TradeConfigPreset.create({
    name: "myTestPreset", // Choose a unique preset name
    buyConfig: TradeConfig.create({
      maxSlippageBps: 75,
      mevProtectEnabled: true,
      priorityFee: BigInt(500), // ✅ Use native BigInt
      tip: BigInt(100), // ✅ Use native BigInt
    }),
    sellConfig: TradeConfig.create({
      maxSlippageBps: 50,
      mevProtectEnabled: false,
      priorityFee: BigInt(1000), // ✅ Use native BigInt
      tip: BigInt(200), // ✅ Use native BigInt
    }),
  });

  const request = SetTradeConfigPresetRequest.create({ preset: newPreset });

  try {
    const response: SetTradeConfigPresetResponse = await new Promise(
      (resolve, reject) => {
        client.setTradeConfigPreset(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    );

    console.log("SetTradeConfigPreset Response:", JSON.stringify(response));
    console.log("Success:", response.success);
  } catch (error) {
    console.error("Error in setTradeConfigPreset test:", error);
  }
}

testSetTradeConfigPreset();
