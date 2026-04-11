import AddGame from "@/components/AddGame";
import AppBar from "@/components/AppBar";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/contexts/AuthContext";
import { usePanel } from "@/contexts/PanelContext";
import { useBacklog } from "@/hook/useBacklog";
import { Game } from "@/mockdata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { FlatList, RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Button, FAB, Icon, List, MD3Theme, RadioButton, Searchbar, Text, useTheme } from "react-native-paper";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height;

export default function Index() {
  const { auth } = useAuth();
  const { backlog, ...backlogActions } = useBacklog();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();
  const SEARCHPANELHEIGHT = 600 + insets.bottom;
  const FILTERPANELHEIGHT = 500 + insets.bottom;
  
  // Search state and ref for auto-focus when opening search panel
  const searchbarRef = useRef<any>(null);
  const [search, setSearch] = useState("");

  // Filter/Sort states 
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [sortStatus, setSortStatus] = useState<string>("Status");
  
  // Filter games only when backlog is loaded and not empty
  const filteredGames = useMemo(() => {
    if (backlogActions.loading || backlog.length === 0) return [];
    let games = [...backlog];
    
    // Search
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      games = games.filter((g) => g.game.name.toLowerCase().includes(lowerSearch));
    }

    // Filter
    if (filterStatus !== "All") {
      games = games.filter((g) => g.status === filterStatus);
    }

    // Sort
    if (sortStatus === "Alphabetical") {
      games.sort((a, b) => a.game.name.localeCompare(b.game.name));
    } else if (sortStatus === "Date Added") {
      games.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    } else if (sortStatus === "Status") {
      const statusOrder = ["Backlog", "Completed", "Dropped"];
      games.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    }

    return games;
  }, [backlog, filterStatus, sortStatus, backlogActions.loading, search]);

const { open } = usePanel();
const openSearchPanel = () => {
  console.log(searchbarRef);
  searchbarRef.current?.focus();
  open({
    preset: "custom",
    customPositions: {
      expandedOffset: 1 - SEARCHPANELHEIGHT / screenHeight,
    },
    render: (isExpanded, controls, scrollRef, onScroll) => (
      <AddGame auth={auth} ref={searchbarRef} onScroll={onScroll} />
    ),
    dragEnabled: true,
    height: SEARCHPANELHEIGHT,
    autoExpand: true,
  });
};

const openFilerPanel = (filterStatus: string, sortStatus: string, setFilter: React.Dispatch<React.SetStateAction<string>>, setSort: React.Dispatch<React.SetStateAction<string>>) => {
  open({
    preset: "custom",
    customPositions: {
      expandedOffset: 1 - FILTERPANELHEIGHT / screenHeight, // 800 is the designed height of the filter panel content
    },
    render: (isExpanded, controls, scrollRef, onScroll) => {
        const [FilterStatus, setFilterStatus] = useState<string>(filterStatus);
        const [SortStatus, setSortStatus] = useState<string>(sortStatus);
        
        return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
            <Icon source="filter" size={24} />
            <Text variant="titleMedium" style={{ margin: 15, fontSize: 18, fontWeight: "bold" }}>
              Filter
            </Text>
          </View>
          <ScrollView onScroll={(e) => onScroll = e.nativeEvent.contentOffset.y} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
            <RadioButton.Group
              onValueChange={(value) => setFilterStatus(value)}
              value={FilterStatus}
            >
              <RadioButton.Item label="All" value={"All"} />
              <RadioButton.Item label="Backlog" value="Backlog" />
              <RadioButton.Item label="Playing" value="Playing" />
              <RadioButton.Item label="Completed" value="Completed" />
              <RadioButton.Item label="Dropped" value="Dropped" />
            </RadioButton.Group>
            <List.Accordion title="Sort By" titleStyle={{ fontWeight: "bold", fontSize: 18, }} left={(props) => <List.Icon {...props} icon="sort" />}>
              <List.Item 
                title="Status" 
                onPress={() => setSortStatus("Status")} 
                left={props => <List.Icon {...props} icon="sort-ascending" />} 
                right={props => <RadioButton value={SortStatus} status={SortStatus === "Status" ? "checked" : "unchecked"} />}
              />
              <List.Item 
                title="Alphabetical" 
                onPress={() => setSortStatus("Alphabetical")} 
                left={props => <List.Icon {...props} icon="sort-alphabetical-descending-variant" />} 
                right={props => <RadioButton value={SortStatus} status={SortStatus === "Alphabetical" ? "checked" : "unchecked"} />}
              />
              <List.Item 
                title="Date Added" 
                onPress={() => setSortStatus("Date Added")} 
                left={props => <List.Icon {...props} icon="sort-calendar-ascending" />} 
                right={props => <RadioButton value={SortStatus} status={SortStatus === "Date Added" ? "checked" : "unchecked"} />}
              />
            </List.Accordion>
          </ScrollView>
            <View style={{ position: "absolute", bottom: insets.bottom, width: "100%" }}>
              <Button
                mode="contained"
                onPress={() => {
                  setFilter(FilterStatus);
                  setSort(SortStatus);
                  controls.reset();
                }}
                style={{ margin: 15 }}
              >
                Apply
              </Button>
            </View>
        </View>
      )},
      dragEnabled: true,
      height: FILTERPANELHEIGHT, // 800 is the designed height of the filter panel content
      autoExpand: true,
    });
  };

  const sections = filteredGames.reduce((sections, item) => {
    const status = item.status || "Unknown";
    const section = sections.find(
      (s: { status: string; data: Game[] }) => s.status === status,
    );
    if (section) {
      section.data.push(item);
    } else {
      sections.push({ status, data: [item] });
    }
    return sections;
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title="ARMORY" />
      <View style={styles.pageContent}>
        <Searchbar
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          traileringIcon={"filter-variant"}
          onTraileringIconPress={() => openFilerPanel(filterStatus, sortStatus, setFilterStatus, setSortStatus)}
        />
        <FlatList 
          data={filteredGames}
          keyExtractor={(item) => item.gameId.toString()}
          renderItem={({ item }) => 
            <GameCard type="backlog" game={item?.game} />
          }
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: insets.bottom,
            paddingHorizontal: 15,
          }}
          refreshing={backlogActions.loading}
          onRefresh={backlogActions.reload}
          refreshControl={
            <RefreshControl 
              refreshing={backlogActions.loading}
              onRefresh={backlogActions.reload} 
            />
          }
          extraData={backlog}
        />
        
        {__DEV__ && (
          <Button
            onPress={async () => await AsyncStorage.removeItem("@backlog")}
          >
            Clear
          </Button>
        )}
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
    pageContent: { paddingTop: 10, flex: 1, paddingHorizontal: 5 },
  });
