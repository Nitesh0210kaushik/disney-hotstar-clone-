export type MediaType = "movie" | "series" | "live" | "special";
export type ThemeMode = "light" | "dark";

export interface MediaItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: MediaType;
  year: number;
  duration: string;
  rating: string;
  genres: string[];
  tags: string[];
  heroImage: string;
  posterImage: string;
  backdropImage: string;
  progress?: number;
  live?: boolean;
  primaryActionLabel: string;
}

export interface MediaSection {
  id: string;
  title: string;
  subtitle: string;
  items: MediaItem[];
}

export interface HomeFeed {
  featured: MediaItem[];
  sections: MediaSection[];
}

export interface UserProfile {
  name: string;
  email: string;
  plan: string;
  avatar: string;
  watchlistCount: number;
  notificationsEnabled: boolean;
}
