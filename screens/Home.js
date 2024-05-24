import React from "react";
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  StatusBar,
} from "react-native";
import * as EXPO from "expo-status-bar";
import { Avatar, FAB, IconButton, Text, Badge } from "react-native-paper";
import { useNavigation, useTheme } from "@react-navigation/native";

const Home = ({ route }) => {
  const [state, setState] = React.useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });

  const navigation = useNavigation();

  const { username } = route.params;

  const colors = useTheme().colors;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <EXPO.StatusBar style="auto" />
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          padding: 5,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colors.secondary,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,

          minWidth: 360,
          minHeight: 100,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar.Text
              size={40}
              label={username[0]}
              style={{
                margin: 10,
                backgroundColor: colors.accent,
              }}
              color={colors.secondaryAccent}
            />
          </Pressable>
          {/* <IconButton icon={"menu"} onPress={navigation.openDrawer} /> */}
          <View style={{ flexDirection: "column" }}>
            <Text
              variant="titleMedium"
              style={{ color: colors.text, fontWeight: "bold" }}
            >
              Hello!
            </Text>
            <Text style={{ color: colors.text }}>@{username}</Text>
          </View>
        </View>
        <View>
          <IconButton
            icon={"bell"}
            iconColor={colors.text}
            onPress={() => navigation.navigate("Notifications")}
            style={{ margin: 10 }}
          />
          {/* <Badge style={{ position: "absolute", top: 4, right: 0 }}>1</Badge> */}
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Text variant="headlineLarge" style={{ color: colors.text }}>
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
            >
              <Text variant="titleSmall" style={{ color: "white" }}>
                Call of Duty: Black Ops
              </Text>
              <Text variant="bodySmall" style={{ color: "white" }}>
                Call of Duty: Black Ops
              </Text>
            </ImageBackground>
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
            color: colors.secondaryAccent,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.primary,
            },
            onPress: () => console.log("Pressed queue"),
          },
          {
            icon: "gamepad-variant",
            label: "Add New Game",
            color: colors.secondaryAccent,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.primary,
            },
            onPress: () => {
              navigation.navigate("AddGame");
            },
          },
          {
            icon: "playlist-play",
            label: "Create Playlist",
            color: colors.secondaryAccent,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.primary,
            },
            onPress: () => console.log("Pressed playlist"),
          },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: colors.primary }}
        color={colors.secondaryAccent}
        backdropColor={colors.background}
      />
    </View>
  );
};

export default Home;
