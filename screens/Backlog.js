import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";

import { useBacklogContext } from "../hooks/useBacklogContext";
import { useAuthContext } from "../hooks/useAuthContext";

import {
  IconButton,
  TextInput,
  SegmentedButtons,
  FAB,
  Chip,
  Tooltip,
} from "react-native-paper";
import BacklogCard from "../components/BacklogCard";

import { useNavigation, useTheme } from "@react-navigation/native";

const Backlog = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [query, setQuery] = useState([]);

  const [value, setValue] = React.useState("in-queue");

  // Get the backlog data and user info from contexts
  const { backlogs, dispatch } = useBacklogContext();
  const { user } = useAuthContext();

  const colors = useTheme().colors;

  const navigation = useNavigation();

  const fetchBacklog = async () => {
    const res = await fetch(
      process.env.EXPO_PUBLIC_SERVER_IP + "/api/backlog/" + user.backlogID,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("ERROR");
    }

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "SET_BACKLOG", payload: json });

      setQuery(json.backlog);
    }

    setRefreshing(false);
  };

  const handleSearch = (t) => {
    setSearchQuery(t);

    const filteredBacklog = backlogs.backlog.filter((game) =>
      game.name.toLowerCase().includes(t.toLowerCase())
    );

    setQuery(filteredBacklog);
  };

  useEffect(() => {
    if (user) {
      fetchBacklog();
    }
  }, []);

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
            left={<TextInput.Icon icon={"magnify"} />}
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
          paddingBottom: 140,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchBacklog} />
        }
      >
        {backlogs &&
          query?.map((game) => <BacklogCard key={game.id} game={game} />)}
      </ScrollView>
      {/* <FAB
        icon="plus"
        label="Add New Game"
        style={{
          position: "absolute",
          height: 55,
          margin: 16,
          left: 0,
          right: 0,
          bottom: 15,
          backgroundColor: colors.primary,
        }}
        color={colors.secondaryAccent}
        onPress={() => console.log("Pressed")}
      /> */}
    </View>
  );
};

export default Backlog;
