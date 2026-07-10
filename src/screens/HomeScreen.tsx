import { useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import { appCopy } from "../data/copy";
import { useAppTheme } from "../context/theme-context";
import { HeroBanner } from "../components/HeroBanner";
import { MediaRail } from "../components/MediaRail";
import { SkeletonCard } from "../components/SkeletonCard";
import { useHomeFeed } from "../hooks/useHomeFeed";

export function HomeScreen() {
  const { colors } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data: feed, isLoading, reload } = useHomeFeed();

  const featured = useMemo(() => feed?.featured[0], [feed]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingTop: 56, paddingBottom: 36 }}
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
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "900", marginBottom: 18 }}>
        {appCopy.appName}
      </Text>

      {featured ? (
        <HeroBanner item={featured} onPrimaryPress={(id) => router.push(`/detail/${id}`)} />
      ) : (
        <View style={{ flexDirection: "row", gap: 14, marginBottom: 24 }}>
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
        <View style={{ flexDirection: "row", gap: 14 }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : null}
    </ScrollView>
  );
}
