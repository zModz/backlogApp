import React from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";

import { useNavigation, useTheme } from "@react-navigation/native";
import {
  Icon,
  IconButton,
  Switch,
  TextInput,
  Tooltip,
} from "react-native-paper";

const Settings = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const colors = useTheme().colors;
  const navigation = useNavigation();

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          padding: 5,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          backgroundColor: colors.secondary,
          elevation: 5,

          minWidth: 360,
          minHeight: 100,
        }}
      >
        <View
          style={{
            paddingTop: 15,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "stretch",
          }}
        >
          <IconButton
            icon="menu"
            iconColor={colors.text}
            onPress={() => navigation.openDrawer()}
          />
          <View style={{ flexGrow: 2, height: 40 }}>
            <Text
              style={{
                fontSize: 24,
                alignSelf: "center",
              }}
            >
              Settings
            </Text>
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
            minWidth: 340,
            minHeight: 50,

            borderWidth: 1,
          }}
        >
          <Text>Theme</Text>
          <IconButton
            mode="outlined"
            selected={isSwitchOn}
            icon={isSwitchOn ? "weather-sunny" : "weather-night"}
            containerColor={isSwitchOn ? "#87CEEB" : "#131862"}
            iconColor={isSwitchOn ? "yellow" : "white"}
            size={20}
            onPress={onToggleSwitch}
            animated="true"
            style={{ borderWidth: 0 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
