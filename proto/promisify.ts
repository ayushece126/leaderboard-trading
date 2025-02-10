import type { ServiceError, Metadata } from "@grpc/grpc-js"

const METADATA_KEYS = {
  FINGERPRINT: "fp",
  SESSION_TOKEN: "sntkn",
}

export function promisifyGrpc<TRequest, TResponse>(
  fn: (request: TRequest, callback: (error: ServiceError | null, response: TResponse) => void) => void,
  request: TRequest,
): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    fn(request, (error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

export function promisifyGrpcWithMetadata<TRequest, TResponse>(
  fn: (
    request: TRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TResponse) => void,
  ) => void,
  request: TRequest,
  metadata: Metadata,
): Promise<TResponse> {
  console.log("promisifyGrpcWithMetadata called with request:", request)
  console.log("Metadata:", {
    [METADATA_KEYS.FINGERPRINT]: metadata.get(METADATA_KEYS.FINGERPRINT),
    [METADATA_KEYS.SESSION_TOKEN]: metadata.get(METADATA_KEYS.SESSION_TOKEN),
  })
  return new Promise((resolve, reject) => {
    fn(request, metadata, (error, response) => {
      if (error) {
        console.error("gRPC call failed:", error)
        reject(error)
      } else {
        console.log("gRPC call succeeded with response:", response)
        resolve(response)
      }
    })
  })
}

