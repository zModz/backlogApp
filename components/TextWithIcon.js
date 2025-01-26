import { StyleSheet, View } from "react-native";
import React, { Children } from "react";
import { Icon, Text } from "react-native-paper";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const TextWithIcon = ({ icon, children }) => {
    // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon source={icon} color={theme.colors.text} size={14} />
      <Text
        variant="bodyMedium"
        style={{ color: theme.colors.text, marginLeft: 5 }}
      >
        {children}
      </Text>
    </View>
  );
};

export default TextWithIcon;

const styles = StyleSheet.create({});
