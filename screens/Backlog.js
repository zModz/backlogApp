import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IconButton, TextInput, Chip, Tooltip } from "react-native-paper";

import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchBacklog } from "../hooks/useFetchBacklog";

import BacklogCard from "../components/BacklogCard";

const Backlog = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();

  const { user } = useAuthContext();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [query, setQuery] = useState([]);

  const { fetchBacklog, backlog, refreshing, error } = useFetchBacklog();

  const handleSearch = (t) => {
    setSearchQuery(t);

    const filteredBacklog = backlog.filter((game) =>
      game.name.toLowerCase().includes(t.toLowerCase())
    );

    setQuery(filteredBacklog);
  };

  useEffect(() => {
    fetchBacklog(user);

    setQuery(backlog);
  }, [backlog]);

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

          minWidth: "100%",
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
              Backlog
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
            // left={<TextInput.Icon icon={"magnify"} />}
            style={{
              backgroundColor: colors.secondary,
              flexGrow: 2,
            }}
          />
          <IconButton
            icon="filter"
            size={24}
            iconColor={colors.text}
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
          style={{ marginRight: 5, backgroundColor: colors.secondary }}
        >
          Shooter
        </Chip>
        <Chip
          icon="sword"
          onPress={() => console.log("Pressed")}
          style={{ marginRight: 5, backgroundColor: colors.secondary }}
        >
          Role-Playing (RPG)
        </Chip>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 275,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchBacklog} />
        }
      >
        {backlog &&
          query?.map((game) => <BacklogCard key={game.id} game={game} />)}
      </ScrollView>
    </View>
  );
};

export default Backlog;
