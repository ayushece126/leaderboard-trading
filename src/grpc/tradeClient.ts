import { TradeClient } from "@/../proto/trade"; // Adjust path if needed
import { ChannelCredentials } from "@grpc/grpc-js";

const grpcServerUrl = process.env.GRPC_SERVER_URL || "103.106.59.179:50054";

export function createTradeClient(): TradeClient {
  return new TradeClient(grpcServerUrl, ChannelCredentials.createInsecure());
}
