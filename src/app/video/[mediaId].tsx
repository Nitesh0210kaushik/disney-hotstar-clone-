import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { useAppTheme } from "../../context/theme-context";

export default function VideoRoute() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors } = useAppTheme();

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
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>Video Route</Text>
      <Text style={{ color: colors.mutedText, marginTop: 8, textAlign: "center" }}>
        Playing media id: {mediaId}
      </Text>
    </View>
  );
}
