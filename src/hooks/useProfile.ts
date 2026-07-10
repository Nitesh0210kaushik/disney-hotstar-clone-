import { useCallback } from "react";

import { fetchProfile } from "../services/catalog";
import { useAsyncResource } from "./useAsyncResource";

export function useProfile() {
  const loader = useCallback(() => fetchProfile(), []);
  return useAsyncResource(loader);
}
