import { useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useProfile } from "@/hooks/useProfile";

export function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const { data: profile } = useProfile();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: colors.background,
        },
        title: {
          color: colors.text,
        },
        card: {
          backgroundColor: colors.surface,
        },
        body: {
          color: colors.text,
        },
        muted: {
          color: colors.mutedText,
        },
      }),
    [colors]
  );

  return (
    <View className="flex-1 px-4 pt-14" style={styles.screen}>
      <Text className="text-[28px] font-black" style={styles.title}>
        {appCopy.profile.title}
      </Text>

      <View className="mt-6 rounded-[24px] p-[18px]" style={styles.card}>
        <Text className="text-[18px] font-extrabold" style={styles.body}>
          {profile?.name ?? "Loading..."}
        </Text>
        <Text className="mt-1" style={styles.muted}>
          {profile?.email ?? ""}
        </Text>
      </View>

      <View className="mt-4 rounded-[24px] p-[18px]" style={styles.card}>
        <Text className="font-extrabold" style={styles.body}>
          {appCopy.profile.theme}
        </Text>
        <View className="mt-2.5 flex-row items-center justify-between">
          <Text style={styles.muted}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      <View className="mt-4 rounded-[24px] p-[18px]" style={styles.card}>
        <Text className="font-extrabold" style={styles.body}>
          {appCopy.profile.notifications}
        </Text>
        <View className="mt-2.5 flex-row items-center justify-between">
          <Text style={styles.muted}>Push notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>
    </View>
  );
}
