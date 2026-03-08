import AddGame from "@/components/AddGame";
import AppBar from "@/components/AppBar";
import FloatingPanel from "@/components/FloatingPanel";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/contexts/AuthContext";
import { useBacklogWithGames } from "@/hook/useBacklogWithGames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
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
import { interpolate, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height;

export default function Index() {
  const { auth } = useAuth();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const { backlog, backlogActions, isLoading } = useBacklogWithGames(auth);
  // const { backlog, loading, reload } = useBacklog();

  // Floating Panel
  const [panelExpanded, setPanelExpanded] = useState(false);
  const panelTranslateY = useSharedValue(screenHeight);

  const panelControlsRef = useRef<{ reset: () => void; expand: () => void }>();
  const searchbarRef = useRef<any>(null);

 const fabOpacity = useDerivedValue(() => {
    return interpolate(
      panelTranslateY.value,
      [screenHeight, insets.top],
      [1, 0],
      "clamp"
    );
  });

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
        height={screenHeight}
        translateY={panelTranslateY}
        damping={70}
        stiffness={555}
      >
        {(isExpanded, controls, onScroll) => {
          panelControlsRef.current = controls;
          return <AddGame auth={auth} ref={searchbarRef} onScroll={onScroll} />;
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
            opacity: fabOpacity.value,
            flexDirection: "column-reverse",
            alignItems: "center",
          }}
          pointerEvents={panelExpanded ? "none" : "auto"}
        >
          <FAB
            icon={"plus"}
            onPress={() => {
              panelControlsRef.current?.expand(); // expand panel
              searchbarRef.current?.focus();
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
