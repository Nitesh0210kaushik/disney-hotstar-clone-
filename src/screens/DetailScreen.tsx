import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { SurfaceCard } from "@/components/SurfaceCard";
import { TagPill } from "@/components/TagPill";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useWatchlist } from "@/context/watchlist-context";
import { useMediaDetails } from "@/hooks/useMediaDetails";

export function DetailScreen() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors, isDark } = useAppTheme();
  const { isSaved, toggleWatchlist } = useWatchlist();
  const { data: item, isLoading, error, reload } = useMediaDetails(mediaId);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        loading: {
          backgroundColor: colors.background,
        },
        loadingText: {
          color: colors.text,
        },
        scroll: {
          backgroundColor: colors.background,
        },
        heroFrame: {
          backgroundColor: "#0B0B0D",
        },
        heroImage: {
          backgroundColor: "#0B0B0D",
        },
        title: {
          color: "#FFF",
        },
        description: {
          color: "#E5E7EB",
        },
        sectionTitle: {
          color: colors.text,
        },
        bodyText: {
          color: colors.mutedText,
          lineHeight: 20,
        },
        card: {
          backgroundColor: colors.surface,
        },
        cardText: {
          color: colors.text,
        },
        mutedText: {
          color: colors.mutedText,
        },
        playButton: {
          backgroundColor: colors.accent,
        },
        watchlistButton: {
          backgroundColor: colors.surface,
        },
        backButton: {
          backgroundColor: "rgba(3,8,20,0.68)",
        },
        heroBackButton: {
          top: 16,
        },
      }),
    [colors]
  );
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)");
  };

  if (isLoading) {
    return (
      <View className="flex-1 p-4" style={styles.loading}>
        <SkeletonBlock height={320} radius={24} />
        <SurfaceCard className="mt-4" style={styles.card} contentClassName="gap-3 p-4">
          <SkeletonBlock width="48%" height={18} radius={8} />
          <SkeletonBlock height={14} radius={8} />
          <SkeletonBlock width="72%" height={14} radius={8} />
        </SurfaceCard>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View className="flex-1 justify-center p-4" style={styles.loading}>
        <StateCard
          title={appCopy.detail.errorTitle}
          body={error ?? appCopy.detail.errorBody}
          actionTitle={appCopy.detail.retry}
          onAction={() => {
            void reload();
          }}
        />
        <AppButton
          title={appCopy.detail.back}
          onPress={handleBackPress}
          variant="secondary"
          className="mt-3"
        />
      </View>
    );
  }

  const metadata = [
    { label: appCopy.detail.year, value: String(item.year) },
    { label: appCopy.detail.duration, value: item.duration },
    { label: appCopy.detail.rating, value: item.rating },
    { label: appCopy.detail.type, value: item.type.toUpperCase() },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1" style={styles.scroll}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
        hidden={false}
      />
      <ScrollView
        className="flex-1"
        style={styles.scroll}
        contentContainerClassName="pb-9"
      >
        <View className="h-[360px]" style={styles.heroFrame}>
          <Image
            source={item.backdropImage}
            placeholder={item.posterImage}
            style={[StyleSheet.absoluteFill, styles.heroImage]}
            contentFit="cover"
            placeholderContentFit="cover"
            contentPosition="center"
            cachePolicy="memory-disk"
            recyclingKey={`detail-${item.id}`}
          />
          <LinearGradient colors={["transparent", "rgba(3,8,20,0.95)"]} style={StyleSheet.absoluteFill} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={appCopy.detail.back}
            onPress={handleBackPress}
            className="absolute left-4 h-11 w-11 items-center justify-center rounded-full"
            style={[styles.backButton, styles.heroBackButton]}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} color="#FFF" />
          </Pressable>
          <View className="absolute left-4 right-4 bottom-[18px]">
            <Text className="text-[30px] font-black" style={styles.title}>
              {item.title}
            </Text>
            <Text className="mt-1.5" style={styles.description}>
              {item.description}
            </Text>
            <View className="mt-4 flex-row gap-3">
              <AppButton
                title={appCopy.detail.play}
                onPress={() => {
                  console.log("[video] play button pressed", {
                    mediaId: item.id,
                    title: item.title,
                    videoUrl: item.videoUrl,
                  });
                  router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } });
                }}
                className="px-[18px] py-[14px]"
                textClassName="text-white"
                style={styles.playButton}
              />
              <AppButton
                title={isSaved(item.id) ? appCopy.detail.saved : appCopy.detail.addToWatchlist}
                onPress={() => toggleWatchlist(item.id)}
                variant="secondary"
                className="px-[18px] py-[14px]"
                style={styles.watchlistButton}
              />
            </View>
          </View>
        </View>

        <View className="gap-4 p-4">
          <SurfaceCard style={styles.card} contentClassName="gap-3 p-4">
            <Text className="text-[18px] font-extrabold" style={styles.sectionTitle}>
              {appCopy.detail.metadata}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {metadata.map((entry) => (
                <View key={entry.label} className="min-w-[88px]">
                  <Text className="text-[11px] font-bold uppercase" style={styles.mutedText}>
                    {entry.label}
                  </Text>
                  <Text className="mt-1 font-extrabold" style={styles.cardText}>
                    {entry.value}
                  </Text>
                </View>
              ))}
            </View>
          </SurfaceCard>

          <SurfaceCard style={styles.card} contentClassName="gap-3 p-4">
            <Text className="text-[18px] font-extrabold" style={styles.sectionTitle}>
              {appCopy.detail.story}
            </Text>
            <Text style={styles.bodyText}>{item.description}</Text>
          </SurfaceCard>

          <View className="gap-3">
            <Text className="text-[18px] font-extrabold" style={styles.sectionTitle}>
              {appCopy.detail.genres}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {item.genres.map((genre) => (
                <TagPill key={genre} label={genre} />
              ))}
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-[18px] font-extrabold" style={styles.sectionTitle}>
              {appCopy.detail.tags}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {item.tags.map((tag) => (
                <TagPill key={tag} label={tag} tone="accent" />
              ))}
            </View>
          </View>

          <SurfaceCard style={styles.card} contentClassName="gap-2 p-4">
            <Text className="text-[18px] font-extrabold" style={styles.sectionTitle}>
              {appCopy.detail.moreLikeThis}
            </Text>
            <Text style={styles.bodyText}>{appCopy.detail.moreLikeThisBody}</Text>
          </SurfaceCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
