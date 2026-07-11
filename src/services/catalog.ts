import { HomeFeed, MediaItem, PaginatedMediaResponse, UserProfile } from "@/types";
import { homeFeed, mediaLibrary, profile } from "@/data/mock";

const delay = <T,>(value: T, ms = 600) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

export function fetchHomeFeed(): Promise<HomeFeed> {
  return delay(homeFeed);
}

export function fetchMediaSection(sectionId: string): Promise<HomeFeed["sections"][number]> {
  if (sectionId === "more_to_explore") {
    return delay({
      id: "more_to_explore",
      title: "More to Explore",
      subtitle: "Discover the complete catalog",
      items: mediaLibrary,
    });
  }

  const section = homeFeed.sections.find((entry) => entry.id === sectionId);

  if (!section) {
    return Promise.reject(new Error("Collection not found"));
  }

  return delay(section);
}

export function fetchMediaSectionPage(
  sectionId: string,
  page = 1,
  pageSize = 6
): Promise<PaginatedMediaResponse> {
  const source = sectionId === "more_to_explore"
    ? mediaLibrary
    : homeFeed.sections.find((entry) => entry.id === sectionId)?.items;

  if (!source) {
    return Promise.reject(new Error("Collection not found"));
  }

  const start = (page - 1) * pageSize;
  const items = source.slice(start, start + pageSize);
  const hasMore = start + pageSize < source.length;

  return delay({
    items,
    nextPage: hasMore ? page + 1 : null,
    hasMore,
    total: source.length,
  });
}

export function fetchMediaPage(page = 1, pageSize = 4): Promise<PaginatedMediaResponse> {
  const start = (page - 1) * pageSize;
  const items = mediaLibrary.slice(start, start + pageSize);
  const hasMore = start + pageSize < mediaLibrary.length;

  return delay({
    items,
    nextPage: hasMore ? page + 1 : null,
    hasMore,
    total: mediaLibrary.length,
  });
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

export function fetchWatchlist(ids: string[] = ["galaxy-quest", "stadium-live"]): Promise<MediaItem[]> {
  const items = ids
    .map((id) => mediaLibrary.find((item) => item.id === id))
    .filter((item): item is MediaItem => Boolean(item));

  return delay(items);
}
