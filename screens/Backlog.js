import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useBacklogContext } from "../hooks/useBacklogContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Styles from "../Styles";
import { IconButton, List, Searchbar } from "react-native-paper";
import SearchCard from "../components/SearchCard";
import BacklogCard from "../components/BacklogCard";

const Backlog = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [query, setQuery] = useState([]);

  // Get the backlog data and user info from contexts
  const { backlogs, dispatch } = useBacklogContext();
  const { user } = useAuthContext();

  // const createBacklog = async () => {
  //     const res = await fetch('http://192.168.1.62:3000/api/backlog', {
  //         method: "POST",
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${user.token}`
  //         }
  //     })

  //     console.log("User: ", user)
  //     console.log("RES: ", res)

  //     if (!res.ok) {
  //         console.log("Creation Error")
  //     }

  //     const json = await res.json()

  //     if (res.ok) {
  //         console.log("New Backlog Added!!")
  //         dispatch({ type: 'CREATE_WORKOUT', payload: json })
  //     }
  // }

  const fetchBacklog = async () => {
    const res = await fetch(
      "http://192.168.1.62:3000/api/backlog/" + user.backlogID,
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
    // console.log(json)

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

  // console.log(searchQuery, " ", query);

  return (
    <View>
      <StatusBar style="auto" />
      {/* {console.log(backlogs)} */}

      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: 250 }}>
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={(t) => handleSearch(t)}
          />
        </View>
        <View
          style={{
            width: 85,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            icon="filter"
            mode="contained"
            size={24}
            onPress={() => console.log("Pressed")}
            style={{ margin: 0 }}
          />
          <IconButton
            icon="sort"
            mode="contained"
            size={24}
            onPress={() => console.log("Pressed")}
            style={{ margin: 0 }}
          />
        </View>
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
    </View>
  );
};

export default Backlog;
