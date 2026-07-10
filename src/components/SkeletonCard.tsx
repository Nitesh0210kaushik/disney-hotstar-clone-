import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { useAppTheme } from "../context/theme-context";

export function SkeletonCard() {
  const { colors } = useAppTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

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
    <View
      style={{
        width: 150,
        height: 230,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: colors.surface,
      }}
    >
      <View style={{ flex: 1, backgroundColor: colors.surfaceElevated, overflow: "hidden" }}>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 120,
            backgroundColor: "rgba(255,255,255,0.18)",
            transform: [{ translateX }],
          }}
        />
      </View>
    </View>
  );
}
