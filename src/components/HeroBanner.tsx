import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { MediaItem } from "../types";
import { useAppTheme } from "../context/theme-context";

interface HeroBannerProps {
  item: MediaItem;
  onPrimaryPress: (id: string) => void;
}

export function HeroBanner({ item, onPrimaryPress }: HeroBannerProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        borderRadius: 28,
        overflow: "hidden",
        backgroundColor: colors.surface,
        marginBottom: 24,
      }}
    >
      <View style={{ height: 320 }}>
        <Image source={{ uri: item.heroImage }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        <LinearGradient
          colors={["transparent", "rgba(3,8,20,0.68)", "rgba(3,8,20,0.92)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
        />
        <View style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
          <Text style={{ color: "#FFF", fontSize: 13, fontWeight: "700", opacity: 0.88 }}>
            {item.subtitle}
          </Text>
          <Text style={{ color: "#FFF", fontSize: 30, fontWeight: "900", marginTop: 8 }}>
            {item.title}
          </Text>
          <Text style={{ color: "#E5E7EB", marginTop: 10, lineHeight: 20 }} numberOfLines={3}>
            {item.description}
          </Text>
          <Pressable
            onPress={() => onPrimaryPress(item.id)}
            style={{
              marginTop: 16,
              alignSelf: "flex-start",
              backgroundColor: colors.accent,
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "800" }}>{item.primaryActionLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
