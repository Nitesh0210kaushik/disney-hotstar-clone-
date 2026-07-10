import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

import { MediaItem } from "../types";
import { useAppTheme } from "../context/theme-context";

interface MediaCardProps {
  item: MediaItem;
  onPress: (id: string) => void;
  compact?: boolean;
}

export const MediaCard = memo(function MediaCard({ item, onPress, compact }: MediaCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable onPress={() => onPress(item.id)} style={{ width: compact ? 120 : 160 }}>
      <View
        style={{
          borderRadius: 18,
          backgroundColor: colors.surface,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOpacity: 0.14,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Image
          source={{ uri: item.posterImage }}
          style={{ width: "100%", height: compact ? 170 : 220 }}
          contentFit="cover"
          transition={200}
        />
        <View style={{ padding: 12 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.text, fontSize: 15, fontWeight: "700" }}
          >
            {item.title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.mutedText, marginTop: 4, fontSize: 12 }}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});
