import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
const ExpoImage = Image as any;
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button as PaperButton, Card as PaperCard, Switch as PaperSwitch } from "react-native-paper";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateCard } from "@/components/StateCard";
import { useAppTheme } from "@/context/theme-context";
import { appCopy } from "@/data/copy";
import { useProfile } from "@/hooks/useProfile";

export function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: profile, isLoading, error, reload } = useProfile();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: colors.background,
        },
        content: {
          paddingBottom: Math.max(insets.bottom, 0) + 104,
          paddingTop: Math.max(insets.top, 0) + 12,
        },
        title: {
          color: colors.text,
        },
        heroCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: 28,
          borderWidth: 1,
          overflow: "hidden",
        },
        heroGlow: {
          backgroundColor: colors.accentSoft,
        },
        card: {
          backgroundColor: colors.surface,
          borderRadius: 24,
        },
        firstCard: {
          marginTop: 24,
        },
        stackedCard: {
          marginTop: 16,
        },
        paperContent: {
          paddingVertical: 18,
        },
        avatar: {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.accent,
          borderWidth: 2,
        },
        body: {
          color: colors.text,
        },
        muted: {
          color: colors.mutedText,
        },
        paperButton: {
          borderRadius: 16,
          marginTop: 16,
        },
        badge: {
          backgroundColor: colors.accentSoft,
        },
        badgeText: {
          color: colors.accent,
        },
        statBox: {
          backgroundColor: colors.surfaceElevated,
        },
        iconBubble: {
          backgroundColor: colors.accentSoft,
        },
      }),
    [colors, insets.bottom]
  );

  return (
    <ScrollView
      className="flex-1"
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4">
      <Text className="text-[28px] font-black" style={styles.title}>
        {appCopy.profile.title}
      </Text>

      {isLoading ? (
        <PaperCard mode="contained" style={[styles.card, styles.firstCard]}>
          <PaperCard.Content style={styles.paperContent}>
            <View className="flex-row items-center gap-3">
              <SkeletonBlock width={56} height={56} radius={16} />
              <View className="flex-1 gap-2">
                <SkeletonBlock width="64%" height={18} radius={8} />
                <SkeletonBlock width="86%" height={14} radius={8} />
              </View>
            </View>
            <SkeletonBlock height={44} radius={12} className="mt-2" />
          </PaperCard.Content>
        </PaperCard>
      ) : error ? (
        <StateCard
          className="mt-6"
          title={appCopy.profile.errorTitle}
          body={appCopy.profile.errorBody}
          actionTitle={appCopy.profile.retry}
          onAction={() => {
            void reload();
          }}
        />
      ) : (
        <PaperCard mode="contained" style={[styles.heroCard, styles.firstCard]}>
          <PaperCard.Content style={styles.paperContent}>
            <View className="absolute -right-10 -top-12 h-36 w-36 rounded-full opacity-70" style={styles.heroGlow} />
            <View className="flex-row items-start gap-3">
              <ExpoImage
                source={{ uri: profile?.avatar }}
                className="h-[72px] w-[72px] rounded-[22px]"
                style={styles.avatar}
                contentFit="cover"
              />
              <View className="flex-1">
                <View className="self-start rounded-full px-3 py-1" style={styles.badge}>
                  <Text className="text-[11px] font-black uppercase" style={styles.badgeText}>
                    {appCopy.profile.premiumBadge}
                  </Text>
                </View>
                <Text className="mt-2 text-[22px] font-black" style={styles.body}>
                  {profile?.name ?? appCopy.profile.loading}
                </Text>
                <Text className="mt-1" style={styles.muted}>
                  {profile?.email ?? appCopy.profile.unavailable}
                </Text>
                <Text className="mt-1 text-xs font-semibold" style={styles.muted}>
                  {appCopy.profile.memberSince}
                </Text>
              </View>
            </View>
            <View className="mt-5 flex-row gap-3">
              <View className="flex-1 rounded-2xl p-3" style={styles.statBox}>
                <Text className="text-xs font-bold uppercase" style={styles.muted}>
                  {appCopy.profile.plan}
                </Text>
                <Text className="mt-1 font-extrabold" style={styles.body}>
                  {profile?.plan ?? appCopy.profile.unavailable}
                </Text>
              </View>
              <View className="flex-1 rounded-2xl p-3" style={styles.statBox}>
                <Text className="text-xs font-bold uppercase" style={styles.muted}>
                  {appCopy.profile.savedItems}
                </Text>
                <Text className="mt-1 font-extrabold" style={styles.body}>
                  {profile?.watchlistCount ?? 0}
                </Text>
              </View>
            </View>
            <PaperButton
              mode="contained-tonal"
              onPress={() => router.push("/(tabs)/watchlist")}
              style={styles.paperButton}
              textColor={colors.text}
            >
              {appCopy.profile.manage}
            </PaperButton>
          </PaperCard.Content>
        </PaperCard>
      )}

      <PaperCard mode="contained" style={[styles.card, styles.stackedCard]}>
        <PaperCard.Content style={styles.paperContent}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={styles.iconBubble}>
                <MaterialCommunityIcons name="theme-light-dark" size={22} color={colors.accent} />
              </View>
              <View>
                <Text className="font-extrabold" style={styles.body}>
                  {appCopy.profile.theme}
                </Text>
                <Text className="mt-1" style={styles.muted}>{appCopy.profile.darkMode}</Text>
              </View>
            </View>
            <PaperSwitch value={isDark} onValueChange={toggleTheme} color={colors.accent} />
          </View>
        </PaperCard.Content>
      </PaperCard>

      <PaperCard mode="contained" style={[styles.card, styles.stackedCard]}>
        <PaperCard.Content style={styles.paperContent}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={styles.iconBubble}>
                <MaterialCommunityIcons name="bell-ring" size={21} color={colors.accent} />
              </View>
              <View>
                <Text className="font-extrabold" style={styles.body}>
                  {appCopy.profile.notifications}
                </Text>
                <Text className="mt-1" style={styles.muted}>{appCopy.profile.pushNotifications}</Text>
              </View>
            </View>
            <PaperSwitch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              color={colors.accent}
            />
          </View>
        </PaperCard.Content>
      </PaperCard>

      <PaperCard mode="contained" style={[styles.card, styles.stackedCard]}>
        <PaperCard.Content style={styles.paperContent}>
          <View className="gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={styles.iconBubble}>
                <MaterialCommunityIcons name="download-circle" size={22} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="font-extrabold" style={styles.body}>
                  {appCopy.profile.downloads}
                </Text>
                <Text className="mt-1" style={styles.muted}>
                  {appCopy.profile.downloadsBody}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={styles.iconBubble}>
                <MaterialCommunityIcons name="television-play" size={21} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="font-extrabold" style={styles.body}>
                  {appCopy.profile.quality}
                </Text>
                <Text className="mt-1" style={styles.muted}>
                  {appCopy.profile.qualityBody}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={styles.iconBubble}>
                <MaterialCommunityIcons name="cellphone-link" size={21} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="font-extrabold" style={styles.body}>
                  {appCopy.profile.devices}
                </Text>
                <Text className="mt-1" style={styles.muted}>
                  {appCopy.profile.devicesBody}
                </Text>
              </View>
            </View>
          </View>
        </PaperCard.Content>
      </PaperCard>
      </View>
    </ScrollView>
  );
}
