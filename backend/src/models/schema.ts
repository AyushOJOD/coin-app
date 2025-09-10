import { pgTable, serial, bigint, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  blockNumber: bigint("block_number", { mode: "number" }).notNull().unique(),
  timestamp: timestamp("timestamp").notNull(),
  hash: varchar("hash", { length: 128 }),
  mixDigest: varchar("mix_digest", { length: 128 }),
  baseFee: bigint("base_fee", { mode: "number" }),
  coinbase: varchar("coinbase", { length: 128 }),
  latestTxHash: varchar("latest_tx_hash", { length: 128 }),
  txCount: integer("tx_count"),
});
