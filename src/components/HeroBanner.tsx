import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useMemo } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { MediaItem } from "@/types";
import { useAppTheme } from "@/context/theme-context";
import { AppButton } from "@/components/AppButton";

interface HeroBannerProps {
  item: MediaItem;
  onPrimaryPress: (id: string) => void;
  className?: string;
  style?: ViewStyle;
}

export function HeroBanner({ item, onPrimaryPress, className, style }: HeroBannerProps) {
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
      }),
    [colors]
  );

  return (
    <View className={`mb-6 overflow-hidden rounded-[28px] ${className ?? ""}`} style={[styles.banner, style]}>
      <View className="h-[320px] w-full">
        <Image
          source={item.heroImage}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
          contentFit="cover"
          transition={250}
          recyclingKey={item.id}
          cachePolicy="memory-disk"
        />
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
          <AppButton
            title={item.primaryActionLabel}
            onPress={() => onPrimaryPress(item.id)}
            className="mt-4 self-start px-[18px]"
            textClassName="text-white"
            style={styles.primaryButton}
          />
        </View>
      </View>
    </View>
  );
}
