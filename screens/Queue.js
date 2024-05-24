import React from "react";
import { View, Text, StatusBar } from "react-native";
import {
  FAB,
  IconButton,
  Searchbar,
  TextInput,
  Tooltip,
} from "react-native-paper";
import Styles from "../Styles";
import { useNavigation, useTheme } from "@react-navigation/native";

const Queue = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const colors = useTheme().colors;
  const navigation = useNavigation();

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
          minHeight: 150,
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
              Queue
            </Text>
          </View>
          <Tooltip title="Add new games">
            <IconButton
              icon="plus"
              iconColor={colors.text}
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
            selectionColor={colors.text}
            cursorColor={colors.text}
            activeOutlineColor={colors.text}
            textColor={colors.text}
            left={<TextInput.Icon icon={"magnify"} />}
            style={{
              backgroundColor: colors.secondary,
              flexGrow: 2,
            }}
          />
          <IconButton
            icon="filter-variant"
            size={24}
            iconColor={colors.text}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>
    </View>
  );
};

export default Queue;
