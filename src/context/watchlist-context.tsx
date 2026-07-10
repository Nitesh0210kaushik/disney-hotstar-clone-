import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

interface WatchlistContextValue {
  watchlistIds: string[];
  watchlistCount: number;
  isSaved: (mediaId: string) => boolean;
  toggleWatchlist: (mediaId: string) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export function WatchlistProvider({ children }: PropsWithChildren) {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(["galaxy-quest"]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      watchlistIds,
      watchlistCount: watchlistIds.length,
      isSaved: (mediaId: string) => watchlistIds.includes(mediaId),
      toggleWatchlist: (mediaId: string) => {
        setWatchlistIds((current) =>
          current.includes(mediaId)
            ? current.filter((itemId) => itemId !== mediaId)
            : [mediaId, ...current]
        );
      },
      clearWatchlist: () => setWatchlistIds([]),
    }),
    [watchlistIds]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }

  return context;
}
