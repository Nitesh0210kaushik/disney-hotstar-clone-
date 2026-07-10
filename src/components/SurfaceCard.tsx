import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useAppTheme } from "@/context/theme-context";

interface SurfaceCardProps extends PropsWithChildren {
  className?: string;
  style?: ViewStyle;
  contentClassName?: string;
  contentStyle?: ViewStyle;
}

export function SurfaceCard({
  children,
  className,
  style,
  contentClassName,
  contentStyle,
}: SurfaceCardProps) {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          backgroundColor: colors.surface,
        },
      }),
    [colors]
  );

  return (
    <View className={`rounded-[24px] ${className ?? ""}`} style={[styles.outer, style]}>
      <View className={contentClassName} style={contentStyle}>
        {children}
      </View>
    </View>
  );
}
