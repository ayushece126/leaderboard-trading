import { credentials } from "@grpc/grpc-js";
import { LeaderboardServiceClient } from "../generated/leaderboard";

const client = new LeaderboardServiceClient(
  process.env.GRPC_SERVER_URL!,
  credentials.createInsecure()
);

export const getLeaderboard = async (timeframe: string) => {
  return new Promise((resolve, reject) => {
    client.getLeaderboard({ timeframe }, (err, response) => {
      if (err) return reject(err);
      resolve(response?.entries || []);
    });
  });
};
