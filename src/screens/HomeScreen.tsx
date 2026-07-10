import { useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { appCopy } from "@/data/copy";
import { useAppTheme } from "@/context/theme-context";
import { HeroBanner } from "@/components/HeroBanner";
import { MediaRail } from "@/components/MediaRail";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useHomeFeed } from "@/hooks/useHomeFeed";

export function HomeScreen() {
  const { colors } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data: feed, isLoading, reload } = useHomeFeed();

  const featured = useMemo(() => feed?.featured[0], [feed]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          backgroundColor: colors.background,
        },
        content: {
          padding: 16,
          paddingTop: 56,
          paddingBottom: 36,
        },
        title: {
          color: colors.text,
        },
      }),
    [colors]
  );

  return (
    <ScrollView
      className="flex-1"
      style={styles.scroll}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await reload();
            setRefreshing(false);
          }}
          tintColor={colors.accent}
        />
      }
    >
      <Text className="mb-[18px] text-[28px] font-black" style={styles.title}>
        {appCopy.appName}
      </Text>

      {featured ? (
        <HeroBanner item={featured} onPrimaryPress={(id) => router.push(`/detail/${id}`)} />
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
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
            onPressItem={(id) => router.push(`/detail/${id}`)}
          />
        ))
      ) : isLoading ? (
        <View className="flex-row gap-3.5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : null}
    </ScrollView>
  );
}
