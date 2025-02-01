import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import * as EXPO from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { IconButton, TextInput, Chip, Tooltip } from "react-native-paper";

import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchBacklog } from "../hooks/useFetchBacklog";

import BacklogCard from "../components/BacklogCard";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";
import Loading from "../components/Loading";

const Backlog = () => {
  const navigation = useNavigation();
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { user } = useAuthContext();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [query, setQuery] = useState([]);

  const { fetchBacklog, backlog, refreshing, error } = useFetchBacklog();

  useEffect(() => {
    fetchBacklog(user);
  }, []); // ✅ Runs only once when the component mounts

  useEffect(() => {
    setQuery(backlog); // ✅ Updates `query` when `backlog` changes
  }, [backlog]); // ✅ Only runs when `backlog` updates

  const handleSearch = (t) => {
    setSearchQuery(t);

    if (!t) {
      setQuery(backlog); // ✅ Reset to full backlog when search is empty
      return;
    }

    const filteredBacklog = backlog.filter((game) =>
      game.name.toLowerCase().includes(t.toLowerCase())
    );

    setQuery(filteredBacklog);
  };

  return (
    <View style={styles.container}>
      <EXPO.StatusBar style={theme.theme === "dark" ? "light" : "dark"} />
      <View style={styles.appHeader}>
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
            <Text style={styles.headerText}>Backlog</Text>
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
            icon="filter"
            size={24}
            iconColor={theme.colors.text}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          paddingHorizontal: 15,
        }}
      >
        <Chip
          icon="bow-arrow"
          onPress={() => console.log("Pressed")}
          style={{ marginRight: 5, backgroundColor: theme.colors.surface }}
          textStyle={{ color: theme.colors.text }}
        >
          Shooter
        </Chip>
        <Chip
          icon="sword"
          onPress={() => console.log("Pressed")}
          style={{ marginRight: 5, backgroundColor: theme.colors.surface }}
          textStyle={{ color: theme.colors.text }}
        >
          Role-Playing (RPG)
        </Chip>
      </View>
      {refreshing ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 70,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchBacklog} />
          }
        >
          {backlog &&
            query?.map((game) => <BacklogCard key={game.id} game={game} />)}
        </ScrollView>
      )}
    </View>
  );
};

export default Backlog;
