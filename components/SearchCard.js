import { View, Image } from "react-native";
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper";
import React, { useState } from "react";
import axios from "axios";
import modal from "./Modal";
import { useTheme } from "@react-navigation/native";

const SearchCard = ({ game }) => {
  const colors = useTheme().colors;

  var element = [];
  var genres;
  if (game.genres != undefined) {
    for (let i = 0; i < game.genres.length; i++) {
      element.push(game.genres[i].name);
      genres = element.join(", ");
    }
  } else {
    genres = "UNKNOWN";
  }

  var category;
  const catEnum = (id) => {
    switch (id) {
      case 0:
        category = "Game";
        break;
      case 1:
        category = "DLC";
        break;
      case 3:
        category = "Bundle";
        break;
      case 6:
        category = "Episode";
        break;
      case 8:
        category = "Remake";
        break;
      default:
        category = "UNKNOWN";
        break;
    }
  };

  catEnum(game.category);

  var date;
  if (game.release_dates != undefined) {
    let dateTime = game.release_dates[0].date;
    const currentDate = new Date(dateTime * 1000);
    date = currentDate.toLocaleDateString("pt-PT");
  } else {
    date = "UNKNOWN";
  }

  var rate;
  if (game.rating != undefined) {
    if (game.rating > 0 && game.rating <= 25) {
      rate = "Bad";
    } else if (game.rating > 25 && game.rating <= 50) {
      rate = "Unimpressive";
    } else if (game.rating > 50 && game.rating <= 75) {
      rate = "Fair";
    } else if (game.rating > 75) {
      rate = "Good";
    }
  }

  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "column",
        padding: 5,

        minWidth: 340,
        minHeight: 150,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri:
              game.cover != undefined
                ? "https:" + game.cover.url.replace("t_thumb", "t_cover_big")
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
            {category}
          </Text>
          <Text
            variant="titleLarge"
            style={{ width: 215, fontWeight: "bold", color: colors.text }}
          >
            {game.name != null ? game.name : "UNKNOWN"}
          </Text>
          <Text variant="bodyLarge" style={{ width: 215, color: colors.text }}>
            {genres}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="bodyMedium" style={{ color: colors.text }}>
              {date}
            </Text>
            <Text style={{ margin: 2, color: colors.text }}>•</Text>
            <Text
              variant="bodyMedium"
              style={{
                color:
                  rate == "Bad"
                    ? "red"
                    : rate == "Unimpressive"
                    ? "#FFD580"
                    : rate == "Fair"
                    ? "darkgreen"
                    : rate == "Good"
                    ? "green"
                    : "",
              }}
            >
              {rate} ({game.rating != undefined ? game.rating.toFixed() : ""}%)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchCard;
