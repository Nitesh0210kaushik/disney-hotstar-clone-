import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "../context/theme-context";
import { useWatchlist } from "../context/watchlist-context";
import { useMediaDetails } from "../hooks/useMediaDetails";

export function DetailScreen() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors } = useAppTheme();
  const { isSaved, toggleWatchlist } = useWatchlist();
  const { data: item, isLoading } = useMediaDetails(mediaId);

  if (isLoading || !item) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text }}>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ height: 360 }}>
        <Image source={{ uri: item.backdropImage }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        <LinearGradient colors={["transparent", "rgba(3,8,20,0.95)"]} style={StyleSheet.absoluteFill} />
        <View style={{ position: "absolute", left: 16, right: 16, bottom: 18 }}>
          <Text style={{ color: "#FFF", fontSize: 30, fontWeight: "900" }}>{item.title}</Text>
          <Text style={{ color: "#E5E7EB", marginTop: 6 }}>{item.description}</Text>
        </View>
      </View>

      <View style={{ padding: 16, gap: 16 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {item.genres.map((genre) => (
            <View
              key={genre}
              style={{
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: colors.surface,
              }}
            >
              <Text style={{ color: colors.text, fontSize: 12 }}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={() => router.push({ pathname: "/video/[mediaId]", params: { mediaId: item.id } })}
            style={{
              backgroundColor: colors.accent,
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>Play</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleWatchlist(item.id)}
            style={{
              backgroundColor: colors.surface,
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "800" }}>
              {isSaved(item.id) ? "Saved" : "Add to Watchlist"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
