import React from "react";
import { View, Image } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

// React Drawer
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import Constants from "expo-constants";

const CustomDrawer = ({ drops, user }) => {
  // const { user } = useAuthContext();

  const username = user ? user.username : ""; // Check if user exists before accessing its properties
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 40,
              marginBottom: 10,
            }}
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
        >
          Logout
        </Button>
        <Text style={{ alignSelf: "center", marginBottom: 10 }}>
          Made with ❤️ from Portugal 🇵🇹
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 10, fontStyle: 'italic', color: '#9b9b9b' }}>
          ARMORY v{Constants.expoConfig.version}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
