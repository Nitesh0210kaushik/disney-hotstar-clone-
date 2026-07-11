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
  // Keep enough room for the next slide to peek in from the right.
  const cardWidth = Math.floor(width * 0.68);
  const listRef = useRef<FlatList<MediaItem>>(null);
  const activeIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carouselData = useMemo(() => {
    if (items.length <= 1) return items;
    // Three copies keep the same neighbours around A when the buffer recenters.
    return [...items, ...items, ...items];
  }, [items]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: {
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
        },
        separator: {
          width: 12,
        },
        card: {
          width: cardWidth,
        },
      }),
    [cardWidth, width]
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

      if (nextIndex > items.length * 2) {
        listRef.current.scrollToIndex({ index: items.length, animated: false });
        activeIndexRef.current = items.length;
        return;
      }

      activeIndexRef.current = nextIndex;

      try {
        listRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        // Recenter after A has the same visible neighbours in the next copy.
        if (nextIndex === items.length * 2) {
          setTimeout(() => {
            if (activeIndexRef.current >= items.length * 2) {
              listRef.current?.scrollToIndex({ index: items.length, animated: false });
              activeIndexRef.current = items.length;
            }
          }, 700);
        }
      } catch {
        // Ignore layout warnings
      }
    }, 5000);
  }, [items.length, stopTimer]);

  useEffect(() => {
    // Reset active index when items change
    activeIndexRef.current = items.length > 1 ? items.length : 0;
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
        if (index >= items.length * 2) {
          finalIndex = items.length;
          listRef.current?.scrollToIndex({ index: finalIndex, animated: false });
        } else if (index < items.length) {
          finalIndex = index + items.length;
          listRef.current?.scrollToIndex({ index: finalIndex, animated: false });
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
      nestedScrollEnabled
      snapToInterval={cardWidth + 12}
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
      removeClippedSubviews={false}
      getItemLayout={getItemLayout}
      initialScrollIndex={items.length > 1 ? items.length : 0}
      onScrollBeginDrag={handleScrollBeginDrag}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      onScrollEndDrag={handleScrollEndDrag}
    />
  );
}

export const HeroCarousel = memo(HeroCarouselComponent);
