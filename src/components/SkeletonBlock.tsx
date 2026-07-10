import { useEffect, useMemo, useRef } from "react";
import { Animated, DimensionValue, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/context/theme-context";

interface SkeletonBlockProps {
  width?: DimensionValue;
  height: number;
  radius?: number;
  className?: string;
}

export function SkeletonBlock({ width = "100%", height, radius = 16, className }: SkeletonBlockProps) {
  const { colors } = useAppTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        block: {
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: colors.surfaceElevated,
        },
        shimmer: {
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 120,
          backgroundColor: "rgba(255,255,255,0.18)",
        },
      }),
    [colors, height, radius, width]
  );

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      })
    );

    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-160, 280],
  });

  return (
    <View className={className} style={styles.block}>
      <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
    </View>
  );
}
