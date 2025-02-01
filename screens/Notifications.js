import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Notifications = () => {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
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
            iconColor={theme.colors.text}
            onPress={navigation.goBack}
          />
          <View style={{ flexGrow: 2, height: 40 }}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
          <View style={{ width: 40 }}></View>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
