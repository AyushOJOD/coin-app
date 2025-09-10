"use client";

import Image from "next/image";
import type { Block } from "@/types/block";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  blocks: Block[];
  isManualLoading: boolean;
  error: string | null;
};

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

function SkeletonItem() {
  return (
    <li className="py-3 p-2 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-3 w-28 bg-gray-200 rounded" />
    </li>
  );
}

function truncateMiddle(value: string, max = 18) {
  if (value.length <= max) return value;
  const half = Math.floor((max - 3) / 2);
  return `${value.slice(0, half)}...${value.slice(-half)}`;
}

export function BlocksList({ blocks, isManualLoading, error }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = useCallback((id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (isManualLoading) {
    return (
      <ul className="flex flex-col gap-2">
        {SKELETON_KEYS.map((k) => (
          <SkeletonItem key={k} />
        ))}
      </ul>
    );
  }

  if (!blocks.length) {
    return <div className="text-sm text-gray-500">No saved blocks yet.</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {blocks.map((b) => {
        const isOpen = !!expanded[b.id];
        return (
          <li key={b.id} className={`p-2 hover:bg-gray-50 transition-colors ${isOpen ? "bg-gray-50" : "bg-white"}`}>
            <div className="py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://assets.coingecko.com/coins/images/279/thumb/ethereum.png"
                    alt="ETH"
                    width={16}
                    height={16}
                    className="opacity-90"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">#{b.blockNumber}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {b.hash ? truncateMiddle(b.hash, 22) : "No hash"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-500">{new Date(b.timestamp).toLocaleString()}</div>
                  {typeof b.txCount === "number" && (
                    <div className="text-xs text-gray-600">Txs: {b.txCount}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleExpand(b.id)}
                  className="text-xs px-2 cursor-pointer py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Collapse details" : "Expand details"}
                >
                  {isOpen ? "Hide" : "More"}
                </button>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                  className="mt-2"
               >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                    <div>
                      <div className="text-gray-500">Hash</div>
                      <div className="font-mono break-all">{b.hash ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Latest Tx Hash</div>
                      <div className="font-mono break-all">{b.latestTxHash ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Mix Digest</div>
                      <div className="font-mono break-all">{b.mixDigest ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Base Fee</div>
                      <div className="font-mono">{typeof b.baseFee === "number" ? b.baseFee : "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Coinbase</div>
                      <div className="font-mono break-all">{b.coinbase ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tx Count</div>
                      <div className="font-mono">{typeof b.txCount === "number" ? b.txCount : "—"}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}


