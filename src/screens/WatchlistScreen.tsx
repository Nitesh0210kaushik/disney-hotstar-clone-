import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MediaCard } from "@/components/MediaCard";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useWatchlistFeed } from "@/hooks/useWatchlistFeed";
import { MediaItem } from "@/types";

export function WatchlistScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: items, isLoading, error, reload } = useWatchlistFeed();
  const [refreshing, setRefreshing] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        content: {
          paddingHorizontal: 16,
          paddingTop: 6,
          paddingBottom: 96,
        },
        title: {
          color: colors.text,
        },
        subtitle: {
          color: colors.mutedText,
        },
        card: {
          backgroundColor: colors.surface,
        },
        column: {
          justifyContent: "space-between",
          marginBottom: 14,
        },
      }),
    [colors]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await reload();
    } finally {
      setRefreshing(false);
    }
  }, [reload]);

  const handlePressItem = useCallback((id: string) => {
    router.push(`/detail/${id}`);
  }, []);

  const renderItem = useCallback<ListRenderItem<MediaItem>>(
    ({ item }) => <MediaCard item={item} onPress={handlePressItem} />,
    [handlePressItem]
  );

  if (isLoading) {
    return (
      <View className="flex-1 p-4" style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <Text className="text-[28px] font-black" style={styles.title}>
          {appCopy.watchlist.title}
        </Text>
        <SurfaceCard className="mt-6" style={styles.card} contentClassName="gap-3 p-[18px]">
          <SkeletonBlock width="42%" height={20} radius={8} />
          <SkeletonBlock height={14} radius={8} />
          <SkeletonBlock width="72%" height={14} radius={8} />
        </SurfaceCard>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center p-4" style={styles.container}>
        <StateCard
          title={appCopy.watchlist.errorBody}
          body={error}
          actionTitle={appCopy.watchlist.retry}
          onAction={() => void reload()}
        />
      </View>
    );
  }

  const savedItems = items ?? [];

  return (
    <FlatList
      data={savedItems}
      keyExtractor={(item) => `watchlist-${item.id}`}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.column}
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
      showsVerticalScrollIndicator={false}
      initialNumToRender={4}
      windowSize={5}
      maxToRenderPerBatch={4}
      removeClippedSubviews
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.accent} />
      }
      ListHeaderComponent={
        <View>
          <Text className="text-[28px] font-black" style={styles.title}>
            {appCopy.watchlist.title}
          </Text>
          <Text className="mt-1 text-[13px]" style={styles.subtitle}>
            {appCopy.watchlist.subtitle}
          </Text>

          <SurfaceCard className="mb-6 mt-5" style={styles.card} contentClassName="p-[18px]">
            <Text className="text-[12px] font-bold uppercase" style={styles.subtitle}>
              {appCopy.watchlist.savedLabel}
            </Text>
            <Text className="mt-1 text-[26px] font-black" style={styles.title}>
              {savedItems.length}
            </Text>
            <Text className="mt-1" style={styles.subtitle}>
              {savedItems.length ? appCopy.watchlist.readyBody : appCopy.watchlist.browseBody}
            </Text>
          </SurfaceCard>
        </View>
      }
      ListEmptyComponent={
        <StateCard title={appCopy.watchlist.emptyTitle} body={appCopy.watchlist.emptyBody} />
      }
    />
  );
}
