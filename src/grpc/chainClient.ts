import { ChainClient } from "@/grpc/proto/chain"; // Adjust path to your generated proto
import { ChannelCredentials } from "@grpc/grpc-js";

const grpcChainServerUrl =
  process.env.GRPC_SERVER_URL || "103.106.59.179:50054"; // Use GRPC_SERVER_URL

export function createChainClient(): ChainClient {
  return new ChainClient(
    grpcChainServerUrl,
    ChannelCredentials.createInsecure() // Or use secure credentials if needed
  );
}
