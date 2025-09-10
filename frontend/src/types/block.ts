export type Block = {
  id: number;
  blockNumber: number;
  timestamp: string;
  hash?: string | null;
  mixDigest?: string | null;
  baseFee?: number | null;
  coinbase?: string | null;
  latestTxHash?: string | null;
  txCount?: number | null;
};


