import { useCallback } from "react";

import { fetchHomeFeed } from "@/services/catalog";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export function useHomeFeed() {
  const loader = useCallback(() => fetchHomeFeed(), []);
  return useAsyncResource(loader);
}
