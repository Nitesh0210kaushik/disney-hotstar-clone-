import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

const WATCHLIST_STORAGE_KEY = "watchlist-media-ids";

interface WatchlistContextValue {
  watchlistIds: string[];
  watchlistCount: number;
  isSaved: (mediaId: string) => boolean;
  toggleWatchlist: (mediaId: string) => void;
  clearWatchlist: () => void;
  isHydrated: boolean;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export function WatchlistProvider({ children }: PropsWithChildren) {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(["galaxy-quest"]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    void AsyncStorage.getItem(WATCHLIST_STORAGE_KEY)
      .then((storedValue) => {
        if (!active) return;

        if (storedValue) {
          const parsed = JSON.parse(storedValue);
          if (Array.isArray(parsed)) {
            setWatchlistIds(parsed.filter((id): id is string => typeof id === "string"));
          }
        }
        setIsHydrated(true);
      })
      .catch(() => {
        if (active) setIsHydrated(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isHydrated) {
      void AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlistIds));
    }
  }, [isHydrated, watchlistIds]);

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
      isHydrated,
    }),
    [isHydrated, watchlistIds]
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
