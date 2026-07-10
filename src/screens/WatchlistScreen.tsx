import { Text, View } from "react-native";

import { useAppTheme } from "../context/theme-context";
import { useWatchlistFeed } from "../hooks/useWatchlistFeed";

export function WatchlistScreen() {
  const { colors } = useAppTheme();
  const { data: items } = useWatchlistFeed();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>Watchlist</Text>
      <Text style={{ color: colors.mutedText, marginTop: 8, textAlign: "center" }}>
        {items?.length ? `${items.length} saved items loaded through a hook.` : "Loading watchlist..."}
      </Text>
    </View>
  );
}
