import AppBar from "@/components/AppBar";
import { useThemeContext } from "@/contexts/ThemeContext";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

export default function Settings() {
  const { isDark, toggleTheme } = useThemeContext();
  const theme = useTheme();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateAvailable(true);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  };

  const applyUpdate = async () => {
    setIsUpdating(true);
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync(); // Reloads the app with the new update
    } catch (error) {
      console.error("Error applying update:", error);
      setIsUpdating(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title="Settings" goBack />
      <View style={styles.settingContainer}>
        <Text>Dark Mode</Text>
        <IconButton
          mode="contained"
          icon={isDark ? "weather-night" : "weather-sunny"}
          onPress={toggleTheme}
          animated
        />
      </View>
      <View style={styles.settingContainer}>
        <Text>Check Updates</Text>
        {updateAvailable ? (
          <IconButton
            mode="outlined"
            icon={isUpdating ? "reload" : "cloud-arrow-down"}
            containerColor={"#131862"}
            iconColor={"white"}
            size={20}
            onPress={applyUpdate}
            animated
            style={{ borderWidth: 0 }}
          />
        ) : (
          <IconButton
            mode="outlined"
            icon={"check-all"}
            containerColor={"green"}
            iconColor={"white"}
            size={20}
            onPress={checkForUpdates}
            animated
            style={{ borderWidth: 0 }}
          />
        )}
      </View>

      <Text style={{ alignSelf: "center", margin: 16 }} variant="labelLarge">
        {Constants.expoConfig?.name} {Constants.expoConfig?.version}
        {" - "}
        {Constants.expoConfig?.extra?.buildProfile}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});
