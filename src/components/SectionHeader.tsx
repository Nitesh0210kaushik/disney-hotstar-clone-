import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

import { useAppTheme } from "@/context/theme-context";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
}

export function SectionHeader({ title, subtitle, onViewAll }: SectionHeaderProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          color: colors.text,
        },
        subtitle: {
          color: colors.mutedText,
        },
        viewAll: {
          color: colors.accent,
        },
      }),
    [colors]
  );

  return (
    <View className="mb-3.5">
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 text-xl font-extrabold" style={styles.title}>
          {title}
        </Text>
        {onViewAll ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View all ${title}`}
            hitSlop={8}
            onPress={onViewAll}
            className="ml-3"
          >
            <Text className="text-[13px] font-bold" style={styles.viewAll}>
              View All
            </Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? (
        <Text className="mt-1 text-[13px]" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
