import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
} from "react-native";
import { ActivityIndicator, IconButton, TextInput } from "react-native-paper";
import * as EXPO from "expo-status-bar";

import Modal from "react-native-modal";

import SearchCard from "../components/SearchCard";
import GameModal from "../components/Modal";
import { fetchGame } from "../hooks/fetchGame";
import { useNavigation, useTheme } from "@react-navigation/native";

// AddGame component definition
const AddGame = ({ route }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalData, setmodalData] = React.useState([]);
  const { game, isLoading, getGame } = fetchGame();

  const colors = useTheme().colors;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const auth = route.params;

  const navigation = useNavigation();

  // Initialize state for text input and games array
  const [text, setText] = React.useState("");

  // Return the JSX for the AddGame component
  return (
    <View>
      <EXPO.StatusBar style="auto" />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn={"bounceInUp"}
        animationOut={"bounceOutDown"}
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        propagateSwipe={true}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <GameModal game={modalData} auth={auth} />
      </Modal>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          padding: 5,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          backgroundColor: colors.secondary,
          elevation: 5,

          minWidth: 360,
          minHeight: 150,
        }}
      >
        <View
          style={{
            paddingTop: 15,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "stretch",
          }}
        >
          <IconButton
            icon="arrow-left"
            iconColor={colors.text}
            onPress={() => navigation.goBack()}
          />
          <View style={{ flexGrow: 2, height: 40 }}>
            <Text
              style={{
                fontSize: 24,
                alignSelf: "center",
              }}
            >
              Add Game
            </Text>
          </View>
          <View style={{ width: 40 }}></View>
        </View>
        {/* TextInput component for user to enter a game */}
        <TextInput
          mode="outlined"
          label="Pick a Game"
          placeholder="Halo: Combat Evolved"
          value={text}
          onChangeText={(t) => {
            setText(t);
            getGame(text, auth);
          }}
          selectionColor={colors.text}
          cursorColor={colors.text}
          activeOutlineColor={colors.text}
          textColor={colors.text}
          left={<TextInput.Icon icon={"magnify"} />}
          style={{
            backgroundColor: colors.secondary,
            margin: 5,
          }}
        />
      </View>
      <View>
        <SafeAreaView>
          {isLoading ? (
            <View style={{ margin: 10 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: 330,
              }}
            >
              {/* Map through the games array and display each game */}
              {game
                .sort((a, b) => b.rating > a.rating)
                .map((games, i) => (
                  <Pressable
                    key={i}
                    onPress={() => {
                      setmodalData(games);
                      toggleModal();
                    }}
                  >
                    <SearchCard key={i} game={games} />
                  </Pressable>
                ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default AddGame;
