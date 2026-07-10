import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { MediaItem } from "@/types";
import { HeroBanner } from "@/components/HeroBanner";

interface HeroCarouselProps {
  items: MediaItem[];
  onPrimaryPress: (id: string) => void;
}

function HeroCarouselComponent({ items, onPrimaryPress }: HeroCarouselProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.max(width - 32, 280);
  const listRef = useRef<FlatList<MediaItem>>(null);
  const activeIndexRef = useRef(items.length > 1 ? 1 : 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carouselData = useMemo(() => {
    if (items.length <= 1) return items;
    // Clone last item to start, and first item to end
    return [items[items.length - 1], ...items, items[0]];
  }, [items]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: {
          paddingBottom: 8,
        },
        separator: {
          width: 12,
        },
        card: {
          width: cardWidth,
        },
      }),
    [cardWidth]
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (items.length <= 1) return;

    timerRef.current = setInterval(() => {
      if (!listRef.current) return;

      let nextIndex = activeIndexRef.current + 1;

      if (nextIndex > items.length + 1) {
        // Self-correcting snap: if we somehow exceed the cloned boundary (e.g. delayed scroll events),
        // snap instantly to the first real item (index 1) and target the second item (index 2).
        try {
          listRef.current.scrollToIndex({ index: 1, animated: false });
        } catch {
          // Ignore layout warnings
        }
        nextIndex = 2;
      }

      activeIndexRef.current = nextIndex;

      try {
        listRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      } catch {
        // Ignore layout warnings
      }
    }, 5000);
  }, [items.length, stopTimer]);

  useEffect(() => {
    // Reset active index when items change
    activeIndexRef.current = items.length > 1 ? 1 : 0;
    startTimer();
    return () => stopTimer();
  }, [items, startTimer, stopTimer]);

  const handleScrollBeginDrag = useCallback(() => {
    stopTimer();
  }, [stopTimer]);

  const handleScrollSettle = useCallback(
    (offsetX: number) => {
      const index = Math.round(offsetX / (cardWidth + 12));
      let finalIndex = index;

      if (items.length > 1) {
        try {
          if (index === 0) {
            // Snap silently to real last item
            finalIndex = items.length;
            listRef.current?.scrollToIndex({ index: finalIndex, animated: false });
          } else if (index === items.length + 1) {
            // Snap silently to real first item
            finalIndex = 1;
            listRef.current?.scrollToIndex({ index: finalIndex, animated: false });
          }
        } catch {
          // Ignore layout warnings
        }
      }

      activeIndexRef.current = finalIndex;
      startTimer();
    },
    [cardWidth, items.length, startTimer]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      handleScrollSettle(event.nativeEvent.contentOffset.x);
    },
    [handleScrollSettle]
  );

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const velocity = event.nativeEvent.velocity?.x ?? 0;
      if (velocity === 0) {
        handleScrollSettle(event.nativeEvent.contentOffset.x);
      }
    },
    [handleScrollSettle]
  );

  const renderItem = useCallback<ListRenderItem<MediaItem>>(
    ({ item }) => (
      <HeroBanner
        item={item}
        onPrimaryPress={onPrimaryPress}
        style={styles.card}
        className="mb-0"
      />
    ),
    [onPrimaryPress, styles.card]
  );

  const keyExtractor = useCallback((item: MediaItem, index: number) => `hero-${item.id}-${index}`, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<MediaItem> | null | undefined, index: number) => ({
      length: cardWidth + 12,
      offset: (cardWidth + 12) * index,
      index,
    }),
    [cardWidth]
  );

  return (
    <FlatList
      ref={listRef}
      data={carouselData}
      horizontal
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.content}
      renderItem={renderItem}
      initialNumToRender={items.length > 1 ? 3 : 1}
      windowSize={3}
      maxToRenderPerBatch={3}
      removeClippedSubviews
      getItemLayout={getItemLayout}
      initialScrollIndex={items.length > 1 ? 1 : 0}
      onScrollBeginDrag={handleScrollBeginDrag}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      onScrollEndDrag={handleScrollEndDrag}
    />
  );
}

export const HeroCarousel = memo(HeroCarouselComponent);
