import { StyleSheet, Text, ViewStyle } from "react-native";
import { ReactNode, useMemo } from "react";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { useAppTheme } from "@/context/theme-context";

type AppButtonVariant = "primary" | "secondary";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  icon?: ReactNode;
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  className,
  textClassName,
  style,
  icon,
}: AppButtonProps) {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        primary: {
          backgroundColor: colors.accent,
        },
        secondary: {
          backgroundColor: colors.surface,
        },
        primaryText: {
          color: "#FFF",
        },
        secondaryText: {
          color: colors.text,
        },
      }),
    [colors]
  );

  const variantStyle = variant === "primary" ? styles.primary : styles.secondary;
  const textStyle = variant === "primary" ? styles.primaryText : styles.secondaryText;

  return (
    <AnimatedPressable
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-full px-[18px] py-3 ${className ?? ""}`}
      style={[variantStyle, style]}
    >
      {icon}
      <Text className={`font-extrabold ${textClassName ?? ""}`} style={textStyle}>
        {title}
      </Text>
    </AnimatedPressable>
  );
}
