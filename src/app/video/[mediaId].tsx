import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { AppVideoPlayer } from "@/components/AppVideoPlayer";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useMediaDetails } from "@/hooks/useMediaDetails";

export default function VideoRoute() {
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const { colors } = useAppTheme();
  const { data: item, isLoading, error, reload } = useMediaDetails(mediaId);
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: colors.background,
          paddingTop: Math.max(insets.top, 0) + 16,
        },
        title: {
          color: colors.text,
        },
        muted: {
          color: colors.mutedText,
        },
        playerShell: {
          backgroundColor: "#000",
        },
        card: {
          backgroundColor: colors.surface,
        },
        backButton: {
          backgroundColor: colors.surface,
        },
      }),
    [colors, insets.top]
  );

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)");
  };

  if (isLoading) {
    return (
      <View className="flex-1 p-4" style={styles.screen}>
        <SkeletonBlock height={220} radius={24} />
        <SurfaceCard className="mt-4" style={styles.card} contentClassName="gap-3 p-4">
          <SkeletonBlock width="50%" height={18} radius={8} />
          <SkeletonBlock height={14} radius={8} />
          <SkeletonBlock width="72%" height={14} radius={8} />
        </SurfaceCard>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View className="flex-1 justify-center p-4" style={styles.screen}>
        <StateCard
          title={appCopy.video.errorTitle}
          body={error ?? appCopy.video.errorBody}
          actionTitle={appCopy.video.retry}
          onAction={() => {
            void reload();
          }}
        />
        <AppButton
          title={appCopy.video.back}
          onPress={handleBackPress}
          variant="secondary"
          className="mt-3"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4" style={styles.screen}>
      <View className="mb-4 flex-row items-center gap-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={appCopy.video.back}
          onPress={handleBackPress}
          className="h-11 w-11 items-center justify-center rounded-full"
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color={colors.text} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xs font-bold uppercase" style={styles.muted}>
            {appCopy.video.nowPlaying}
          </Text>
          <Text className="text-[22px] font-black" style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>

      <View className="overflow-hidden rounded-[24px]" style={styles.playerShell}>
        <AppVideoPlayer uri={item.videoUrl} />
      </View>

      <SurfaceCard className="mt-4" style={styles.card} contentClassName="p-4">
        <Text className="text-[18px] font-extrabold" style={styles.title}>
          {item.subtitle}
        </Text>
        <Text className="mt-2" style={styles.muted}>
          {appCopy.video.fullscreenHint}
        </Text>
      </SurfaceCard>
    </View>
  );
}
