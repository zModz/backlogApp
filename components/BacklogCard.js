import { View, Image } from "react-native";
import { IconButton, Menu, Text, Icon } from "react-native-paper";
import React from "react";

import BaseCard from "./BaseCard";
import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";
import TextWithIcon from "./TextWithIcon";

const BacklogCard = ({ game }) => {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <BaseCard>
      <IconButton
        icon={"clock-plus-outline"}
        iconColor={theme.colors.text}
        style={{
          backgroundColor: theme.colors.primary,
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
            backgroundColor: theme.colors.surface,
            justifyContent: "center",
            borderRadius: 15,
            paddingVertical: 0,
          }}
          anchorPosition="bottom"
          anchor={
            <IconButton
              icon="dots-vertical"
              iconColor={theme.colors.text}
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
            style={styles.cardTitle}
          >
            {game.name != null ? game.name : "UNKNOWN"}
          </Text>
          <TextWithIcon icon={"puzzle"}>
            {game.genres !== undefined ? game.genres : ""}
          </TextWithIcon>
          <TextWithIcon icon={"calendar-clock-outline"}>
            {game.release_date == undefined ? "N/A" : game.release_date}
          </TextWithIcon>
          <TextWithIcon icon={"code-not-equal-variant"}>
            {game.dev}
          </TextWithIcon>
        </View>
      </View>
    </BaseCard>
  );
};

export default BacklogCard;
