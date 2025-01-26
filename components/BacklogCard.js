import { View, Image } from "react-native";
import { IconButton, Menu, Text, Icon } from "react-native-paper";
import React from "react";
import Styles from "../Styles";

import { useTheme } from "@react-navigation/native";
import CheckBacklog from "../hooks/checkBacklog";
import { useAuthContext } from "../hooks/useAuthContext";
import BaseCard from "./BaseCard";

const BacklogCard = ({ game }) => {
  const { user } = useAuthContext();
  const colors = useTheme().colors;
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
      <IconButton
        icon={"clock-plus-outline"}
        iconColor={colors.secondaryAccent}
        style={{
          backgroundColor: colors.primary,
          position: "absolute",
          right: 2,
          top: 2,
        }}
        size={14}
        onPress={() => {}}
      />
      <View style={{ zIndex: 100, position: "absolute", right: 0, bottom: 0 }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          contentStyle={{
            backgroundColor: colors.secondary,
            justifyContent: "center",
            borderRadius: 15,
            paddingVertical: 0,
          }}
          anchorPosition="bottom"
          anchor={
            <IconButton
              icon="dots-vertical"
              iconColor={colors.text}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            leadingIcon={"clock-plus-outline"}
            onPress={() => {}}
            title="Add to Queue"
          />
          <Menu.Item
            leadingIcon={"close-circle"}
            onPress={() => {}}
            title="Drop"
          />
        </Menu>
      </View>
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
            style={{
              fontSize: 12,
              fontStyle: "italic",
              color: "#9b9b9b",
            }}
          >
            {game.category !== undefined ? game.category : ""}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontSize: 14,
              maxWidth: "65%",
              height: "auto",
              fontWeight: "bold",
              color: colors.text,
              lineHeight: 20,
              textAlignVertical: "center",
            }}
          >
            {game.name != null ? game.name : "UNKNOWN"}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontSize: 12, width: 215, color: colors.text }}
          >
            <Icon source={"puzzle"} />
            {game.genres !== undefined ? game.genres : ""}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ fontSize: 12, color: colors.text }}
          >
            <Icon source={"calendar-clock-outline"} />
            {game.release_date == undefined
              ? "N/A"
              : game.release_date.length > 1
              ? game.release_date[0] + "*"
              : game.release_date[0]}
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              fontSize: 12,
              color: colors.text,
              maxWidth: "65%",
            }}
          >
            <Icon source={"code-not-equal-variant"} />
            {game.developer[0].name}
          </Text>
        </View>
      </View>
    </BaseCard>
  );
};

export default BacklogCard;
