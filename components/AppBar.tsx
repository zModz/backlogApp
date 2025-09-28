import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  MD3Theme,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

const AppBar = ({ title, goBack }: { title: string; goBack?: boolean }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(theme, insets);
  const navi = useRouter();

  return (
    <Surface style={styles.appBarContainer}>
      <View style={styles.appBarContent}>
        <View>
          {goBack && (
            <IconButton icon={"arrow-left"} onPress={() => navi.back()} />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text variant="headlineMedium">{title}</Text>
        </View>
        <View>
          {!goBack && (
            <IconButton
              icon={"cog"}
              onPress={() => navi.navigate("/settings")}
            />
          )}
        </View>
      </View>
    </Surface>
  );
};

export default AppBar;

const makeStyles = (theme: MD3Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    appBarContainer: {
      height: 120,
      paddingTop: insets.top,
      paddingHorizontal: 15,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      elevation: 5,
    },
    appBarContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    infoContainer: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center",
    },
  });
