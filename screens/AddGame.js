import React from "react";
import { View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import Modal from "react-native-modal";

import axios from "axios";
import SearchCard from "../components/SearchCard";
import GameModal from "../components/Modal";
import { fetchGame } from "../hooks/fetchGame";
import { useTheme } from "@react-navigation/native";

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

  // Initialize state for text input and games array
  const [text, setText] = React.useState("");

  // Return the JSX for the AddGame component
  return (
    <View>
      <StatusBar style="auto" />
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
          backgroundColor: "#fff",
          padding: 5,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          elevation: 5,
        }}
      >
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
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          activeOutlineColor={colors.accent}
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
                paddingBottom: 140,
              }}
            >
              {/* Map through the games array and display each game's name */}
              {game
                .sort((a, b) => b.rating - a.rating)
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
