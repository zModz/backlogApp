import React from "react";
import { View, ScrollView, ImageBackground, Pressable } from "react-native";
import * as EXPO from "expo-status-bar";
import { Avatar, FAB, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Home = ({ route }) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const navigation = useNavigation();

  const { username } = route.params;

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <EXPO.StatusBar style={theme.theme === "dark" ? "light" : "dark"} />
      <View style={styles.appHeader}>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <Avatar.Text
                size={40}
                label={username[0]}
                style={{
                  margin: 10,
                  backgroundColor: theme.colors.accent,
                }}
                color={theme.colors.text}
              />
            </Pressable>
            {/* <IconButton icon={"menu"} onPress={navigation.openDrawer} /> */}
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Hello!
              </Text>
              <Text style={{ color: theme.colors.text, fontSize: 12 }}>
                @{username}
              </Text>
            </View>
          </View>
          <View>
            <IconButton
              icon={"bell"}
              size={24}
              iconColor={theme.colors.text}
              onPress={() => navigation.navigate("Notifications")}
              style={{ margin: 10 }}
            />
            {/* <Badge style={{ position: "absolute", top: 4, right: 0 }}>1</Badge> */}
          </View>
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Text variant="headlineLarge" style={{ color: theme.colors.text }}>
          Discover
        </Text>
        <ScrollView horizontal={true}>
          <View
            style={{
              height: 250,
              width: 160,
              backgroundColor: "white",
              borderRadius: 25,
              margin: 15,
              elevation: 5,
            }}
          >
            <ImageBackground
              source={{
                uri: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wkl.png",
              }}
              imageStyle={{ borderRadius: 25 }}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            ></ImageBackground>
          </View>
        </ScrollView>
      </View>
      <FAB.Group
        open={open}
        label={open ? "" : "Add"}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "animation-play",
            label: "Add to Queue",
            color: theme.colors.text,
            labelTextColor: theme.colors.text,
            style: {
              backgroundColor: theme.colors.primary,
            },
            onPress: () => console.log("Pressed queue"),
          },
          {
            icon: "gamepad-variant",
            label: "Add New Game",
            color: theme.colors.text,
            labelTextColor: theme.colors.text,
            style: {
              alignItems: "center",
              backgroundColor: theme.colors.primary,
            },
            onPress: () => {
              navigation.navigate("AddGame");
            },
          },
          {
            icon: "playlist-play",
            label: "Create Playlist",
            color: theme.colors.text,
            labelTextColor: theme.colors.text,
            style: {
              backgroundColor: theme.colors.primary,
            },
            onPress: () => console.log("Pressed playlist"),
          },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: theme.colors.primary }}
        color={theme.colors.text}
        backdropColor={theme.colors.transpBackground}
        style={{ elevation: 100 }}
      />
    </View>
  );
};

export default Home;
