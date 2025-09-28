import { darkTheme, lightTheme } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MD3Theme } from "react-native-paper";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: MD3Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) setIsDark(storedTheme === "dark");
      } catch (e) {
        console.log("Failed to load theme:", e);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem("theme", isDark ? "light" : "dark");
      setIsDark(!isDark);
    } catch (e) {
      console.log("Failed to save theme:", e);
    }
  };

  if (loading) return null;

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, theme: isDark ? darkTheme : lightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
