import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { HeroCarousel } from "@/components/HeroCarousel";
import { MediaRail } from "@/components/MediaRail";
import { SkeletonCard } from "@/components/SkeletonCard";
import { StateCard } from "@/components/StateCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useHomeFeed } from "@/hooks/useHomeFeed";
import { usePaginatedMedia } from "@/hooks/usePaginatedMedia";

export function HomeScreen() {
  const { colors } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data: feed, isLoading, error, reload } = useHomeFeed();
  const paginatedMedia = usePaginatedMedia(4);
  const { loadMore, refresh: refreshPaginatedMedia } = paginatedMedia;

  const featuredItems = useMemo(() => feed?.featured ?? [], [feed]);
  const handlePressItem = useCallback((id: string) => {
    router.push(`/detail/${id}`);
  }, []);
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const distanceFromBottom =
        contentSize.height - (contentOffset.y + layoutMeasurement.height);

      if (distanceFromBottom < 220) {
        loadMore();
      }
    },
    [loadMore]
  );
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([reload(), refreshPaginatedMedia()]);
    } catch {
      // Error states are rendered below.
    } finally {
      setRefreshing(false);
    }
  }, [refreshPaginatedMedia, reload]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          backgroundColor: colors.background,
        },
        content: {
          padding: 16,
          paddingTop: 6,
          paddingBottom: 96,
        },
        title: {
          color: colors.text,
        },
      }),
    [colors],
  );

  return (
    <ScrollView
      className="flex-1"
      style={styles.scroll}
      contentContainerStyle={styles.content}
      onScroll={handleScroll}
      scrollEventThrottle={120}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.accent}
        />
      }
    >
      <Text className="mb-[18px] text-[28px] font-black" style={styles.title}>
        {appCopy.appName}
      </Text>

      {featuredItems.length ? (
        <HeroCarousel
          items={featuredItems}
          onPrimaryPress={handlePressItem}
        />
      ) : (
        <View className="mb-6 flex-row gap-3.5">
          <SkeletonCard />
          <SkeletonCard />
        </View>
      )}

      {feed ? (
        feed.sections.map((section) => (
          <MediaRail
            key={section.id}
            railId={section.id}
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
            onPressItem={handlePressItem}
            onViewAll={() => router.push({ pathname: "/browse/[sectionId]", params: { sectionId: section.id } })}
          />
        ))
      ) : isLoading ? (
        <View className="flex-row gap-3.5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <StateCard
          title={error ?? appCopy.home.emptyTitle}
          body={appCopy.home.emptyBody}
          actionTitle={appCopy.home.retry}
          onAction={() => {
            void handleRefresh();
          }}
        />
      )}

      {paginatedMedia.items.length ? (
        <MediaRail
          railId="more_to_explore"
          title={appCopy.home.moreToExplore}
          subtitle={appCopy.home.moreToExploreSubtitle}
          items={paginatedMedia.items}
          onPressItem={handlePressItem}
          onViewAll={() =>
            router.push({
              pathname: "/browse/[sectionId]",
              params: { sectionId: "more_to_explore" },
            })
          }
        />
      ) : null}

    </ScrollView>
  );
}
