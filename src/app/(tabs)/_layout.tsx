import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/context/theme-context";

export default function TabsLayout() {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        tabBar: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: Platform.OS === "ios" ? 82 : 60,
          paddingTop: Platform.OS === "ios" ? 6 : 0,
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
        },
        tabItem: {
          paddingVertical: Platform.OS === "ios" ? 2 : 0,
          justifyContent: "center",
        },
        tabLabel: {
          fontSize: 11,
          marginTop: Platform.OS === "ios" ? 0 : 2,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabIcon: {
          marginBottom: 0,
        },
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
      }),
    [colors],
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.mutedText,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIconStyle: styles.tabIcon,
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === "index"
                ? "home-variant"
                : route.name === "watchlist"
                  ? "bookmark-multiple"
                  : "account-circle";

            return (
              <MaterialCommunityIcons name={iconName} color={color} size={size} />
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="watchlist" options={{ title: "Watchlist" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </SafeAreaView>
  );
}
