export interface User {
  id: number;
  walletAddress: string;
  username?: string;
  registeredAt: Date;
  lastActive: Date;
}

export interface Trade {
  id: number;
  userId: number;
  tokenSymbol: string;
  solAmount: string;
  usdValue: string;
  actionType: string;
  success: boolean;
  timestamp: Date;
  signature: string;
}
