import { fetchGames } from "@/api/igdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GameCard from "./GameCard";

const GameList = ({ search, token }) => {
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
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length * 10,
    enabled: !!token && !!search,
    initialPageParam: 0,
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

  const games = data?.pages?.flat() ?? [];

  const renderItem = ({ item }) => <GameCard type="search" game={item} />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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
