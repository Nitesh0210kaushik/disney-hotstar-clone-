import { useCallback } from "react";

import { fetchMediaSection } from "@/services/catalog";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export function useMediaSection(sectionId?: string) {
  const loader = useCallback(() => {
    if (!sectionId) {
      return Promise.reject(new Error("Missing collection id"));
    }

    return fetchMediaSection(sectionId);
  }, [sectionId]);

  return useAsyncResource(loader, Boolean(sectionId));
}
