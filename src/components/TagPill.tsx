import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

import { useAppTheme } from "@/context/theme-context";

interface TagPillProps {
  label: string;
  tone?: "surface" | "accent";
}

export function TagPill({ label, tone = "surface" }: TagPillProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        pill: {
          backgroundColor: tone === "accent" ? colors.accentSoft : colors.surface,
        },
        label: {
          color: tone === "accent" ? colors.accent : colors.text,
        },
      }),
    [colors, tone]
  );

  return (
    <View className="rounded-full px-3 py-2" style={styles.pill}>
      <Text className="text-xs font-bold" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}
