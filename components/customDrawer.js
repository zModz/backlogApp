import React from "react";
import { View, Image, Platform } from "react-native";
import { Avatar, Button, Divider, Text } from "react-native-paper";

// React Drawer
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import Constants from "expo-constants";
import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const CustomDrawer = ({ drops, user }) => {
  // const { user } = useAuthContext();

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const username = user ? user.username : ""; // Check if user exists before accessing its properties
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <DrawerContentScrollView>
        <View style={{ padding: 20 }}>
          <Avatar.Text
            size={50}
            label={username[0]}
            style={{
              marginBottom: 10,
              backgroundColor: theme.colors.accent,
            }}
            color={theme.colors.secondaryAccent}
          />
          <Text
            variant="titleLarge"
            style={{ color: theme.colors.text, fontWeight: "bold" }}
          >
            ARMORY USER
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
            @{username}
          </Text>
        </View>
        <DrawerItemList {...drops} />
      </DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <Divider style={{ marginBottom: 10 }} />
        <Button
          mode="outlined"
          icon={"logout"}
          onPress={() => handleLogout()}
          style={{ marginBottom: 10, borderColor: theme.colors.primary }}
          textColor={theme.colors.primary}
        >
          Logout
        </Button>
        <Text
          style={{
            alignSelf: "center",
            marginBottom: 10,
            color: theme.colors.text,
          }}
        >
          Made with ❤️ from Portugal 🇵🇹
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 10,
            fontStyle: "italic",
            color: "#9b9b9b",
          }}
        >
          ARMORY v{Constants.expoConfig.version}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
