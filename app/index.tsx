import AddGame from "@/components/AddGame";
import AppBar from "@/components/AppBar";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/contexts/AuthContext";
import { usePanel } from "@/contexts/PanelContext";
import { useBacklogWithGames } from "@/hook/useBacklogWithGames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Button, FAB, MD3Theme, Searchbar, useTheme } from "react-native-paper";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height;

export default function Index() {
  const { auth } = useAuth();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const { backlog, backlogActions, isLoading } = useBacklogWithGames(auth);
  const PANELHEIGHT = 600 + insets.bottom;
  const searchbarRef = useRef<any>(null);

  // Filter games only when backlog is loaded and not empty
  const filteredGames = Array.isArray(backlog)
    ? backlog.filter((item) =>
        item?.game?.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const { open } = usePanel();
  const openSearchPanel = () => {
    console.log(searchbarRef);
    searchbarRef.current?.focus();
    open({
      preset: "custom",
      customPositions: {
        expandedOffset: 1 - PANELHEIGHT / screenHeight,
      },
      render: (isExpanded, controls, scrollRef, onScroll) => (
        <AddGame auth={auth} ref={searchbarRef} onScroll={onScroll} />
      ),
      dragEnabled: true,
      height: PANELHEIGHT,
      autoExpand: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title="ARMORY" />
      <View style={styles.pageContent}>
        <Searchbar
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          traileringIcon={"filter-variant"}
          onTraileringIconPress={() => {}}
        />
        {__DEV__ && (
          <Button
            onPress={async () => await AsyncStorage.removeItem("@backlog")}
          >
            Clear
          </Button>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredGames}
          renderItem={({ item }) => (
            <GameCard type="backlog" game={item?.game} />
          )}
          style={{
            marginTop: 5,
          }}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: insets.bottom + insets.top + 300,
            paddingHorizontal: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={backlogActions.reload}
            />
          }
        />
      </View>

      <FAB
        icon={"plus"}
        onPress={() => {
          openSearchPanel();
        }}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
      />
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    pageContent: { paddingTop: 10, paddingHorizontal: 15 },
  });
