import { memo, useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { MediaItem } from "@/types";
import { useAppTheme } from "@/context/theme-context";

interface MediaCardProps {
  item: MediaItem;
  onPress: (id: string) => void;
  compact?: boolean;
  posterOnly?: boolean;
  gridWidth?: number;
}

export const MediaCard = memo(function MediaCard({
  item,
  onPress,
  compact,
  posterOnly,
  gridWidth,
}: MediaCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.surface,
          borderWidth: 0,
          borderColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
        },
        poster: {
          width: "100%",
        },
        posterCompact: {
          height: gridWidth ? gridWidth * 1.38 : 170,
        },
        posterRegular: {
          height: 220,
        },
        overlay: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 28,
          paddingHorizontal: compact ? 10 : 12,
          paddingBottom: compact ? 9 : 11,
        },
        title: {
          color: "#FFF",
        },
        subtitle: {
          color: "rgba(255,255,255,0.78)",
        },
      }),
    [colors, gridWidth]
  );

  return (
    <AnimatedPressable
      onPress={() => onPress(item.id)}
      className={compact ? "w-[108px]" : "w-[160px]"}
      style={gridWidth ? { width: gridWidth } : undefined}
      containerStyle={gridWidth ? ({ width: gridWidth } satisfies ViewStyle) : undefined}
    >
      <View className={`overflow-hidden ${posterOnly ? "rounded-[8px]" : "rounded-[18px]"}`} style={styles.card}>
        <Image
          source={{ uri: item.posterImage }}
          style={[styles.poster, compact ? styles.posterCompact : styles.posterRegular]}
          contentFit="cover"
          transition={200}
          recyclingKey={item.id}
          cachePolicy="memory-disk"
        />
        {!posterOnly ? (
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.86)"]}
            style={styles.overlay}
          >
            <Text
              numberOfLines={1}
              className={`${compact ? "text-[11px]" : "text-[15px]"} font-bold`}
              style={styles.title}
            >
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              className={`mt-1 ${compact ? "text-[9px]" : "text-xs"}`}
              style={styles.subtitle}
            >
              {item.subtitle}
            </Text>
          </LinearGradient>
        ) : null}
      </View>
    </AnimatedPressable>
  );
});
