import { FlatList, StyleSheet, View } from "react-native";

import { MediaItem } from "@/types";
import { MediaCard } from "@/components/MediaCard";
import { SectionHeader } from "@/components/SectionHeader";

interface MediaRailProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onPressItem: (id: string) => void;
}

export function MediaRail({ title, subtitle, items, onPressItem }: MediaRailProps) {
  return (
    <View className="mb-7">
      <SectionHeader title={title} subtitle={subtitle} />
      <FlatList
        data={items}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MediaCard item={item} onPress={onPressItem} />}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-[14px]" />}
        contentContainerStyle={styles.listContent}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingRight: 24,
  },
});
