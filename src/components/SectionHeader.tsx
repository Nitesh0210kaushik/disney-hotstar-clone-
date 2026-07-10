import { Text, View } from "react-native";

import { useAppTheme } from "../context/theme-context";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "800" }}>{title}</Text>
      {subtitle ? (
        <Text style={{ color: colors.mutedText, marginTop: 4, fontSize: 13 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
