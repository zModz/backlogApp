import React from "react";
import { View, Image } from "react-native";
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
import { useTheme } from "@react-navigation/native";

const CustomDrawer = ({ drops, user }) => {
  // const { user } = useAuthContext();

  const colors = useTheme().colors;

  const username = user ? user.username : ""; // Check if user exists before accessing its properties
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary }}>
      <DrawerContentScrollView>
        <View style={{ padding: 20 }}>
          <Avatar.Text
            size={50}
            label={username[0]}
            style={{
              marginBottom: 10,
              backgroundColor: colors.text,
            }}
            color={colors.primary}
          />
          <Text variant="titleLarge">DISPLAY NAME</Text>
          <Text variant="bodyMedium">@{username}</Text>
        </View>
        <DrawerItemList {...drops} />
      </DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <Divider style={{ marginBottom: 10 }} />
        <Button
          icon={"logout"}
          onPress={() => handleLogout()}
          style={{ marginBottom: 10 }}
          textColor={colors.accent}
        >
          Logout
        </Button>
        <Text style={{ alignSelf: "center", marginBottom: 10 }}>
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
