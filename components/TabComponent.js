import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import Queue from "../screens/Queue";
import Playlists from "../screens/Playlists";
import Backlog from "../screens/Backlog";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Tab = createBottomTabNavigator();

function TabMenu() {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Games"
      screenOptions={{
        tabBarStyle: {
          height: 55,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 15,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Queue"
        component={Queue}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={26}
              color={focused ? theme.colors.primary : color}
              name="animation-play"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={Backlog}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={26}
              color={focused ? theme.colors.primary : color}
              name="gamepad-variant"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={26}
              color={focused ? theme.colors.primary : color}
              name="playlist-play"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabMenu;
