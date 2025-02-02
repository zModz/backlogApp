import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text } from "react-native-paper";

import useAddToBacklog from "../hooks/useAddToBacklog";
import CheckBacklog from "../hooks/useCheckBacklog";
import useGameDetails from "../hooks/useGameDetails";
import { useAuthContext } from "../hooks/useAuthContext";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

import TextWithIcon from "./TextWithIcon";
import Loading from "./Loading";
import { StatusBar } from "expo-status-bar";

const GameModal = ({ game, auth }) => {
  const [backlogStatus, setBacklogStatus] = useState(false);
  const { addToBacklog, isAdding } = useAddToBacklog();

  const { gameDetails, isLoading } = useGameDetails(game, auth) || {};
  const { user } = useAuthContext();

  const checkIfGameInBacklog = async () => {
    const isInBacklog = await CheckBacklog(user, game.id);
    setBacklogStatus(isInBacklog);
  };

  checkIfGameInBacklog();

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding: 10,
        }}
      >
        <Loading />
      </View>
    );
  }

  if (gameDetails) {
    return (
      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          minHeight: 550,
        }}
      >
        <ImageBackground
          source={{
            uri:
              gameDetails.images.screenshots != undefined
                ? "https:" +
                  gameDetails.images.screenshots[0].url.replace(
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
              backgroundColor: "white",
              borderRadius: 3,
              marginBottom: 15,
              alignSelf: "center",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri:
                  gameDetails.images != undefined
                    ? gameDetails.images.cover
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
                {gameDetails.category !== undefined ? gameDetails.category : ""}
              </Text>
              <Text
                variant="headlineSmall"
                style={{
                  width: 155,
                  fontWeight: "bold",
                  color: theme.colors.text,
                }}
              >
                {gameDetails.name != null ? gameDetails.name : "N/A"}
              </Text>
              <TextWithIcon icon={"puzzle"}>
                {gameDetails.genres !== undefined ? gameDetails.genres : ""}
              </TextWithIcon>
              <TextWithIcon icon={"calendar-clock-outline"}>
                {gameDetails.release_date == undefined
                  ? "N/A"
                  : gameDetails.release_date.length > 1
                  ? gameDetails.release_date[0] + "*"
                  : gameDetails.release_date[0]}
              </TextWithIcon>
              <TextWithIcon icon={"code-not-equal-variant"}>
                {gameDetails.developer !== undefined
                  ? gameDetails.developer[0].name
                  : "N/A"}
              </TextWithIcon>
            </View>
          </View>
          <TouchableWithoutFeedback>
            <ScrollView nestedScrollEnabled={true}>
              <Text
                variant="headlineSmall"
                style={{ fontWeight: "bold", color: theme.colors.text }}
              >
                SUMMARY
              </Text>
              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100 }}>
                <TouchableWithoutFeedback>
                  <Text
                    variant="bodySmall"
                    style={{ textAlign: "justify", color: theme.colors.text }}
                  >
                    {gameDetails.summary}
                  </Text>
                </TouchableWithoutFeedback>
              </ScrollView>
              <Text
                variant="headlineSmall"
                style={{ fontWeight: "bold", color: theme.colors.text }}
              >
                INFO
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
          <Button
            mode="elevated"
            icon={!backlogStatus ? "plus" : "check"}
            loading={isAdding}
            buttonColor={
              !backlogStatus ? theme.colors.primary : theme.colors.accent
            }
            textColor={theme.colors.text}
            style={{
              margin: 15,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onPress={
              !backlogStatus ? () => addToBacklog(gameDetails) : () => {}
            }
          >
            {!backlogStatus ? "Add to Backlog" : "Added to Backlog"}
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 14,
            alignSelf: "center",
            margin: 15,
          }}
        >
          No Info Found!
        </Text>
      </View>
    );
  }
};

export default GameModal;
