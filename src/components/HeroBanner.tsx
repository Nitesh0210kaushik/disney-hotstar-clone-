import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { MediaItem } from "@/types";
import { useAppTheme } from "@/context/theme-context";

interface HeroBannerProps {
  item: MediaItem;
  onPrimaryPress: (id: string) => void;
}

export function HeroBanner({ item, onPrimaryPress }: HeroBannerProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        banner: {
          backgroundColor: colors.surface,
        },
        title: {
          color: "#FFF",
        },
        subtitle: {
          color: "#FFF",
          opacity: 0.88,
        },
        description: {
          color: "#E5E7EB",
          lineHeight: 20,
        },
        primaryButton: {
          backgroundColor: colors.accent,
        },
        primaryButtonText: {
          color: "#FFF",
        },
      }),
    [colors]
  );

  return (
    <View className="mb-6 overflow-hidden rounded-[28px]" style={styles.banner}>
      <View className="h-[320px]">
        <Image source={{ uri: item.heroImage }} className="h-full w-full" contentFit="cover" />
        <LinearGradient
          colors={["transparent", "rgba(3,8,20,0.68)", "rgba(3,8,20,0.92)"]}
          style={StyleSheet.absoluteFill}
        />
        <View className="absolute left-[18px] right-[18px] bottom-[18px]">
          <Text className="text-[13px] font-bold" style={styles.subtitle}>
            {item.subtitle}
          </Text>
          <Text className="mt-2 text-[30px] font-black" style={styles.title}>
            {item.title}
          </Text>
          <Text className="mt-2.5" style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          <Pressable onPress={() => onPrimaryPress(item.id)} className="mt-4 self-start rounded-full px-[18px] py-3" style={styles.primaryButton}>
            <Text className="font-extrabold" style={styles.primaryButtonText}>
              {item.primaryActionLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
