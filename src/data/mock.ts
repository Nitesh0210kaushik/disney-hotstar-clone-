import { HomeFeed, MediaItem, UserProfile } from "@/types";

const previewVideos = {
  flower:
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
  bunny:
    "https://media.w3.org/2010/05/bunny/trailer.mp4",
  bigBuckBunny:
    "https://media.w3.org/2010/05/bunny/trailer.mp4",
  elephantsDream:
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
  sintel: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  tearsOfSteel:
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
  streetAndDirt:
    "https://media.w3.org/2010/05/bunny/trailer.mp4",
  gtiReview:
    "https://media.w3.org/2010/05/bunny/trailer.mp4",
  biggerFun: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  biggerEscapes:
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
} as const;

export const mediaLibrary: MediaItem[] = [
  {
    id: "galaxy-quest",
    title: "Tears of Steel",
    subtitle: "Sci-Fi Feature",
    description:
      "A cinematic sci-fi story with robots, city-scale tension, and future-tech drama.",
    type: "movie",
    year: 2026,
    duration: "12m Preview",
    rating: "U/A 13+",
    genres: ["Sci-Fi", "Action", "Drama"],
    tags: ["Featured", "Top Pick", "4K"],
    heroImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.tearsOfSteel,
    progress: 0.62,
    primaryActionLabel: "Continue",
  },
  {
    id: "stadium-live",
    title: "Big Buck Bunny",
    subtitle: "Animated Short",
    description:
      "A bright animated forest comedy with playful characters and family-friendly energy.",
    type: "special",
    year: 2025,
    duration: "15s Preview",
    rating: "U",
    genres: ["Animation", "Comedy", "Family"],
    tags: ["Family", "Trending"],
    heroImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.bunny,
    primaryActionLabel: "Watch",
  },
  {
    id: "city-bloom",
    title: "City Bloom",
    subtitle: "Nature Mood Film",
    description:
      "A calming visual short built around flowers, color, and soft cinematic movement.",
    type: "special",
    year: 2025,
    duration: "30s Preview",
    rating: "U",
    genres: ["Nature", "Relaxing"],
    tags: ["Short", "Visual"],
    heroImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.flower,
    primaryActionLabel: "Play Now",
  },
  {
    id: "pitch-perfect",
    title: "Elephants Dream",
    subtitle: "Experimental Animation",
    description:
      "A surreal animated journey through a mechanical world with dreamlike production design.",
    type: "special",
    year: 2024,
    duration: "11m",
    rating: "U/A 13+",
    genres: ["Animation", "Fantasy", "Experimental"],
    tags: ["Animation", "Featured"],
    heroImage:
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.elephantsDream,
    primaryActionLabel: "View Details",
  },
];

const expandedMedia: MediaItem[] = [
  {
    id: "ocean-code",
    title: "Sintel",
    subtitle: "Fantasy Adventure",
    description:
      "A fantasy adventure preview with sweeping landscapes, danger, and emotional stakes.",
    type: "movie",
    year: 2026,
    duration: "15m",
    rating: "UA 13+",
    genres: ["Fantasy", "Adventure", "Drama"],
    tags: ["New", "Adventure", "4K"],
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.sintel,
    primaryActionLabel: "Play Now",
  },
  {
    id: "neon-kickoff",
    title: "Bigger Escapes",
    subtitle: "Action Preview",
    description:
      "A fast-cut action preview designed for quick playback and trailer-style energy.",
    type: "special",
    year: 2025,
    duration: "15s Preview",
    rating: "U",
    genres: ["Action", "Trailer"],
    tags: ["Trending", "Quick Watch"],
    heroImage:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.biggerEscapes,
    primaryActionLabel: "Watch",
  },
  {
    id: "midnight-rails",
    title: "Street & Dirt",
    subtitle: "Outdoor Drive",
    description:
      "An outdoor driving short with street-to-dirt movement and travel-show pacing.",
    type: "special",
    year: 2024,
    duration: "2m Preview",
    rating: "U",
    genres: ["Travel", "Auto", "Outdoor"],
    tags: ["Travel", "Adventure"],
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.streetAndDirt,
    progress: 0.28,
    primaryActionLabel: "Continue",
  },
  {
    id: "summit-signal",
    title: "GTI Review",
    subtitle: "Auto Special",
    description:
      "A compact auto review preview with clean product shots and road-test energy.",
    type: "special",
    year: 2026,
    duration: "3m Preview",
    rating: "U",
    genres: ["Auto", "Review"],
    tags: ["Featured", "Review"],
    heroImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.gtiReview,
    primaryActionLabel: "Play Now",
  },
  {
    id: "food-circuit",
    title: "Bigger Fun",
    subtitle: "Feel-Good Short",
    description:
      "A light, playful short preview for quick discovery rows and upbeat browsing.",
    type: "special",
    year: 2025,
    duration: "15s Preview",
    rating: "U",
    genres: ["Lifestyle", "Feel Good"],
    tags: ["Family", "Feel Good"],
    heroImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.biggerFun,
    primaryActionLabel: "Start",
  },
  {
    id: "orbit-eleven",
    title: "Forest Bunny",
    subtitle: "Family Animation",
    description:
      "A short animated forest clip with colorful character moments and kid-friendly tone.",
    type: "special",
    year: 2024,
    duration: "10s Preview",
    rating: "U",
    genres: ["Animation", "Family"],
    tags: ["4K", "Family"],
    heroImage:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    posterImage:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
    backdropImage:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80",
    videoUrl: previewVideos.bigBuckBunny,
    primaryActionLabel: "Watch",
  },
];

const extraTitles = [
  "Neon Horizon",
  "Wild Pixel",
  "Ocean Signal",
  "Moonlight Run",
  "The Last Campfire",
  "Solar Drift",
  "Hidden Valley",
  "Blue Current",
  "Orbit Kids",
  "After the Storm",
  "City Rhythm",
  "The Open Road",
  "Dream Factory",
  "Wildlife Diaries",
  "Midnight Code",
  "Small Wonders",
  "Beyond the Map",
  "Weekend Stories",
  "Parallel Skies",
  "Golden Hour",
] as const;

const extraSubtitles = [
  "Sci-Fi Adventure",
  "Family Animation",
  "Ocean Mystery",
  "Action Preview",
  "Fantasy Short",
] as const;

const extraImages = [
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
] as const;

const extraVideos = [
  previewVideos.bigBuckBunny,
  previewVideos.sintel,
  previewVideos.biggerEscapes,
  previewVideos.tearsOfSteel,
  previewVideos.flower,
] as const;

const extraMedia: MediaItem[] = extraTitles.map((title, index) => {
  const image = extraImages[index % extraImages.length];
  const isFamily = index % 3 === 1;

  return {
    id: `discovery-${index + 1}`,
    title,
    subtitle: extraSubtitles[index % extraSubtitles.length],
    description: `A fresh ${isFamily ? "family-friendly" : "cinematic"} preview with memorable characters, visual energy, and a story made for quick discovery.`,
    type: index % 4 === 0 ? "movie" : "special",
    year: 2024 + (index % 3),
    duration: `${10 + (index % 6)}m Preview`,
    rating: index % 4 === 0 ? "U/A 13+" : "U",
    genres: isFamily ? ["Animation", "Family"] : ["Adventure", "Drama"],
    tags: [index % 2 === 0 ? "Trending" : "New", index % 3 === 0 ? "Featured" : "Quick Watch"],
    heroImage: image,
    posterImage: image,
    backdropImage: image,
    videoUrl: extraVideos[index % extraVideos.length],
    progress: index % 5 === 0 ? 0.2 + (index % 4) * 0.12 : undefined,
    primaryActionLabel: index % 3 === 0 ? "Watch" : "Play Now",
  };
});

mediaLibrary.push(...expandedMedia, ...extraMedia);

export const homeFeed: HomeFeed = {
    featured: mediaLibrary.slice(0, 6),
  sections: [
    {
      id: "continue_watching",
      title: "Continue Watching",
      subtitle: "Pick up from where you left off",
      items: mediaLibrary.filter((item) => item.progress),
    },
    {
      id: "trending_now",
      title: "Trending Now",
      subtitle: "What everyone is watching today",
      items: mediaLibrary.slice(1, 21),
    },
    {
      id: "featured",
      title: "Featured Picks",
      subtitle: "Cinematic stories with strong visual identity",
      items: mediaLibrary.filter((item) => item.tags.includes("Featured")),
    },
    {
      id: "animation_family",
      title: "Animation & Family",
      subtitle: "Shorts and animated stories that match their previews",
      items: mediaLibrary.filter(
        (item) => item.genres.includes("Animation") || item.genres.includes("Family")
      ),
    },
    {
      id: "fresh_stories",
      title: "Fresh Stories",
      subtitle: "New worlds, cities, and characters to explore",
      items: mediaLibrary.slice(4, 26),
    },
  ],
};

export const profile: UserProfile = {
  name: "Nitesh Kaushik",
  email: "nitesh@hotstar-clone.app",
  plan: "Premium",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  watchlistCount: 8,
  notificationsEnabled: true,
};
