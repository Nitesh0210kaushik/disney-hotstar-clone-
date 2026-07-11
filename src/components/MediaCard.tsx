import { memo, useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Image } from "expo-image";

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
        title: {
          color: colors.text,
        },
        subtitle: {
          color: colors.mutedText,
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
          <View className="p-3">
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
          </View>
        ) : null}
      </View>
    </AnimatedPressable>
  );
});
