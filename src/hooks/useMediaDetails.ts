import { useCallback } from "react";

import { fetchMediaById } from "../services/catalog";
import { useAsyncResource } from "./useAsyncResource";

export function useMediaDetails(mediaId?: string) {
  const loader = useCallback(() => {
    if (!mediaId) {
      return Promise.reject(new Error("Missing media id"));
    }

    return fetchMediaById(mediaId);
  }, [mediaId]);

  return useAsyncResource(loader, Boolean(mediaId));
}
