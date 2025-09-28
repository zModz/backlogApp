import { useAuth } from "@/contexts/AuthContext";
import { useBacklogWithGames } from "@/hook/useBacklogWithGames";
import { Game } from "@/mockdata";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { BacklogBtns } from "./BacklogBtns";

type gameCard = {
  type: string;
  game: Game;
};

const GameCard = ({ type, game }: gameCard) => {
  const { auth } = useAuth();
  const { backlogActions } = useBacklogWithGames(auth);

  return (
    <Surface elevation={1} style={styles.backlogCard}>
      {game === null && <Text>Loading game...</Text>}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexGrow: 0.5,
            }}
          >
            <Image
              source={{ uri: "https://" + game?.coverUrl }}
              style={{
                borderRadius: 10,
                width: "100%",
                height: 90,
              }}
              contentFit="cover"
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              variant="labelMedium"
              style={{ fontWeight: 100, fontStyle: "italic" }}
            >
              {game?.gameType}
            </Text>
            <Text
              variant="labelLarge"
              style={{
                fontWeight: "800",
              }}
            >
              {game?.name}
            </Text>
            {/* <Text variant="labelMedium">{game.genres}</Text> */}
            <Text variant="labelMedium">{game?.firstReleaseDate}</Text>
          </View>
        </View>
        <View>
          <BacklogBtns
            game={game}
            type={type}
            backlogActions={backlogActions}
          />
        </View>
      </View>
    </Surface>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  backlogCard: {
    borderLeftWidth: 3,
    borderLeftColor: "#D0343C", // turn this dynamic
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,

    // minWidth: "90%",
    height: 100,
  },
});
