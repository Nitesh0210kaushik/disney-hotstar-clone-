import {
  createContext,
  PropsWithChildren,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

import { ThemeMode } from "@/types";

type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  mutedText: string;
  border: string;
  accent: string;
  accentSoft: string;
};

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  paperTheme: typeof MD3LightTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: "#F6F8FB",
  surface: "#FFFFFF",
  surfaceElevated: "#EEF3FA",
  text: "#101828",
  mutedText: "#667085",
  border: "#D0D5DD",
  accent: "#1677D2",
  accentSoft: "#E6F4FE",
};

const darkColors: ThemeColors = {
  background: "#07111F",
  surface: "#0F1729",
  surfaceElevated: "#15213A",
  text: "#F8FAFC",
  mutedText: "#94A3B8",
  border: "#243247",
  accent: "#4BA3FF",
  accentSoft: "#102B47",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "app-theme-mode";

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  const [mode, setMode] = useState<ThemeMode>(systemMode);
  const hasHydrated = useRef(false);

  useEffect(() => {
    let isActive = true;

    async function loadThemeMode() {
      try {
        const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (!isActive || (storedMode !== "light" && storedMode !== "dark")) {
          hasHydrated.current = true;
          return;
        }

        setMode(storedMode);
      } catch {
        // Ignore storage errors and fall back to the current mode.
      } finally {
        hasHydrated.current = true;
      }
    }

    loadThemeMode();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    AsyncStorage.setItem(THEME_STORAGE_KEY, mode).catch(() => {
      // Ignore persistence errors.
    });
  }, [mode]);

  const colors = mode === "dark" ? darkColors : lightColors;

  const paperTheme = useMemo<typeof MD3LightTheme>(
    () => ({
      ...(mode === "dark" ? MD3DarkTheme : MD3LightTheme),
      colors: {
        ...(mode === "dark" ? MD3DarkTheme.colors : MD3LightTheme.colors),
        primary: colors.accent,
        secondary: colors.accentSoft,
        background: colors.background,
        surface: colors.surface,
        surfaceVariant: colors.surfaceElevated,
        onSurface: colors.text,
        onSurfaceVariant: colors.mutedText,
        outline: colors.border,
      },
    }),
    [colors, mode]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === "dark",
      colors,
      paperTheme,
      setMode,
      toggleTheme: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [colors, mode, paperTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider");
  }

  return context;
}
