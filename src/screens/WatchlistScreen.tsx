import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useWatchlistFeed } from "@/hooks/useWatchlistFeed";

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
        containerContent: {
          paddingHorizontal: 16,
          paddingTop: insets.top + 16,
          paddingBottom: 36,
        },
        title: {
          color: colors.text,
        },
        card: {
          backgroundColor: colors.surface,
        },
        message: {
          color: colors.mutedText,
        },
      }),
    [colors, insets.top]
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await reload();
    } catch {
      // Error state is rendered below.
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.accent} />
      }
    >
      <Text className="text-[28px] font-black" style={styles.title}>
        {appCopy.watchlist.title}
      </Text>

      {isLoading ? (
        <SurfaceCard className="mt-6" style={styles.card} contentClassName="gap-3 p-[18px]">
          <SkeletonBlock width="56%" height={18} radius={8} />
          <SkeletonBlock height={14} radius={8} />
          <SkeletonBlock width="70%" height={14} radius={8} />
        </SurfaceCard>
      ) : error ? (
        <StateCard
          className="mt-6"
          title={error}
          body={appCopy.watchlist.errorBody}
          actionTitle={appCopy.watchlist.retry}
          onAction={() => {
            void reload();
          }}
        />
      ) : (
        <SurfaceCard className="mt-6" style={styles.card} contentClassName="p-[18px]">
          {items?.length ? (
          <>
            <Text className="text-[18px] font-extrabold" style={styles.title}>
              {items.length} {appCopy.watchlist.savedTitles}
            </Text>
            <Text className="mt-1" style={styles.message}>
              {appCopy.watchlist.readyBody}
            </Text>
          </>
        ) : (
          <>
            <Text className="text-[18px] font-extrabold" style={styles.title}>
              {appCopy.watchlist.emptyTitle}
            </Text>
            <Text className="mt-1" style={styles.message}>
              {appCopy.watchlist.emptyBody}
            </Text>
          </>
          )}
        </SurfaceCard>
      )}
    </ScrollView>
  );
}
