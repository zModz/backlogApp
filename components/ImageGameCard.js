import { View, ImageBackground } from "react-native";
import React from "react";

const ImageGameCard = ({ game }) => {
  return (
    <View
      style={{
        width: 120,
        height: 200,
        backgroundColor: "white",
        borderRadius: 15,
        margin: 5,
        flexGrow: 1,
      }}
    >
      <ImageBackground
        source={{
          uri:
            game.images != undefined
              ? game.images.cover
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png",
        }}
        imageStyle={{ borderRadius: 15 }}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      ></ImageBackground>
    </View>
  );
};

export default ImageGameCard;
