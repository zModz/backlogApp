import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Icon,
  IconButton,
  Switch,
  TextInput,
  Tooltip,
} from "react-native-paper";
import * as EXPO from "expo-status-bar";
import * as Updates from "expo-updates";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Settings = () => {
  const navigation = useNavigation();
  // theme
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme);

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
    <View style={styles.container}>
      <EXPO.StatusBar style={theme.theme === "dark" ? "light" : "dark"} />
      <View style={styles.appHeader}>
        <View
          style={{
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <IconButton
            icon="menu"
            size={24}
            iconColor={theme.colors.text}
            onPress={() => navigation.openDrawer()}
          />
          <View style={{ flexGrow: 2, height: 40, justifyContent: "center" }}>
            <Text style={styles.headerText}>Settings</Text>
          </View>
          <View style={{ width: 40 }}></View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
            minWidth: "100%",
            minHeight: 50,
          }}
        >
          <Text style={{ color: theme.colors.text }}>Theme</Text>
          <IconButton
            mode="outlined"
            selected={theme.theme}
            icon={theme.theme === "light" ? "weather-sunny" : "weather-night"}
            containerColor={theme.theme === "light" ? "#87CEEB" : "#131862"}
            iconColor={theme.theme === "light" ? "yellow" : "white"}
            size={20}
            onPress={toggleTheme}
            animated="true"
            style={{ borderWidth: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
            minWidth: "100%",
            minHeight: 50,
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ color: theme.colors.text }}>Check For Updates</Text>
            {!updateAvailable && <Text>No Updates Available</Text>}
          </View>
          {updateAvailable ? (
            <IconButton
              mode="outlined"
              icon={isUpdating ? "reload" : "cloud-arrow-down"}
              containerColor={"#131862"}
              iconColor={"white"}
              size={20}
              onPress={applyUpdate}
              animated="true"
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
              animated="true"
              style={{ borderWidth: 0 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
