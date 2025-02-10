import { SnapviewClient } from "@/../proto/snapview"; // Adjust path if needed
import { ChannelCredentials } from "@grpc/grpc-js";

const grpcSnapServerUrl =
  process.env.GRPC_SNAP_SERVER_URL || "103.106.59.179:50059";

export function createSnapviewClient(): SnapviewClient {
  return new SnapviewClient(
    grpcSnapServerUrl,
    ChannelCredentials.createInsecure()
  );
}
