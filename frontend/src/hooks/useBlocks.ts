"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Block } from "@/types/block";

export function useBlocks(pollIntervalMs: number = 3000) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isManualLoading, setIsManualLoading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadBlocksSilently = useCallback(async () => {
    try {
      const res = await fetch(`${backendUrl}/api/blocks`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load blocks: ${res.status}`);
      const data = await res.json();
      setBlocks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load blocks");
      }
    }
  }, [backendUrl]);

  const triggerBackendFetch = useCallback(async () => {
    const res = await fetch(`${backendUrl}/api/fetch-blocks`, { method: "POST" });
    if (!res.ok) throw new Error(`Failed to fetch & save: ${res.status}`);
    await res.json();
  }, [backendUrl]);

  // Initial load (silent)
  useEffect(() => {
    loadBlocksSilently();
  }, [loadBlocksSilently]);

  // Manual refresh that shows loading/skeleton
  const refreshNow = useCallback(async () => {
    try {
      setIsManualLoading(true);
      setError(null);
      await triggerBackendFetch();
      await loadBlocksSilently();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to refresh");
      }
    } finally {
      setIsManualLoading(false);
    }
  }, [triggerBackendFetch, loadBlocksSilently]);

  // Long polling (silent), respects pause
  useEffect(() => {
    if (isPaused) {
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
      return;
    }

    pollingTimerRef.current ??= setInterval(async () => {
      try {
        await triggerBackendFetch();
        await loadBlocksSilently();
      } catch {
        // keep silent during background polling
      }
    }, Math.max(250, pollIntervalMs));

    return () => {
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
    };
  }, [isPaused, pollIntervalMs, triggerBackendFetch, loadBlocksSilently]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const state = useMemo(
    () => ({ blocks, error, isManualLoading, isPaused }),
    [blocks, error, isManualLoading, isPaused]
  );

  return { ...state, refreshNow, pause, resume, togglePause };
}


