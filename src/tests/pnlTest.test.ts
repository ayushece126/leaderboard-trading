import { fetchUserPNL } from "@/actions/leaderbaord";
import { createSnapviewClient } from "@/grpc/snapviewClient"; // Adjust path
import { promisifyGrpc } from "../../proto/promisify";

// Mock createSnapviewClient - make it return a mock client object
jest.mock("@/grpc/snapviewClient", () => ({
  createSnapviewClient: jest.fn(() => ({
    // mock implementation of createSnapviewClient
    getUserPositions: jest.fn(), // Mock getUserPositions method on the client
  })),
}));

// Mock promisifyGrpc - make it return predefined responses
jest.mock("../../proto/promisify", () => ({
  promisifyGrpc: jest.fn(), // mock implementation of promisifyGrpc
}));

describe("fetchUserPNL", () => {
  it("should return correct PNL data when gRPC call succeeds with data", async () => {
    // 1. Arrange: Set up mock responses
    const mockRealizedPnl = 123.45;
    const mockUserUuid = "test-user-1";
    const mockGetUserPositionsResponse = {
      // Mock response object
      snaps: [
        { realizedPnl: mockRealizedPnl },
        { realizedPnl: 0 },
        { realizedPnl: -10 }, // Example negative PNL
      ],
    };

    // Tell our mock promisifyGrpc to return this mock response
    (promisifyGrpc as jest.Mock).mockResolvedValue(
      mockGetUserPositionsResponse
    );

    // 2. Act: Call the function we are testing
    const pnlData = await fetchUserPNL(mockUserUuid);

    // 3. Assert: Check if the result is as expected
    expect(pnlData).toEqual({
      userUuid: mockUserUuid,
      totalRealizedPnl: mockRealizedPnl - 10, // Sum of mock PNLs
    });
    // Optionally, you can also assert that createSnapviewClient and promisifyGrpc were called correctly
    expect(createSnapviewClient).toHaveBeenCalled();
    expect(promisifyGrpc).toHaveBeenCalled(); // You can add more specific call assertions if needed
  });

  it("should return 0 totalRealizedPnl when gRPC call succeeds but returns empty snaps", async () => {
    const mockUserUuid = "test-user-no-positions";
    const mockEmptyPositionsResponse = { snaps: [] }; // Mock response with empty snaps
    (promisifyGrpc as jest.Mock).mockResolvedValue(mockEmptyPositionsResponse);

    const pnlData = await fetchUserPNL(mockUserUuid);

    expect(pnlData).toEqual({
      userUuid: mockUserUuid,
      totalRealizedPnl: 0,
    });
  });

  it("should return 0 totalRealizedPnl and handle error when gRPC call fails", async () => {
    const mockUserUuid = "test-user-error";
    const mockGrpcError = new Error("gRPC service unavailable"); // Mock error object
    (promisifyGrpc as jest.Mock).mockRejectedValue(mockGrpcError); // Make mock reject

    const pnlData = await fetchUserPNL(mockUserUuid);
    console.log(pnlData);

    expect(pnlData).toEqual({
      userUuid: mockUserUuid,
      totalRealizedPnl: 0,
    });
    // Optionally, assert that console.error was called (if you want to test logging)
    expect(console.error).toHaveBeenCalled(); // you might need to mock console.error at the top if you want to assert on it
  });
});
