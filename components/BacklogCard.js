import { View, Image } from "react-native";
import {
  Button,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import React, { useState } from "react";

import { useTheme } from "@react-navigation/native";

const BacklogCard = ({ game }) => {
  const colors = useTheme().colors;
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "column",
        padding: 5,

        minWidth: 340,
        minHeight: 150,
      }}
    >
      <IconButton
        icon={"clock-plus-outline"}
        iconColor={colors.secondaryAccent}
        style={{
          backgroundColor: colors.primary,
          position: "absolute",
          right: 5,
          top: 5,
        }}
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
            style={{ fontStyle: "italic", color: "#9b9b9b" }}
          >
            {game.category}
          </Text>
          <Text
            variant="titleLarge"
            style={{ width: 215, fontWeight: "bold", color: colors.text }}
          >
            {game.name != null ? game.name : "UNKNOWN"}
          </Text>
          <Text variant="bodyLarge" style={{ width: 215, color: colors.text }}>
            {game.genres}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="bodyMedium" style={{ color: colors.text }}>
              {game.dev}
            </Text>
            <Text style={{ margin: 2, color: colors.text }}>•</Text>
            <Text variant="bodyMedium" style={{ color: colors.text }}>
              {game.release_date}
            </Text>
          </View>
          {/* <Button
            mode="contained"
            icon={"star-circle"}
            style={{
              backgroundColor: colors.primary,
              marginVertical: 5,
            }}
          >
            Add to Queue
          </Button> */}
        </View>
      </View>
    </View>
  );
};

export default BacklogCard;
