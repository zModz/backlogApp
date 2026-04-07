import { fetchGames } from "@/api/igdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GameCard from "./GameCard";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import { Game } from "@/mockdata";

const AnimFlatlist = Animated.createAnimatedComponent(FlatList) as typeof FlatList;

const GameList = ({ search, token, onScroll }) => {
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchGames", { search, token }],
    queryFn: fetchGames,
    getNextPageParam: (lastPage) =>
      lastPage.results.length < 10 ? undefined : lastPage.nextCursor,
    enabled: !!token && !!search,
    initialPageParam: 0,
  });

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      onScroll.value = event.contentOffset.y;
    },
  });

  if (isLoading && !token) {
    return (
      <View>
        <ActivityIndicator size="large" style={styles.center} color={"#fff"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // console.log(data);
  const games = data?.pages?.flatMap((page) => page.results) ?? [];
  console.log("Fetched games:", games[0]);

  return (
    <AnimFlatlist<Game>
      data={games}
      onScroll={handleScroll}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: { item: Game }) => <GameCard type="search" game={item} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator size="small" style={{ margin: 20 }} />
        ) : null
      }
      style={{
        marginTop: 5,
      }}
      contentContainerStyle={{
        paddingTop: 5,
        paddingBottom: insets.bottom + insets.top + 300,
        paddingHorizontal: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: "#555",
  },
});

export default GameList;
