import { Text, View } from "react-native";
import React from "react";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const BaseCard = ({ children, style }) => {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return <View style={[styles.backlogCard, style]}>{children}</View>;
};

export default BaseCard;
