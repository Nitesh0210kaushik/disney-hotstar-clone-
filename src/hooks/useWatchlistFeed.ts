import { useCallback } from "react";

import { fetchWatchlist } from "../services/catalog";
import { useAsyncResource } from "./useAsyncResource";

export function useWatchlistFeed() {
  const loader = useCallback(() => fetchWatchlist(), []);
  return useAsyncResource(loader);
}
