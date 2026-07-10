import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "@/context/theme-context";
import { useWatchlist } from "@/context/watchlist-context";
import { useMediaDetails } from "@/hooks/useMediaDetails";

export function DetailScreen() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors } = useAppTheme();
  const { isSaved, toggleWatchlist } = useWatchlist();
  const { data: item, isLoading } = useMediaDetails(mediaId);
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
        title: {
          color: "#FFF",
        },
        description: {
          color: "#E5E7EB",
        },
        chip: {
          backgroundColor: colors.surface,
        },
        chipText: {
          color: colors.text,
        },
        playButton: {
          backgroundColor: colors.accent,
        },
        watchlistButton: {
          backgroundColor: colors.surface,
        },
      }),
    [colors]
  );

  if (isLoading || !item) {
    return (
      <View className="flex-1 items-center justify-center" style={styles.loading}>
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" style={styles.scroll}>
      <View className="h-[360px]">
        <Image source={{ uri: item.backdropImage }} className="h-full w-full" contentFit="cover" />
        <LinearGradient colors={["transparent", "rgba(3,8,20,0.95)"]} style={StyleSheet.absoluteFill} />
        <View className="absolute left-4 right-4 bottom-[18px]">
          <Text className="text-[30px] font-black" style={styles.title}>
            {item.title}
          </Text>
          <Text className="mt-1.5" style={styles.description}>
            {item.description}
          </Text>
        </View>
      </View>

      <View className="gap-4 p-4">
        <View className="flex-row flex-wrap gap-2">
          {item.genres.map((genre) => (
            <View key={genre} className="rounded-full px-3 py-2" style={styles.chip}>
              <Text className="text-xs" style={styles.chipText}>
                {genre}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } })}
            className="rounded-full px-[18px] py-[14px]"
            style={styles.playButton}
          >
            <Text className="font-extrabold text-white">Play</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleWatchlist(item.id)}
            className="rounded-full px-[18px] py-[14px]"
            style={styles.watchlistButton}
          >
            <Text className="font-extrabold" style={styles.chipText}>
              {isSaved(item.id) ? "Saved" : "Add to Watchlist"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
