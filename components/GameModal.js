import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";

import axios from "axios";

import AddToBacklog from "./AddToBacklog";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBacklogContext } from "../hooks/useBacklogContext";
import TextWithIcon from "./TextWithIcon";

const GameModal = ({ game, auth }) => {
  const [dev, setDev] = useState("");

  const { user } = useAuthContext();
  const { dispatch } = useBacklogContext();

  // const addBacklogClick = async () => {
  //   if (!user) return;

  //   const res = await fetch(
  //     process.env.EXPO_PUBLIC_SERVER_IP + "/api/backlog/" + user.backlogID,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         id: game.id,
  //         name: game.name,
  //         dev: dev[0].name,
  //         genres: genres,
  //         category: category,
  //         release_date: date,
  //         images: {
  //           cover: "https:" + game.cover.url.replace("t_thumb", "t_cover_big"),
  //           screenshots: game.screenshots,
  //         },
  //       }),
  //     }
  //   );

  //   const json = await res.json();
  //   console.log(json);

  //   if (res.ok) {
  //     dispatch({ type: "ADD_BACKLOG", payload: json });
  //     Alert.alert("Game Added!", "Have fun gaming!");
  //   }
  // };

  // console.log(dev[0])

  if (game != undefined) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          minHeight: 550,
        }}
      >
        <ImageBackground
          source={{
            uri:
              game.images.screenshots != undefined
                ? "https:" +
                  game.images.screenshots[0].url.replace(
                    "t_thumb",
                    "t_original"
                  )
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png",
          }}
          // height={200}
          style={{
            height: 200,
          }}
          imageStyle={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />
        </ImageBackground>

        <View
          style={{
            flex: 1,
            position: "absolute",
            paddingTop: 12,
            paddingHorizontal: 12,
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              width: 60,
              height: 5,
              backgroundColor: "#fff",
              borderRadius: 3,
              marginBottom: 15,
              alignSelf: "center",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri:
                  game.images != undefined
                    ? game.images.cover
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png",
              }}
              width={150}
              height={190}
              style={{
                borderRadius: 10,
                margin: 5,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                margin: 5,
                padding: 5,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{ fontStyle: "italic", color: "#9b9b9b" }}
              >
                {game.category !== undefined ? game.category : ""}
              </Text>
              <Text
                variant="headlineSmall"
                style={{ width: 155, fontWeight: "bold", color: "white" }}
              >
                {game.name != null ? game.name : "N/A"}
              </Text>
              {/* <Text
                variant="titleMedium"
                style={{ width: 215, color: "white" }}
              >
                {game.involved_companies[0]
                  ? game.involved_companies[0].name
                  : "N/A"}
              </Text> */}
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
          <TouchableWithoutFeedback>
            <ScrollView nestedScrollEnabled={true}>
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                SUMMARY
              </Text>
              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100 }}>
                <TouchableWithoutFeedback>
                  <Text variant="bodySmall" style={{ textAlign: "justify" }}>
                    {game.summary}
                  </Text>
                </TouchableWithoutFeedback>
              </ScrollView>
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                INFO
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
          <Button
            mode="elevated"
            style={{
              margin: 15,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onPress={() => addBacklogClick()}
          >
            Add to Backlog
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding: 10,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
};

export default GameModal;
