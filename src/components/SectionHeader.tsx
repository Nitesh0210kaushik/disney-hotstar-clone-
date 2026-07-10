import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

import { useAppTheme } from "@/context/theme-context";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
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
      }),
    [colors]
  );

  return (
    <View className="mb-3.5">
      <Text className="text-xl font-extrabold" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text className="mt-1 text-[13px]" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
