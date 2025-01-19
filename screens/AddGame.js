import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  ActivityIndicator,
  IconButton,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import * as EXPO from "expo-status-bar";

import Modal from "react-native-modal";

import SearchCard from "../components/SearchCard";
import GameModal from "../components/Modal";
import useGame from "../hooks/fetchGame";
import { useNavigation, useTheme } from "@react-navigation/native";
import BacklogCard from "../components/BacklogCard";

// Define your custom sorting logic
const sortGames = (games, option) => {
  switch (option) {
    case "name":
      return games.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name alphabetically
    case "release_date":
      return games.sort((a, b) => a.release_date[0] - b.release_date[0]); // Sort by release date
    case "rating":
      return games.sort((a, b) => b.rating - a.rating); // Sort by rating (highest first)
    default:
      return games;
  }
};

// AddGame component definition
const AddGame = ({ route }) => {
  const auth = route.params;
  const navigation = useNavigation();
  const colors = useTheme().colors;

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalData, setmodalData] = React.useState([]);

  // Initialize state for text input and games array
  const [text, setText] = React.useState("");
  const [query, setQuery] = useState([]);
  const [sort, setSort] = useState("name");

  const scrollViewRef = useRef(null); // Reference for the ScrollView
  const [showButton, setShowButton] = useState(false); // Control visibility of the button

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButton(offsetY > 10); // Show button when scrolled down by 50px
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const { games, isLoading, error, fetchGameData } = useGame();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = () => {
    const body =
      `fields cover.url, name, release_dates.date, genres.name, category, involved_companies.*, screenshots.url, platforms, status, summary, rating; search "` +
      text +
      `'%"; where version_parent = null & category = (0,1,3,6,8);limit 10;`;

    fetchGameData(auth, body).then((data) => {
      const sortedData = sortGames(data, sort); // Apply sorting after data is fetched
      setQuery(sortedData); // Update state with the sorted data
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [text, sort]);

  console.log(
    `Query '${text}': `,
    query.map((g) => g.name)
  );

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

          width: "100%",
          minHeight: 150,
        }}
      >
        <View
          style={{
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "stretch",
            margin: 5,
          }}
        >
          <TextInput
            mode="outlined"
            label="Pick a Game"
            placeholder="Halo: Combat Evolved"
            value={text}
            onChangeText={(t) => {
              setText(t);
              // handleSearch();
            }}
            selectionColor={colors.text}
            cursorColor={colors.text}
            activeOutlineColor={colors.text}
            textColor={colors.text}
            left={<TextInput.Icon icon={"magnify"} />}
            style={{
              backgroundColor: colors.secondary,
              margin: 5,
              flexGrow: 2,
            }}
          />
          {/* <IconButton 
            mode="outlined"
            icon={"sort"}
            size={24}
          /> */}
        </View>
      </View>
      <View>
        <SafeAreaView>
          <SegmentedButtons
            value={sort}
            onValueChange={setSort}
            buttons={[
              {
                icon: "alpha-a-circle-outline",
                value: "name",
                label: "Name",
                checkedColor: colors.primary,
                style: { backgroundColor: colors.secondary },
              },
              {
                icon: "calendar-clock-outline",
                value: "release_date",
                label: "Release Date",
                checkedColor: colors.primary,
                style: { backgroundColor: colors.secondary },
              },
              {
                icon: "percent",
                value: "rating",
                label: "Rating",
                checkedColor: colors.primary,
                style: { backgroundColor: colors.secondary },
              },
            ]}
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
            }}
          />
          {isLoading ? (
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                padding: 10,
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: colors.secondary,
                borderRadius: 25,
                elevation: 5,
              }}
            >
              <ActivityIndicator color={colors.primary} />
              <Text style={{ color: colors.text, marginLeft: 10 }}>
                GLaDOS is looking ...
              </Text>
            </View>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  // paddingTop: 5,
                  // paddingBottom: 5,
                }}
                ref={scrollViewRef}
                onScroll={handleScroll} // Handle scroll event
                scrollEventThrottle={16} // Smooth scrolling updates
                onContentSizeChange={(width, height) => {
                  console.log("Content size:", width, height);
                }}
              >
                <View>
                  {/* Map through the games array and display each game */}
                  {query?.map((g) => (
                    <Pressable
                      key={g.id}
                      onPress={() => {
                        setmodalData(g);
                        // toggleModal();
                      }}
                    >
                      {/* <SearchCard key={g.id} game={g} /> */}
                      <BacklogCard key={g.id} game={g} />
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
              {showButton && (
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={scrollToTop}
                >
                  <Text style={styles.buttonText}>↑</Text>
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AddGame;
