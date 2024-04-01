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
import { Avatar, FAB, IconButton, Text } from "react-native-paper";
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
        backgroundColor: colors.secondary,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <EXPO.StatusBar style="auto" />
      <View
        style={{
          padding: 10,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar.Text
              size={50}
              label={username[0]}
              style={{
                margin: 10,
                backgroundColor: colors.text,
              }}
              color={colors.primary}
            />
          </Pressable>
          <View style={{ flexDirection: "column" }}>
            <Text variant="titleMedium" style={{ color: colors.primary }}>
              Hello!
            </Text>
            <Text style={{ color: colors.accent, fontWeight: "bold" }}>
              @{username}
            </Text>
          </View>
        </View>
        <IconButton
          icon={"bell"}
          style={{ backgroundColor: colors.text, margin: 10 }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text variant="headlineLarge" style={{ color: colors.primary }}>
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
            color: colors.primary,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.accent,
            },
            onPress: () => console.log("Pressed queue"),
          },
          {
            icon: "gamepad-variant",
            label: "Add New Game",
            color: colors.primary,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.accent,
            },
            onPress: () => {
              navigation.navigate("AddGame");
            },
          },
          {
            icon: "playlist-play",
            label: "Create Playlist",
            color: colors.primary,
            labelTextColor: colors.primary,
            style: {
              backgroundColor: colors.accent,
            },
            onPress: () => console.log("Pressed playlist"),
          },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: colors.accent }}
        color={colors.primary}
        backdropColor={colors.text}
      />
    </View>
  );
};

export default Home;
