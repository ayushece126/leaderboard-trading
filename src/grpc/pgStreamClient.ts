// grpc/pgStreamClient.ts

import { PgStreamClient } from "@/../proto/message/pg_stream"; // Adjust path to your generated proto file
import { ChannelCredentials } from "@grpc/grpc-js";

const grpcPgStreamServerUrl =
  process.env.GRPC_PG_STREAM_SERVER_URL || "103.106.59.179:50054"; // Or use a different default URL if needed.  Using port 50054 as per your env example.

export function createPgStreamClient(): PgStreamClient {
  return new PgStreamClient(
    grpcPgStreamServerUrl,
    ChannelCredentials.createInsecure() // Or use secure credentials if your server requires it
  );
}
