# Disney+ Hotstar Inspired Expo App

A high-fidelity React Native UI clone inspired by Disney+ Hotstar, built for the Expo advanced UI assignment. The app focuses on immersive media discovery, reusable architecture, responsive spacing, loading/error states, and optimized horizontal content rails.

## Tech Stack

- Framework: Expo SDK 57 managed workflow
- Language: TypeScript with strict mode
- Styling: NativeWind for layout-first styling, with `StyleSheet.create` for dynamic theme values
- Navigation: Expo Router on top of React Navigation native stack and bottom tabs
- Component library: React Native Paper
- Media: `expo-image` for optimized images and `expo-video` for native playback
- State: React context for theme and watchlist state

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the Expo development server:

```bash
npx expo start -c
```

3. Open the app in Expo Go, Android emulator, iOS simulator, or web from the Expo CLI prompt.

## App Flow

- Home: content-rich feed with an immersive hero carousel, categorized rails, pull-to-refresh, skeleton loaders, and empty/error states.
- Detail: rich media detail view with hero artwork, stable back navigation, metadata, genres, tags, story content, watchlist action, and video entry.
- Watchlist: saved media feed driven by the watchlist context.
- Profile: settings screen using React Native Paper cards, buttons, and switches for clear component-library usage.
- Video: native `expo-video` player on Android/iOS with a web-safe video fallback.

## Architecture

The project separates UI, data, state, and navigation concerns:

- `src/app`: Expo Router routes for stack, tabs, detail, and video screens.
- `src/screens`: screen-level composition and navigation behavior.
- `src/components`: reusable UI pieces such as `AppButton`, `HeroCarousel`, `MediaRail`, `MediaCard`, `SurfaceCard`, `StateCard`, and skeleton blocks.
- `src/services`: mock API service layer that resolves data asynchronously with artificial delay.
- `src/hooks`: async data hooks such as `useHomeFeed`, `useMediaDetails`, `useProfile`, and `useWatchlistFeed`.
- `src/context`: app theme persistence and watchlist state.
- `src/data`: mock catalog and centralized UI copy.
- `src/types`: shared TypeScript interfaces for media, profile, and feed data.

UI text is centralized in `src/data/copy.ts`, while catalog data lives in `src/data/mock.ts`. Screens consume data through hooks and services instead of hardcoding UI payloads directly.

## Styling Strategy

NativeWind is the primary styling layer for spacing, flexbox, typography scale, rounded corners, and responsive layout. `StyleSheet.create` is used only where runtime theme values are required, such as `colors.background`, `colors.surface`, and `colors.text`.

React Native Paper is used in the Profile screen for visible component-library coverage while the custom component system keeps the rest of the UI consistent with the streaming-app visual language.

## Performance Choices

- Horizontal rails use `FlatList` with `keyExtractor`, `initialNumToRender`, `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews`, and `getItemLayout`.
- Reusable list components are memoized with `React.memo`.
- Item press handlers and render functions use `useCallback` where they are passed into lists.
- Derived feed values and theme-based styles use `useMemo`.
- Images use `expo-image` with caching, placeholders, content fitting, and recycling keys.
- Detail navigation keeps the hero and back action stable while the content scrolls, avoiding layout shifts during transitions.

## UX Completeness

- Skeleton loaders are shown for Home, Detail, Profile, Watchlist, and Video states.
- Error states include retry actions.
- Empty states are present for feed/watchlist scenarios.
- Pull-to-refresh is available on Home and Watchlist.
- Dark mode persists using AsyncStorage.
- Video playback is supported with platform-specific implementations.

## Bonus Objectives

- Micro-interactions: `react-native-reanimated` powers reusable press-scale feedback through `AnimatedPressable`.
- Advanced UX controls: Home supports pull-to-refresh and infinite pagination through a paged mock API; Watchlist supports native pull-to-refresh.
- Theme engine: light/dark mode is centralized in context, synced with React Native Paper, and persisted with AsyncStorage.
- Testing infrastructure: Jest Expo and React Native Testing Library are configured with a passing reusable component test.

## Validation

Run TypeScript checks:

```bash
npx tsc --noEmit
```

Run Expo diagnostics:

```bash
npx expo-doctor
```

## Submission Media

The screenshots and voice-over screen recording should demonstrate this project, either from the installed APK or from the running Expo Go app. The recording should cover:

- Home hero carousel, content rails, and View All navigation
- Detail screen metadata, watchlist action, and video playback
- Watchlist persistence after saving a title
- Profile settings with light/dark theme switching
- Loading, refresh, pagination, error, and empty states where applicable

The voice-over should briefly explain the user flow, reusable component architecture, mock service layer, NativeWind and React Native Paper usage, persistence, and list performance choices.

For the final submission, also provide the repository link and either an Expo Go share link or a generated APK link.

## Assignment Notes

The app icon uses a locally bundled Disney+ Hotstar logo asset downloaded from Seeklogo for the demo build. The asset is bundled locally so the app does not depend on an internet connection at runtime.

The implementation is not a 1:1 clone. It uses Disney+ Hotstar as a benchmark for hierarchy and content discovery while adding clearer data separation, reusable UI primitives, polished edge states, and performance-conscious list rendering.
