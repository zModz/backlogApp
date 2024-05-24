import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import Home from "../screens/Home";
import Stats from "../screens/Stats";
import Settings from "../screens/Settings";

// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import TabMenu from "./TabComponent";
import CustomDrawer from "./customDrawer";

const Drawer = createDrawerNavigator();
import { useTheme } from "@react-navigation/native";

function DrawerMenu() {
  const colors = useTheme().colors;
  const { user } = useAuthContext();
  return (
    <Drawer.Navigator
      drawerContent={(drops) => <CustomDrawer drops={drops} user={user} />}
      screenOptions={{ drawerLabelStyle: { marginLeft: -20 } }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        initialParams={user}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={colors.primary}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Backlog"
        component={TabMenu}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "gamepad-variant" : "gamepad-variant-outline"}
              size={size}
              color={colors.primary}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Stats"
        component={Stats}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "chart-line" : "chart-line"}
              size={size}
              color={colors.primary}
            />
          ),
          headerTintColor: colors.text,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              size={size}
              color={colors.primary}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerMenu;
