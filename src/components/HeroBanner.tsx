import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

import { MediaItem } from "@/types";
import { useAppTheme } from "@/context/theme-context";
import { useWatchlist } from "@/context/watchlist-context";
import { AnimatedPressable } from "@/components/AnimatedPressable";

interface HeroBannerProps {
  item: MediaItem;
  onPrimaryPress: (id: string) => void;
  className?: string;
  style?: ViewStyle;
}

export function HeroBanner({ item, onPrimaryPress, className, style }: HeroBannerProps) {
  const { colors } = useAppTheme();
  const { isSaved, toggleWatchlist } = useWatchlist();
  const saved = isSaved(item.id);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        banner: {
          backgroundColor: colors.surface,
        },
        title: {
          color: "#FFF",
        },
        brandSpecials: {
          color: "#00E5FF", // Cyan accent color
        },
        metaText: {
          color: "#9FA2A6",
        },
        badge: {
          backgroundColor: "rgba(3, 8, 20, 0.58)",
        },
        actionCol: {
          position: "absolute",
          right: 16,
          bottom: 16,
          alignItems: "center",
          gap: 12,
        },
        circlePlay: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "#FFF",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        },
        circleAdd: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "rgba(3, 8, 20, 0.62)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
          alignItems: "center",
          justifyContent: "center",
        },
      }),
    [colors]
  );

  const metaString = useMemo(() => {
    const typeLabel =
      item.type === "movie"
        ? "Movie"
        : item.type === "series"
          ? "Series"
          : item.type === "live"
            ? "Live"
            : "Special";
    return `${item.year} • ${item.rating} • ${typeLabel}`;
  }, [item]);

  return (
    <Pressable
      onPress={() => onPrimaryPress(item.id)}
      className={`mb-6 overflow-hidden rounded-[28px] ${className ?? ""}`}
      style={[styles.banner, style]}
    >
      <View className="h-[400px] w-full">
        {/* Poster Image */}
        <Image
          source={item.heroImage}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
          contentFit="cover"
          transition={250}
          recyclingKey={item.id}
          cachePolicy="memory-disk"
        />

        {/* Shading/Gradient overlay */}
        <LinearGradient
          colors={["rgba(3,8,20,0.18)", "rgba(3,8,20,0.45)", "rgba(3,8,20,0.92)"]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top-Left Badge */}
        <View className="absolute left-4 top-4 z-10 flex-row items-center gap-1 rounded-full px-2.5 py-1" style={styles.badge}>
          <MaterialCommunityIcons name="flash" size={14} color="#FFD700" />
          <Text className="text-[10px] font-black uppercase tracking-wider text-white">
            New Release
          </Text>
        </View>

        {/* Bottom Info Content */}
        <View className="absolute left-4 right-20 bottom-4">
          {/* Brand Specials tag */}
          <View className="flex-row items-center gap-1">
            <Text className="text-[11px] font-bold uppercase tracking-widest text-white/70">
              hotstar
            </Text>
            <Text className="text-[11px] font-extrabold uppercase tracking-widest" style={styles.brandSpecials}>
              specials
            </Text>
          </View>

          {/* Title */}
          <Text className="mt-1 text-[26px] font-black leading-8" style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          {/* Metadata */}
          <Text className="mt-2 text-xs font-semibold" style={styles.metaText}>
            {metaString}
          </Text>
        </View>

        {/* Floating Action Column (Bottom Right) */}
        <View style={styles.actionCol}>
          {/* Add to Watchlist */}
          <AnimatedPressable
            onPress={() => toggleWatchlist(item.id)}
            style={styles.circleAdd}
            accessibilityLabel="Add to watchlist"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons
              name={saved ? "check" : "plus"}
              size={22}
              color={saved ? colors.accent : "#FFF"}
            />
          </AnimatedPressable>

          {/* Direct Play */}
          <AnimatedPressable
            onPress={() => {
              router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } });
            }}
            style={styles.circlePlay}
            accessibilityLabel="Play now"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="play" size={26} color="#030814" />
          </AnimatedPressable>
        </View>
      </View>
    </Pressable>
  );
}
