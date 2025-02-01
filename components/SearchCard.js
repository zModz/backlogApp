import { View, Image } from "react-native";
import {
  IconButton,
  Text,
} from "react-native-paper";
import React, { useState } from "react";

import BaseCard from "./BaseCard";
import CheckBacklog from "../hooks/checkBacklog";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";
import TextWithIcon from "./TextWithIcon";

const SearchCard = ({ game }) => {
  const { user } = useAuthContext();
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const checkIfGameInBacklog = async () => {
    const isInBacklog = await CheckBacklog(user, game.id);
    console.log(
      isInBacklog
        ? `Game ${game.name} is in backlog`
        : `Game ${game.name} is not in backlog`
    );
  };

  checkIfGameInBacklog();

  return (
    <BaseCard>
      {game.id != null && (
        <IconButton
          icon={"plus"}
          iconColor={theme.colors.text}
          size={21}
          style={{
            backgroundColor: theme.colors.primary,
            position: "absolute",
            right: 2,
            top: 2,
          }}
          onPress={() => {}}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri:
              game.images != undefined
                ? game.images.cover
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png",
          }}
          width={120}
          height={150}
          style={{ borderRadius: 10, margin: 5 }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{ fontStyle: "italic", color: "#9b9b9b" }}
          >
            {game.category !== undefined ? game.category : ""}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              width: 130,
              maxHeight: 55,
              fontWeight: "bold",
              color: theme.colors.text,
              overflow: "visible",
            }}
          >
            {game.name != null ? game.name : "UNKNOWN"}
          </Text>
          <TextWithIcon icon={"puzzle"}>
            {game.genres !== undefined ? game.genres : ""}
          </TextWithIcon>
          <TextWithIcon icon={"calendar-clock-outline"}>
            {game.release_date == undefined
              ? "N/A"
              : game.release_date.length > 1
              ? game.release_date[0] + "*"
              : game.release_date[0]}
          </TextWithIcon>
        </View>
      </View>
    </BaseCard>
  );
};

export default SearchCard;
