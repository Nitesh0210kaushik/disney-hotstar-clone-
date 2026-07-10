import "../global.css";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider, useAppTheme } from "../context/theme-context";
import { WatchlistProvider } from "../context/watchlist-context";

function AppShell() {
  const { isDark, paperTheme, colors } = useAppTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <WatchlistProvider>
            <AppShell />
          </WatchlistProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
