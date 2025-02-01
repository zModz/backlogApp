import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Stats = () => {
  const navigation = useNavigation();

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useFocusEffect(
    useCallback(() => {
      Alert.alert("Coming Soon™", "This page is still being built...", [
        {
          text: "go home",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
      ]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style={theme.theme === "dark" ? "light" : "dark"} />
      <View style={styles.appHeader}>
        <View
          style={{
            paddingTop: 15,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <IconButton
            icon="menu"
            iconColor={theme.colors.text}
            onPress={() => navigation.openDrawer()}
          />
          <View style={{ flexGrow: 2, height: 40, justifyContent: "center" }}>
            <Text style={styles.headerText}>Stats</Text>
          </View>
          <View style={{ width: 40 }}></View>
        </View>
      </View>
    </View>
  );
};

export default Stats;
