import { HomeFeed, MediaItem, UserProfile } from "../types";

export const mediaLibrary: MediaItem[] = [
  {
    id: "galaxy-quest",
    title: "Galaxy Quest",
    subtitle: "New Season",
    description:
      "An interstellar adventure with a cinematic look and mission-driven storytelling.",
    type: "series",
    year: 2026,
    duration: "8 Episodes",
    rating: "U/A 13+",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    tags: ["Featured", "Top Pick", "4K"],
    heroImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    progress: 0.62,
    primaryActionLabel: "Continue",
  },
  {
    id: "stadium-live",
    title: "Stadium Live",
    subtitle: "Live Now",
    description:
      "Real-time sports coverage with score overlays, match stats, and live status treatment.",
    type: "live",
    year: 2026,
    duration: "Live",
    rating: "Live",
    genres: ["Sports", "Live", "Highlights"],
    tags: ["Live", "Trending"],
    heroImage:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=80",
    live: true,
    primaryActionLabel: "Watch Live",
  },
  {
    id: "city-bloom",
    title: "City Bloom",
    subtitle: "Drama Film",
    description:
      "A character-driven film about ambition, family, and chasing the spotlight.",
    type: "movie",
    year: 2025,
    duration: "2h 14m",
    rating: "UA 16+",
    genres: ["Drama", "Romance"],
    tags: ["Movie", "Critically Acclaimed"],
    heroImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1489599835357-8e8e8e2a5b86?auto=format&fit=crop&w=1400&q=80",
    primaryActionLabel: "Play Now",
  },
  {
    id: "pitch-perfect",
    title: "Pitch Perfect",
    subtitle: "Sports Docuseries",
    description:
      "A sports documentary with match timelines, player cards, and momentum analysis.",
    type: "special",
    year: 2024,
    duration: "45m",
    rating: "U",
    genres: ["Documentary", "Sports"],
    tags: ["Analysis", "Featured"],
    heroImage:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&w=1400&q=80",
    primaryActionLabel: "View Details",
  },
];

export const homeFeed: HomeFeed = {
  featured: mediaLibrary.slice(0, 3),
  sections: [
    {
      id: "continue_watching",
      title: "Continue Watching",
      subtitle: "Pick up from where you left off",
      items: mediaLibrary.slice(0, 2),
    },
    {
      id: "trending_now",
      title: "Trending Now",
      subtitle: "What everyone is watching today",
      items: mediaLibrary.slice(1, 4),
    },
    {
      id: "featured",
      title: "Featured Picks",
      subtitle: "Cinematic stories with strong visual identity",
      items: mediaLibrary.slice(0, 4),
    },
  ],
};

export const profile: UserProfile = {
  name: "Disney+ Hotstar Clone",
  email: "creator@hotstar-clone.app",
  plan: "Premium",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  watchlistCount: 8,
  notificationsEnabled: true,
};
