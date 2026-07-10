import { useCallback, useEffect, useRef, useState } from "react";

import { fetchMediaPage } from "@/services/catalog";
import { MediaItem } from "@/types";

interface PaginatedMediaState {
  items: MediaItem[];
  page: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
}

export function usePaginatedMedia(pageSize = 4) {
  const loadingPageRef = useRef<string | null>(null);
  const [state, setState] = useState<PaginatedMediaState>({
    items: [],
    page: 1,
    isLoading: true,
    isLoadingMore: false,
    error: null,
    hasMore: true,
  });

  const loadPage = useCallback(
    async (page: number, mode: "replace" | "append") => {
      const requestKey = `${mode}-${page}`;

      if (loadingPageRef.current === requestKey) {
        return;
      }

      loadingPageRef.current = requestKey;

      setState((current) => ({
        ...current,
        error: null,
        isLoading: mode === "replace",
        isLoadingMore: mode === "append",
      }));

      try {
        const response = await fetchMediaPage(page, pageSize);
        setState((current) => ({
          items:
            mode === "replace"
              ? response.items
              : [
                  ...current.items,
                  ...response.items.filter(
                    (nextItem) => !current.items.some((item) => item.id === nextItem.id)
                  ),
                ],
          page: response.nextPage ?? page,
          isLoading: false,
          isLoadingMore: false,
          error: null,
          hasMore: response.hasMore,
        }));
      } catch (err) {
        setState((current) => ({
          ...current,
          isLoading: false,
          isLoadingMore: false,
          error: err instanceof Error ? err.message : "Unable to load more titles",
        }));
      } finally {
        if (loadingPageRef.current === requestKey) {
          loadingPageRef.current = null;
        }
      }
    },
    [pageSize]
  );

  const refresh = useCallback(() => loadPage(1, "replace"), [loadPage]);

  const loadMore = useCallback(() => {
    if (state.isLoading || state.isLoadingMore || !state.hasMore) {
      return Promise.resolve();
    }

    return loadPage(state.page, "append");
  }, [loadPage, state.hasMore, state.isLoading, state.isLoadingMore, state.page]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    ...state,
    refresh,
    loadMore,
  };
}
