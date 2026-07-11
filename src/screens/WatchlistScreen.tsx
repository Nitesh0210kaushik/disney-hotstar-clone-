import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { SurfaceCard } from "@/components/SurfaceCard";
import { TagPill } from "@/components/TagPill";
import { useAppTheme } from "@/context/theme-context";
import { useWatchlist } from "@/context/watchlist-context";
import { appCopy } from "@/data/copy";
import { useWatchlistFeed } from "@/hooks/useWatchlistFeed";
import { MediaItem } from "@/types";

export function WatchlistScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: items, isLoading, error, reload } = useWatchlistFeed();
  const { toggleWatchlist } = useWatchlist();
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
        rowCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
        },
        rowPoster: {
          width: 76,
          height: 104,
          borderRadius: 12,
          backgroundColor: colors.surfaceElevated,
        },
        rowTitle: {
          color: colors.text,
        },
        rowSubtitle: {
          color: colors.mutedText,
        },
        swipeContainer: {
          overflow: "visible",
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
    ({ item }) => {
      const renderRightActions = () => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete item"
          onPress={() => toggleWatchlist(item.id)}
          className="w-[72px] bg-[#EF4444] rounded-[20px] mb-3.5 justify-center items-center ml-2"
        >
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FFF" />
        </Pressable>
      );

      return (
        <Swipeable renderRightActions={renderRightActions} containerStyle={styles.swipeContainer}>
          <Pressable
            onPress={() => handlePressItem(item.id)}
            className="flex-row items-center p-3 rounded-[20px] mb-3.5"
            style={styles.rowCard}
          >
            {/* Poster Image */}
            <Image
              source={{ uri: item.posterImage }}
              style={styles.rowPoster}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            {/* Info */}
            <View className="flex-1 ml-4 justify-between h-[100px] py-1">
              <View>
                <Text
                  numberOfLines={1}
                  className="text-[16px] font-black"
                  style={styles.rowTitle}
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-xs mt-1 font-semibold"
                  style={styles.rowSubtitle}
                >
                  {item.year} • {item.rating} • {item.duration}
                </Text>
              </View>
              {/* Genres Row */}
              <View className="flex-row flex-wrap gap-1.5 mt-2">
                {item.genres.slice(0, 2).map((genre) => (
                  <TagPill key={genre} label={genre} />
                ))}
              </View>
            </View>
            <View className="justify-center pl-2">
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.mutedText} />
            </View>
          </Pressable>
        </Swipeable>
      );
    },
    [colors.mutedText, handlePressItem, styles, toggleWatchlist]
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
      numColumns={1}
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 96 }]}
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
