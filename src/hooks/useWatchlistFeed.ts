import { useCallback } from "react";

import { fetchWatchlist } from "@/services/catalog";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export function useWatchlistFeed() {
  const loader = useCallback(() => fetchWatchlist(), []);
  return useAsyncResource(loader);
}
