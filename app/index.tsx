import AddGame from "@/components/AddGame";
import AppBar from "@/components/AppBar";
import FloatingPanel from "@/components/FloatingPanel";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/contexts/AuthContext";
import { useBacklogWithGames } from "@/hook/useBacklogWithGames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Button, FAB, MD3Theme, Searchbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const searchbarRef = useRef<any>(null);

const screenHeight = Dimensions.get("screen").height;

export default function Index() {
  const { auth } = useAuth();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const { backlog, backlogActions, isLoading } = useBacklogWithGames(auth);
  // const { backlog, loading, reload } = useBacklog();

  // console.log("backlog: ", backlog[0].game);

  // Floating Panel
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [panelTranslateY, setpanelTranslateY] = useState<Animated.Value | null>(
    null
  );
  const panelControlsRef = useRef<{ reset: () => void; expand: () => void }>();

  const fabOpacity = panelTranslateY
    ? panelTranslateY.interpolate({
        inputRange: [insets.top, 999],
        outputRange: [0, 1], // 0 when expanded, 1 when collapsed
        extrapolate: "clamp",
      })
    : 1;

  // Filter games only when backlog is loaded and not empty
  const filteredGames = Array.isArray(backlog)
    ? backlog.filter((item) =>
        item?.game?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title="ARMORY" />
      <View style={styles.pageContent}>
        <Searchbar
          elevation={1}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={{ marginHorizontal: 10 }}
          // traileringIcon={"filter-variant"}
          // onTraileringIconPress={() => {}}
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
            // <Text>{item.gameId}</Text>
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
      <FloatingPanel
        collapsedY={screenHeight}
        expandedY={insets.top}
        onCollapse={() => {
          setPanelExpanded(false);
          backlogActions.reload();
          Keyboard.dismiss();
        }}
        onExpand={() => {
          setPanelExpanded(true);
          searchbarRef.current?.focus();
        }}
        onTranslateYChange={setpanelTranslateY}
      >
        {(isExpanded, controls) => {
          panelControlsRef.current = controls;
          return <AddGame auth={auth} ref={searchbarRef} />;
        }}
      </FloatingPanel>
      {panelTranslateY && (
        <Animated.View
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: insets.bottom,
            zIndex: 999,
            opacity: fabOpacity,
            flexDirection: "column-reverse",
            alignItems: "center",
          }}
          pointerEvents={panelExpanded ? "none" : "auto"}
        >
          <FAB
            icon={"plus"}
            onPress={() => {
              panelControlsRef.current?.expand(); // expand panel
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    pageContent: { paddingTop: 15 },
  });
