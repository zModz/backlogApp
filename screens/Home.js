import React from "react";
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FAB, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Styles from "../Styles";

const Home = ({ route }) => {
  const [state, setState] = React.useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });

  const navigation = useNavigation();

  const { username } = route.params;

  return (
    <View style={Styles.container}>
      <StatusBar style="auto" />
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
            <Image
              source={{
                uri: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                margin: 10,
              }}
            />
          </Pressable>
          <View style={{ flexDirection: "column" }}>
            <Text variant="titleMedium">Hello!</Text>
            <Text style={{ color: "white" }}>@{username}</Text>
          </View>
        </View>
        <IconButton
          icon={"bell"}
          style={{ backgroundColor: "#ccd", margin: 10 }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text variant="headlineLarge">Discover</Text>
        <ScrollView horizontal={true}>
          <View
            style={{
              height: 250,
              width: 160,
              backgroundColor: "white",
              borderRadius: 25,
              margin: 15,
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
            onPress: () => console.log("Pressed queue"),
          },
          {
            icon: "gamepad-variant",
            label: "Add New Game",
            onPress: () => {
              navigation.navigate("AddGame");
            },
          },
          {
            icon: "playlist-play",
            label: "Create Playlist",
            onPress: () => console.log("Pressed playlist"),
          },
        ]}
        onStateChange={onStateChange}
      />
    </View>
  );
};

export default Home;
