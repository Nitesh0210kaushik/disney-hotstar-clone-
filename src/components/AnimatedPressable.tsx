import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AnimatedPressableProps extends PressableProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AnimatedPressable({
  children,
  containerStyle,
  onPressIn,
  onPressOut,
  ...props
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Pressable
        {...props}
        onPressIn={(event) => {
          scale.value = withSpring(0.97, { damping: 14, stiffness: 260 });
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.value = withSpring(1, { damping: 14, stiffness: 260 });
          onPressOut?.(event);
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
