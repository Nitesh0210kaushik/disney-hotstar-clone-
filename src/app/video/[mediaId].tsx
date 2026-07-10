import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

import { useAppTheme } from "@/context/theme-context";

export default function VideoRoute() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: colors.background,
        },
        title: {
          color: colors.text,
        },
        message: {
          color: colors.mutedText,
        },
      }),
    [colors]
  );

  return (
    <View className="flex-1 items-center justify-center p-6" style={styles.screen}>
      <Text className="text-[22px] font-extrabold" style={styles.title}>
        Video Route
      </Text>
      <Text className="mt-2 text-center" style={styles.message}>
        Playing media id: {mediaId}
      </Text>
    </View>
  );
}
