import React from "react";
import { View, Text, StatusBar } from "react-native";
import {
  FAB,
  IconButton,
  Searchbar,
  TextInput,
  Tooltip,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Queue = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={styles.appHeader}
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
            iconColor={theme.colors.text}
            onPress={() => navigation.openDrawer()}
          />
          <View style={{ flexGrow: 2, height: 40 }}>
            <Text
              style={styles.headerText}
            >
              Queue
            </Text>
          </View>
          <Tooltip title="Add new games">
            <IconButton
              icon="plus"
              iconColor={theme.colors.text}
              onPress={() => navigation.navigate("AddGame")}
            />
          </Tooltip>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "stretch",
            margin: 5,
          }}
        >
          <TextInput
            mode="outlined"
            label="Search"
            value={searchQuery}
            onChangeText={(t) => handleSearch(t)}
            selectionColor={theme.colors.text}
            cursorColor={theme.colors.text}
            activeOutlineColor={theme.colors.text}
            textColor={theme.colors.text}
            left={<TextInput.Icon icon={"magnify"} />}
            style={{
              backgroundColor: theme.colors.surface,
              margin: 5,
              flexGrow: 2,
            }}
          />
          <IconButton
            icon="filter-variant"
            size={24}
            iconColor={theme.colors.text}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>
    </View>
  );
};

export default Queue;
