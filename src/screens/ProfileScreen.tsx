import { useState } from "react";
import { Switch, Text, View } from "react-native";

import { useAppTheme } from "../context/theme-context";
import { appCopy } from "../data/copy";
import { useProfile } from "../hooks/useProfile";

export function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const { data: profile } = useProfile();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 56 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "900" }}>{appCopy.profile.title}</Text>

      <View style={{ marginTop: 24, borderRadius: 24, padding: 18, backgroundColor: colors.surface }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>
          {profile?.name ?? "Loading..."}
        </Text>
        <Text style={{ color: colors.mutedText, marginTop: 4 }}>{profile?.email ?? ""}</Text>
      </View>

      <View style={{ marginTop: 16, borderRadius: 24, padding: 18, backgroundColor: colors.surface }}>
        <Text style={{ color: colors.text, fontWeight: "800" }}>{appCopy.profile.theme}</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.mutedText }}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={{ marginTop: 16, borderRadius: 24, padding: 18, backgroundColor: colors.surface }}>
        <Text style={{ color: colors.text, fontWeight: "800" }}>{appCopy.profile.notifications}</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.mutedText }}>Push notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>
    </View>
  );
}
