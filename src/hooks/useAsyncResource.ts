import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useAsyncResource<T>(loader: () => Promise<T>, autoLoad = true) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: autoLoad,
    error: null,
  });

  const reload = useCallback(async () => {
    setState((current) => ({
      ...current,
      isLoading: true,
      error: null,
    }));

    try {
      const data = await loader();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setState((current) => ({
        ...current,
        isLoading: false,
        error: message,
      }));
      throw err;
    }
  }, [loader]);

  useEffect(() => {
    if (autoLoad) {
      void reload();
    }
  }, [autoLoad, reload]);

  return {
    ...state,
    reload,
  };
}
