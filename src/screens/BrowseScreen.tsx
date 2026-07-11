import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MediaCard } from "@/components/MediaCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { StateCard } from "@/components/StateCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useMediaSection } from "@/hooks/useMediaSection";
import { usePaginatedMedia } from "@/hooks/usePaginatedMedia";
import { fetchMediaSectionPage } from "@/services/catalog";
import { MediaItem } from "@/types";

export function BrowseScreen() {
  const { sectionId } = useLocalSearchParams<{ sectionId: string }>();
  const { colors, isDark } = useAppTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data: section, isLoading: isSectionLoading, error: sectionError, reload } = useMediaSection(sectionId);
  const fetchSectionPage = useCallback(
    (page: number, pageSize: number) => {
      if (!sectionId) {
        return Promise.reject(new Error("Missing collection id"));
      }

      return fetchMediaSectionPage(sectionId, page, pageSize);
    },
    [sectionId]
  );
  const paginated = usePaginatedMedia(9, fetchSectionPage);
  const isLoading = isSectionLoading || paginated.isLoading;
  const error = sectionError ?? paginated.error;
  const gridWidth = Math.max(92, Math.floor((width - 32 - 16) / 3));
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: colors.background,
        },
        title: {
          color: colors.text,
        },
        subtitle: {
          color: colors.mutedText,
        },
        backButton: {
          backgroundColor: colors.surface,
        },
        column: {
          justifyContent: "flex-start",
          columnGap: 8,
          marginBottom: 16,
        },
        grid: {
          paddingHorizontal: 16,
          paddingTop: 20,
        },
        loadingGrid: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          paddingTop: 20,
        },
        bottomBar: {
          minHeight: 72,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.16,
          shadowRadius: 10,
          zIndex: 20,
        },
        activeTab: {
          color: colors.accent,
        },
      }),
    [colors]
  );

  const handlePressItem = useCallback((id: string) => {
    router.push(`/detail/${id}`);
  }, []);

  const handleBackPress = useCallback(() => {
    // A View All screen always belongs to the Home feed, including direct web opens.
    router.replace("/(tabs)");
  }, []);

  const renderItem = useCallback<ListRenderItem<MediaItem>>(
    ({ item }) => (
      <MediaCard
        item={item}
        onPress={handlePressItem}
        compact
        gridWidth={gridWidth}
      />
    ),
    [gridWidth, handlePressItem]
  );

  if (isLoading) {
    return (
      <View className="flex-1" style={styles.screen}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={colors.background}
          translucent={false}
          hidden={false}
        />
        <View
          className="flex-row items-center gap-3 px-4"
          style={{ paddingTop: Math.max(insets.top, 0) + 12 }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={appCopy.browse.back}
            onPress={handleBackPress}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
          </Pressable>
          <View className="flex-1">
            <Text className="text-[24px] font-black" style={styles.title}>
              {appCopy.browse.loading}
            </Text>
            <Text className="mt-1 text-[13px]" style={styles.subtitle}>
              {appCopy.browse.loading}
            </Text>
          </View>
        </View>

        <View className="flex-1 px-4" style={styles.loadingGrid}>
          {Array.from({ length: 9 }, (_, index) => (
            <SkeletonCard key={`browse-skeleton-${index}`} width={gridWidth} height={gridWidth * 1.52} />
          ))}
        </View>

        <View
          className="flex-row items-center justify-around px-5 pt-3"
          style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
        >
          <View className="items-center gap-1">
            <MaterialCommunityIcons name="home-variant" size={27} color={colors.accent} />
            <Text className="text-[11px] font-bold" style={styles.activeTab}>Home</Text>
          </View>
          <View className="items-center gap-1">
            <MaterialCommunityIcons name="bookmark-multiple" size={27} color={colors.mutedText} />
            <Text className="text-[11px] font-bold" style={styles.subtitle}>Watchlist</Text>
          </View>
          <View className="items-center gap-1">
            <MaterialCommunityIcons name="account-circle" size={27} color={colors.mutedText} />
            <Text className="text-[11px] font-bold" style={styles.subtitle}>Profile</Text>
          </View>
        </View>
      </View>
    );
  }

  if (error || !section) {
    return (
      <View className="flex-1 justify-center p-4" style={styles.screen}>
        <StateCard
          title={appCopy.browse.errorTitle}
          body={error ?? appCopy.browse.errorBody}
          actionTitle={appCopy.browse.retry}
          onAction={() => {
            void reload();
            void paginated.refresh();
          }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1" style={styles.screen}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
        hidden={false}
      />
      <View
        className="flex-row items-center gap-3 px-4"
        style={{ paddingTop: Math.max(insets.top, 0) + 12 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={appCopy.browse.back}
          onPress={handleBackPress}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-[24px] font-black" style={styles.title}>
            {section.title}
          </Text>
          <Text className="mt-1 text-[13px]" style={styles.subtitle}>
            {section.subtitle}
          </Text>
        </View>
      </View>

      {paginated.items.length ? (
        <FlatList
          data={paginated.items}
          keyExtractor={(item) => `browse-${section.id}-${item.id}`}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.column}
          contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 116 }]}
          showsVerticalScrollIndicator={false}
          initialNumToRender={9}
          windowSize={5}
          maxToRenderPerBatch={6}
          removeClippedSubviews
          onEndReached={paginated.loadMore}
          onEndReachedThreshold={0.45}
          ListFooterComponent={
            paginated.isLoadingMore ? (
              <View className="items-center py-4">
                <Text className="text-[12px] font-semibold" style={styles.subtitle}>
                  {appCopy.browse.loading}
                </Text>
              </View>
            ) : null
          }
        />
      ) : (
        <StateCard title={appCopy.browse.emptyTitle} body={appCopy.browse.emptyBody} />
      )}

      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around px-5 pt-3"
        style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Home"
          onPress={() => router.replace("/(tabs)")}
          className="items-center gap-1"
        >
          <MaterialCommunityIcons name="home-variant" size={27} color={colors.accent} />
          <Text className="text-[11px] font-bold" style={styles.activeTab}>Home</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Watchlist"
          onPress={() => router.replace("/(tabs)/watchlist")}
          className="items-center gap-1"
        >
          <MaterialCommunityIcons name="bookmark-multiple" size={27} color={colors.mutedText} />
          <Text className="text-[11px] font-bold" style={styles.subtitle}>Watchlist</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() => router.replace("/(tabs)/profile")}
          className="items-center gap-1"
        >
          <MaterialCommunityIcons name="account-circle" size={27} color={colors.mutedText} />
          <Text className="text-[11px] font-bold" style={styles.subtitle}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
