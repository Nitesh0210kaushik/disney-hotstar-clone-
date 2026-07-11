import "@/global.css";
import "react-native-reanimated";

import { useMemo } from "react";
import { Stack } from "expo-router";
import { LogBox, StyleSheet, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import { ThemeProvider, useAppTheme } from "@/context/theme-context";
import { WatchlistProvider } from "@/context/watchlist-context";

// React Native Web logs this benign warning when a nested horizontal rail
// yields a gesture to the parent vertical feed.
LogBox.ignoreLogs(["ScrollView doesn't take rejection well - scrolls anyway"]);

function AppShell() {
  const { isDark, paperTheme, colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        stackContent: {
          backgroundColor: colors.background,
        },
        safeArea: {
          backgroundColor: colors.background,
        },
      }),
    [colors]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
        hidden={false}
      />
      <View
        className="flex-1"
        style={styles.safeArea}
      >
        <Stack screenOptions={{ headerShown: false, contentStyle: styles.stackContent }} />
      </View>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
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
