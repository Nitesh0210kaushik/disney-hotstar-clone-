import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo, useRef } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { colors } = useAppTheme();
  const { isSaved, toggleWatchlist } = useWatchlist();
  const { data: item, isLoading, error, reload } = useMediaDetails(mediaId);
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
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
          backgroundColor: "#020617",
        },
        heroImage: {
          backgroundColor: "#020617",
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
        stickyHeader: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          paddingTop: Math.max(insets.top, 0) + 12,
          paddingBottom: 12,
          paddingHorizontal: 16,
        },
        heroBackButton: {
          top: Math.max(insets.top, 0) + 16,
        },
      }),
    [colors, insets.top]
  );
  const stickyOpacity = scrollY.interpolate({
    inputRange: [10, 80],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const stickyTranslateY = scrollY.interpolate({
    inputRange: [10, 80],
    outputRange: [-12, 0],
    extrapolate: "clamp",
  });

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
    <View className="flex-1" style={styles.scroll}>
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            opacity: stickyOpacity,
            transform: [{ translateY: stickyTranslateY }],
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={appCopy.detail.back}
          onPress={handleBackPress}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={styles.card}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xs font-bold uppercase" style={styles.mutedText}>
            {item.type}
          </Text>
          <Text className="text-[17px] font-black" style={styles.sectionTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        style={styles.scroll}
        contentContainerClassName="pb-9"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: Platform.OS !== "web" }
        )}
      >
        <View className="h-[360px]" style={styles.heroFrame}>
          <Image
            source={{ uri: item.backdropImage }}
            className="h-full w-full"
            style={styles.heroImage}
            contentFit="cover"
            contentPosition="center"
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
                onPress={() => router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } })}
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
      </Animated.ScrollView>
    </View>
  );
}
