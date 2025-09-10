"use client";

type Props = Readonly<{
  isPaused: boolean;
  isManualLoading: boolean;
  onTogglePause: () => void;
  onRefresh: () => void;
}>;

export function BlocksHeader({ isPaused, isManualLoading, onTogglePause, onRefresh }: Props) {
  const isAutoOn = !isPaused;
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center justify-end w-full gap-3">
        <div className="flex items-center gap-2 text-sm select-none">
          <span className="text-gray-600">Auto-refresh</span>
          <button
            type="button"
            onClick={onTogglePause}
            aria-pressed={isAutoOn}
            aria-label="Toggle auto refresh"
            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
              isAutoOn ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isAutoOn ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <button
          onClick={onRefresh}
          disabled={isManualLoading}
          className="text-sm px-3 transition-colors cursor-pointer py-1.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isManualLoading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
    </div>
  );
}


