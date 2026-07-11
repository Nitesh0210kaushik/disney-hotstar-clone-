import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

import { AppButton } from "@/components/AppButton";
import { AnimatedPressable } from "@/components/AnimatedPressable";
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
  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [40, 160], [0, 1], Extrapolation.CLAMP);
    return {
      opacity,
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 180], [0, 1], Extrapolation.CLAMP);
    return {
      opacity,
    };
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        loading: {
          backgroundColor: colors.background,
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
          width: 54,
          height: 54,
          borderRadius: 27,
          backgroundColor: "#FFF",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        },
        watchlistButton: {
          backgroundColor: colors.surface,
        },
        header: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
        },
        headerBackButton: {
          marginLeft: 16,
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: "rgba(3, 8, 20, 0.45)",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 11,
        },
        headerTitleContainer: {
          flex: 1,
          marginLeft: 12,
          marginRight: 48,
          justifyContent: "center",
        },
        headerTitle: {
          color: colors.text,
          fontSize: 16,
          fontWeight: "800",
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
      <View className="flex-1" style={styles.loading}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={colors.background}
          translucent={false}
          hidden={false}
        />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 36 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="h-[360px] overflow-hidden" style={styles.heroFrame}>
            <SkeletonBlock height={360} radius={0} />
            <View className="absolute left-4 right-4 bottom-5 gap-3">
              <SkeletonBlock width="54%" height={30} radius={8} />
              <SkeletonBlock width="88%" height={14} radius={8} />
              <View className="flex-row gap-3">
                <SkeletonBlock width={54} height={54} radius={27} />
                <SkeletonBlock width={148} height={46} radius={23} />
              </View>
            </View>
          </View>
          <View className="gap-4 p-4">
            <SurfaceCard style={styles.card} contentClassName="gap-4 p-4">
              <SkeletonBlock width="38%" height={20} radius={8} />
              <View className="flex-row justify-between">
                <SkeletonBlock width="24%" height={30} radius={8} />
                <SkeletonBlock width="24%" height={30} radius={8} />
                <SkeletonBlock width="24%" height={30} radius={8} />
              </View>
              <SkeletonBlock width="28%" height={30} radius={8} />
            </SurfaceCard>
            <SurfaceCard style={styles.card} contentClassName="gap-3 p-4">
              <SkeletonBlock width="28%" height={20} radius={8} />
              <SkeletonBlock height={14} radius={8} />
              <SkeletonBlock width="82%" height={14} radius={8} />
            </SurfaceCard>
            <SkeletonBlock width="34%" height={20} radius={8} />
            <View className="flex-row gap-2">
              <SkeletonBlock width={72} height={32} radius={16} />
              <SkeletonBlock width={86} height={32} radius={16} />
              <SkeletonBlock width={94} height={32} radius={16} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View className="flex-1 justify-center p-4" style={[styles.loading, { paddingTop: insets.top + 16 }]}>
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
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
        hidden={false}
      />

      {/* Floating Fading Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            height: insets.top + 56,
          },
        ]}
      >
        {/* Animated Background Overlay */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.background },
            animatedBgStyle,
          ]}
        />

        {/* Back Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={appCopy.detail.back}
          onPress={handleBackPress}
          style={styles.headerBackButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#FFF" />
        </Pressable>

        {/* Dynamic Title */}
        <Animated.View style={[styles.headerTitleContainer, animatedTitleStyle]}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </Animated.View>
      </View>

      <Animated.ScrollView
        className="flex-1"
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 36 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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
          
          <View className="absolute left-4 right-4 bottom-[18px]">
            <Text className="text-[30px] font-black" style={styles.title}>
              {item.title}
            </Text>
            <Text className="mt-1.5" style={styles.description}>
              {item.description}
            </Text>
            <View className="mt-4 flex-row gap-3">
              <AnimatedPressable
                onPress={() => {
                  console.log("[video] play button pressed", {
                    mediaId: item.id,
                    title: item.title,
                    videoUrl: item.videoUrl,
                  });
                  router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } });
                }}
                style={styles.playButton}
                accessibilityRole="button"
                accessibilityLabel={appCopy.detail.play}
              >
                <MaterialCommunityIcons name="play" size={25} color="#030814" />
              </AnimatedPressable>
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
