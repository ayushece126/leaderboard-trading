import { credentials } from "@grpc/grpc-js";
import { AuthClient } from "../../proto/auth";

const GRPC_SERVER_URL = "103.106.59.179:50054"; // Default server URL, configurable for tests

function createAuthClient(serverUrl: string = GRPC_SERVER_URL): AuthClient {
  return new AuthClient(serverUrl, credentials.createInsecure());
}

export { createAuthClient, GRPC_SERVER_URL };
