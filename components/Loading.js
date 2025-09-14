import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const { width } = Dimensions.get("window");

const scale = width / 320;

const Loading = () => {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const loadingTexts = [
    "Searching the boxes...", //Mgs
    "Generating new world...", // Minecraft
    "Adquiring Cyberware...", // cbp2077
    "Looking for headcrabs...", //hl2
    "Gathering materia...", // FF7
    "Rippin' N'Tearin'", // Doom
  ];

  // Pick a random string
  const randomText =
    loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

  return (
    <View style={styles.loading}>
      <ActivityIndicator color={theme.colors.primary} />
      <Text
        style={{
          color: theme.colors.text,
          marginLeft: 9 * scale,
          fontSize: 11 * scale,
        }}
      >
        {randomText}
      </Text>
    </View>
  );
};

export default Loading;
