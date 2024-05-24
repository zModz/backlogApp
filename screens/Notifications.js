import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const Notifications = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();

  return (
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
          icon="arrow-left"
          iconColor={colors.text}
          onPress={navigation.goBack}
        />
        <View style={{ flexGrow: 2, height: 40 }}>
          <Text
            style={{
              fontSize: 24,
              alignSelf: "center",
            }}
          >
            Notifications
          </Text>
        </View>
        <View style={{ width: 40 }}></View>
      </View>
    </View>
  );
};

export default Notifications;
