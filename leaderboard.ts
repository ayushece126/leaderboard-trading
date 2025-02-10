export interface LeaderboardEntry {
  rank: number;
  username: string | null;
  walletId: string;
  stats: string;
  solPnl: number;
  usdPnl: number;
}

export interface Trade {
  tokenSymbol: string;
  solAmount: number;
  usdValue: number;
  actionType: "Buy" | "Sell";
  timestamp: string;
}
