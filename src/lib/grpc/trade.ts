import { TradeClient, TradeService } from "@/../proto/trade"; // Adjust path
import { ChannelCredentials } from "@grpc/grpc-js";

const grpcServerUrl = process.env.GRPC_SERVER_URL || "103.106.59.179:50054"; // Use your provided URL
const client = new TradeClient(
  grpcServerUrl,
  ChannelCredentials.createInsecure()
);

// Or for the SNAP server:
const grpcSnapServerUrl =
  process.env.GRPC_SNAP_SERVER_URL || "103.106.59.179:50059"; // Use your provided URL
const snapClient = new TradeClient(
  grpcSnapServerUrl,
  ChannelCredentials.createInsecure()
);
