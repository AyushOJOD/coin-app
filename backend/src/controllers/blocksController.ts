import { Request, Response } from "express";
import { db } from "../models/db.js";
import { blocks } from "../models/schema.js";
import { fetchBlockData, fetchTransfersData } from "../services/bitquery.js";
import { desc } from "drizzle-orm";

export const getBlocks = async (req: Request, res: Response) => {
  try {
    const blockList = await db
      .select()
      .from(blocks)
      .orderBy(desc(blocks.timestamp));
    res.json(blockList);
  } catch (error: any) {
    console.error("Error fetching blocks:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Failed to fetch blocks", details: error.message });
  }
};

export const fetchBlocks = async (req: Request, res: Response) => {
  try {
    console.log("Fetching data from Bitquery...");
    const data = await fetchBlockData();
    console.log("Fetched data:", data);
    for (const block of data) {
      await db
        .insert(blocks)
        .values({
          blockNumber: block.blockNumber,
          timestamp: block.timestamp,
          hash: block.hash,
          mixDigest: block.mixDigest,
          baseFee: block.baseFee ?? null,
          coinbase: block.coinbase,
          latestTxHash: block.latestTxHash,
          txCount: block.txCount ?? null,
        })
        .onConflictDoUpdate({
          target: blocks.blockNumber,
          set: {
            timestamp: block.timestamp,
            hash: block.hash,
            mixDigest: block.mixDigest,
            baseFee: block.baseFee ?? null,
            coinbase: block.coinbase,
            latestTxHash: block.latestTxHash,
            txCount: block.txCount ?? null,
          },
        });
    }
    res.json({ message: "Blocks fetched and stored" });
  } catch (error: any) {
    console.error("Error fetching from Bitquery:", error.message, error.stack);
    res.status(500).json({
      error: "Failed to fetch from Bitquery",
      details: error.message,
      statusCode: error.response?.status,
      headers: error.response?.headers,
    });
  }
};

export const getTransfers = async (req: Request, res: Response) => {
  try {
    const transfers = await fetchTransfersData();
    res.json(transfers);
  } catch (error: any) {
    console.error("Error fetching transfers:", error.message, error.stack);
    res.status(500).json({ error: "Failed to fetch transfers", details: error.message });
  }
};
