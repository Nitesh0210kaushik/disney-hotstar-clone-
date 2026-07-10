import { FlatList, View } from "react-native";

import { MediaItem } from "../types";
import { MediaCard } from "./MediaCard";
import { SectionHeader } from "./SectionHeader";

interface MediaRailProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onPressItem: (id: string) => void;
}

export function MediaRail({ title, subtitle, items, onPressItem }: MediaRailProps) {
  return (
    <View style={{ marginBottom: 28 }}>
      <SectionHeader title={title} subtitle={subtitle} />
      <FlatList
        data={items}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MediaCard item={item} onPress={onPressItem} />}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        contentContainerStyle={{ paddingRight: 24 }}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
}
