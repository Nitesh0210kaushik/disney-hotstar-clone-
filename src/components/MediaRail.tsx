import { memo, useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { MediaItem } from "@/types";
import { MediaCard } from "@/components/MediaCard";
import { SectionHeader } from "@/components/SectionHeader";

interface MediaRailProps {
  railId: string;
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onPressItem: (id: string) => void;
}

const CARD_WIDTH = 160;
const CARD_GAP = 14;

function MediaRailComponent({ railId, title, subtitle, items, onPressItem }: MediaRailProps) {
  const renderItem = useCallback<ListRenderItem<MediaItem>>(
    ({ item }) => <MediaCard item={item} onPress={onPressItem} />,
    [onPressItem]
  );

  const keyExtractor = useCallback(
    (item: MediaItem, index: number) => `${railId}-${item.id}-${index}`,
    [railId]
  );
  const getItemLayout = useCallback(
    (_: ArrayLike<MediaItem> | null | undefined, index: number) => ({
      length: CARD_WIDTH + CARD_GAP,
      offset: (CARD_WIDTH + CARD_GAP) * index,
      index,
    }),
    []
  );

  return (
    <View className="mb-7">
      <SectionHeader title={title} subtitle={subtitle} />
      <FlatList
        data={items}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export const MediaRail = memo(MediaRailComponent);

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  listContent: {
    paddingRight: 24,
  },
  separator: {
    width: CARD_GAP,
  },
});
