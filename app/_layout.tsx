import AuthContextProvider from "@/contexts/AuthContext";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { PaperProvider, Text } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanelProvider } from "@/contexts/PanelContext";
import "react-native-reanimated";

function RootLayoutInner() {
  const { theme } = useThemeContext();

  const [loaded] = useFonts({
    Rotobo: require("@/assets/fonts/Roboto/Roboto-VariableFont.ttf"),
    "Rotobo-Italic": require("@/assets/fonts/Roboto/Roboto-Italic-VariableFont.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <PanelProvider>
        <StatusBar style={theme.dark ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </PanelProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  function OnlineWatcher() {
    const queryClient = useQueryClient();
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      const unsub = NetInfo.addEventListener((state) => {
        const connected = !!(state.isConnected && state.isInternetReachable);
        setIsConnected(connected);

        if (connected) {
          console.log("🔌 Online - refeching...");
          queryClient.refetchQueries();
        }
      });

      return () => unsub();
    }, []);

    return (
      <View style={{ position: "absolute", top: 40, right: 10 }}>
        <Text>{isConnected ? "ONLINE" : "OFFLINE"}</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider>
          <GestureHandlerRootView>
            <OnlineWatcher />
            <RootLayoutInner />
          </GestureHandlerRootView>
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
