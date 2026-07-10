import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { MediaItem } from "@/types";
import { useAppTheme } from "@/context/theme-context";

interface MediaCardProps {
  item: MediaItem;
  onPress: (id: string) => void;
  compact?: boolean;
}

export const MediaCard = memo(function MediaCard({ item, onPress, compact }: MediaCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.surface,
          shadowColor: "#000",
          shadowOpacity: 0.14,
          shadowRadius: 12,
          elevation: 4,
        },
        poster: {
          width: "100%",
        },
        posterCompact: {
          height: 170,
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
    [colors]
  );

  return (
    <AnimatedPressable
      onPress={() => onPress(item.id)}
      className={compact ? "w-[120px]" : "w-[160px]"}
    >
      <View className="overflow-hidden rounded-[18px]" style={styles.card}>
        <Image
          source={{ uri: item.posterImage }}
          placeholder={{ uri: item.backdropImage }}
          style={[styles.poster, compact ? styles.posterCompact : styles.posterRegular]}
          contentFit="cover"
          transition={200}
          recyclingKey={item.id}
          cachePolicy="memory-disk"
        />
        <View className="p-3">
          <Text numberOfLines={1} className="text-[15px] font-bold" style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} className="mt-1 text-xs" style={styles.subtitle}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
});
