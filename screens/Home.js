import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Pressable } from "react-native";
import * as EXPO from "expo-status-bar";
import {
  ActivityIndicator,
  Avatar,
  FAB,
  IconButton,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

import useGame from "../hooks/useGame";
import { useAuthContext } from "../hooks/useAuthContext";
import ImageGameCard from "../components/ImageGameCard";
import Loading from "../components/Loading";
import useUpdateChecker from "../hooks/useUpdateChecker";

const Home = ({ route }) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const navigation = useNavigation();

  const [game, setGame] = useState([]);

  const { username } = route.params;
  const { auth } = useAuthContext();

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { isLoading, fetchGameData } = useGame();

  // const updateAvailable = useUpdateChecker();

  useEffect(() => {
    fetchGameData(
      auth,
      `fields name,cover.url;where rating > 75 & category = 0 & platforms = {6,167,169};sort rating desc;limit 10;`
    ).then((data) => {
      setGame(data);
    });
  }, []);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.text, marginBottom: 10 }}
          >
            Stats
          </Text>
          <View
            style={{
              height: 250,
              backgroundColor: theme.colors.surface,
              borderRadius: 15,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: theme.colors.text }}>Coming Soon™</Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text variant="headlineLarge" style={{ color: theme.colors.text }}>
              Discover
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.text }}>
              Showing games with a rating of 75 or highter
            </Text>
          </View>
          {isLoading ? (
            <Loading />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ minWidth: 1, flexDirection: "row" }}>
                {game &&
                  game?.map((g) => <ImageGameCard key={g.id} game={g} />)}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
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
