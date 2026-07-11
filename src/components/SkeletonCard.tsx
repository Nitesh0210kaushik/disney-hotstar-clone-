import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/context/theme-context";

interface SkeletonCardProps {
  width?: number;
  height?: number;
}

export function SkeletonCard({ width = 150, height = 230 }: SkeletonCardProps) {
  const { colors } = useAppTheme();
  const shimmer = useRef(new Animated.Value(0)).current;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          width,
          height,
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: colors.surface,
        },
        inner: {
          flex: 1,
          backgroundColor: colors.surfaceElevated,
          overflow: "hidden",
        },
        shimmer: {
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 120,
          backgroundColor: "rgba(255,255,255,0.18)",
        },
      }),
    [colors, height, width]
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
    outputRange: [-220, 220],
  });

  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
      </View>
    </View>
  );
}
