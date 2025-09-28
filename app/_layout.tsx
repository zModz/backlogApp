import AuthContextProvider from "@/contexts/AuthContext";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";

function RootLayoutInner() {
  const { theme } = useThemeContext();

  const [queryClient] = useState(() => new QueryClient());

  const [loaded] = useFonts({
    Rotobo: require("@/assets/fonts/Roboto/Roboto-VariableFont.ttf"),
    "Rotobo-Italic": require("@/assets/fonts/Roboto/Roboto-Italic-VariableFont.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PaperProvider theme={theme}>
          <StatusBar style={theme.dark ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </PaperProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutInner />
    </ThemeProvider>
  );
}
