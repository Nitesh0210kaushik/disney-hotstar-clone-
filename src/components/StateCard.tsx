import { StyleSheet, Text } from "react-native";
import { useMemo } from "react";

import { AppButton } from "@/components/AppButton";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useAppTheme } from "@/context/theme-context";

interface StateCardProps {
  title: string;
  body: string;
  actionTitle?: string;
  onAction?: () => void;
  className?: string;
}

export function StateCard({ title, body, actionTitle, onAction, className }: StateCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          color: colors.text,
        },
        body: {
          color: colors.mutedText,
        },
      }),
    [colors]
  );

  return (
    <SurfaceCard className={className} contentClassName="p-[18px]">
      <Text className="text-[18px] font-extrabold" style={styles.title}>
        {title}
      </Text>
      <Text className="mt-1" style={styles.body}>
        {body}
      </Text>
      {actionTitle && onAction ? (
        <AppButton title={actionTitle} onPress={onAction} className="mt-4 self-start" />
      ) : null}
    </SurfaceCard>
  );
}
