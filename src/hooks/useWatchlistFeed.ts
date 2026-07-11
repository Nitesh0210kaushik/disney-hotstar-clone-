import { useCallback } from "react";

import { fetchWatchlist } from "@/services/catalog";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { useWatchlist } from "@/context/watchlist-context";

export function useWatchlistFeed() {
  const { watchlistIds, isHydrated } = useWatchlist();
  const loader = useCallback(() => fetchWatchlist(watchlistIds), [watchlistIds]);
  return useAsyncResource(loader, isHydrated);
}
