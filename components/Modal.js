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
import { ActivityIndicator, Button, Text } from "react-native-paper";

import axios from "axios";

import AddToBacklog from "./AddToBacklog";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBacklogContext } from "../hooks/useBacklogContext";

const GameModal = ({ game, auth }) => {
  const [dev, setDev] = useState("");

  const { user } = useAuthContext();
  const { dispatch } = useBacklogContext();

  var genres;
  if (game.genres != undefined) {
    for (let i = 0; i < game.genres.length; i++) {
      var element = [];
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

  var status;
  const statusEnum = (id) => {
    switch (id) {
      case 0:
        status = "Released";
        break;
      case 2:
        status = "Alpha";
        break;
      case 3:
        status = "Beta";
        break;
      case 4:
        status = "Early Access";
        break;
      case 5:
        status = "Offline";
        break;
      case 6:
        status = "Cancelled";
        break;
      case 6:
        status = "Rumored";
        break;
      case 7:
        status = "Delisted";
        break;
      default:
        status = "UNKNOWN";
        break;
    }
  };

  statusEnum(game.category);

  var date;
  if (game.release_dates != undefined) {
    let dateTime = game.release_dates[0].date;
    const currentDate = new Date(dateTime * 1000);
    date = currentDate.toLocaleDateString("pt-PT");
  } else {
    date = "UNKNOWN";
  }

  useEffect(() => {
    const getDev = async () => {
      if (game.involved_companies != undefined) {
        for (let j = 0; j < game.involved_companies.length; j++) {
          if (game.involved_companies[j].developer == true) {
            var dev = game.involved_companies[j].company;
            await axios
              .post(
                "https://api.igdb.com/v4/companies",
                "fields id,name; where id=" + dev + ";limit 10;",
                {
                  headers: {
                    "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
                    Authorization: auth.token_type + " " + auth.access_token,
                  },
                }
              )
              .then((res) => setDev(res.data))
              .catch((err) => console.error(err));
          }
        }
      }
    };

    getDev();
  }, []);

  const addBacklogClick = async () => {
    if (!user) return;

    const res = await fetch(
      "http://192.168.1.62:3000/api/backlog/" + user.backlogID,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: game.id,
          name: game.name,
          dev: dev[0].name,
          genres: genres,
          category: category,
          status: status,
          release_date: date,
          images: {
            cover: "https:" + game.cover.url.replace("t_thumb", "t_cover_big"),
            screenshots: game.screenshots,
          },
        }),
      }
    );

    const json = await res.json();
    console.log(json);

    if (res.ok) {
      dispatch({ type: "ADD_BACKLOG", payload: json });
      Alert.alert("Game Added!", "Have fun gaming!");
    }
  };

  // console.log(dev[0])

  if (game != undefined && dev[0] != undefined) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          minHeight: 550,
          paddingBottom: 20,
        }}
      >
        <ImageBackground
          source={{
            uri:
              game.screenshots != undefined
                ? "https:" +
                  game.screenshots[0].url.replace("t_thumb", "t_original")
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
          blurRadius={5}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
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
                  game.cover != undefined
                    ? "https:" +
                      game.cover.url.replace("t_thumb", "t_cover_big")
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png",
              }}
              width={150}
              height={190}
              style={{
                borderRadius: 10,
                margin: 5,
                borderWidth: 2,
                borderColor: "black",
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
                {category}
              </Text>
              <Text
                variant="headlineSmall"
                style={{ width: 215, fontWeight: "bold", color: "white" }}
              >
                {game.name != null ? game.name : "UNKNOWN"}
              </Text>
              <Text
                variant="titleMedium"
                style={{ width: 215, color: "white" }}
              >
                {dev[0] ? dev[0].name : "UNKNOWN"}
              </Text>
              <Text variant="bodyLarge" style={{ width: 215, color: "white" }}>
                {genres}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* <Text variant='bodyMedium' style={{ color: 'white' }}>{category}</Text>
                                <Text style={{ margin: 2, color: 'white' }}>•</Text> */}
                <Text variant="bodyMedium" style={{ color: "white" }}>
                  {date} ({status})
                </Text>
              </View>
            </View>
          </View>
          <View>
            <ScrollView>
              <TouchableOpacity>
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  SUMMARY
                </Text>
                <Text variant="bodySmall" style={{ textAlign: "justify" }}>
                  {game.summary}
                </Text>
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  INFO
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
          margin: 10,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
};

export default GameModal;
