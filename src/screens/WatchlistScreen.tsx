import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

import { useAppTheme } from "@/context/theme-context";
import { useWatchlistFeed } from "@/hooks/useWatchlistFeed";

export function WatchlistScreen() {
  const { colors } = useAppTheme();
  const { data: items } = useWatchlistFeed();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
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
    <View className="flex-1 items-center justify-center p-6" style={styles.container}>
      <Text className="text-[22px] font-extrabold" style={styles.title}>
        Watchlist
      </Text>
      <Text className="mt-2 text-center" style={styles.message}>
        {items?.length ? `${items.length} saved items loaded through a hook.` : "Loading watchlist..."}
      </Text>
    </View>
  );
}
