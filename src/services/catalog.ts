import { HomeFeed, MediaItem, UserProfile } from "@/types";
import { homeFeed, mediaLibrary, profile } from "@/data/mock";

const delay = <T,>(value: T, ms = 600) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

export function fetchHomeFeed(): Promise<HomeFeed> {
  return delay(homeFeed);
}

export function fetchProfile(): Promise<UserProfile> {
  return delay(profile);
}

export function fetchMediaById(id: string): Promise<MediaItem> {
  const item = mediaLibrary.find((media) => media.id === id);

  if (!item) {
    return Promise.reject(new Error("Media not found"));
  }

  return delay(item);
}

export function fetchWatchlist(): Promise<MediaItem[]> {
  return delay(mediaLibrary.slice(0, 2));
}
