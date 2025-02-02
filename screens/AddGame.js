import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { IconButton, SegmentedButtons, TextInput } from "react-native-paper";
import * as EXPO from "expo-status-bar";

import Modal from "react-native-modal";

import SearchCard from "../components/SearchCard";
import GameModal from "../components/GameModal";
import useGame from "../hooks/fetchGame";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";
import Loading from "../components/Loading";

// Define your custom sorting logic
const sortGames = (games, option) => {
  switch (option) {
    case "name":
      return games.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name alphabetically
    case "release_date":
      return games.sort(
        (a, b) => a.release_date.date[0] - b.release_date.date[0]
      ); // Sort by release date
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

  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalData, setmodalData] = React.useState([]);

  // Initialize state for text input and games array
  const [text, setText] = React.useState("");
  const [query, setQuery] = useState([]);
  const [sort, setSort] = useState("name");

  const { isLoading, fetchGameData } = useGame();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = () => {
    if (text != "") {
      const body =
        `fields cover.url, name, release_dates.date, genres.name, category, screenshots.url, status, summary, rating; search "` +
        text +
        `'%"; where version_parent = null & category = (0,1,6,8);limit 10;`;

      fetchGameData(auth, body).then((data) => {
        const sortedData = sortGames(data, sort); // Apply sorting after data is fetched
        setQuery(sortedData); // Update state with the sorted data
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [text, sort]);

  // Return the JSX for the AddGame component
  return (
    <View style={styles.container}>
      <EXPO.StatusBar style={theme.theme === "dark" ? "light" : "dark"} />
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
        statusBarTranslucent={true}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <GameModal game={modalData} auth={auth} />
      </Modal>
      <View style={styles.appHeader}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor={theme.colors.text}
            onPress={() => navigation.goBack()}
          />
          <View style={{ flexGrow: 2, height: 40, justifyContent: "center" }}>
            <Text style={styles.headerText}>Add Game</Text>
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
            }}
            selectionColor={theme.colors.text}
            cursorColor={theme.colors.text}
            activeOutlineColor={theme.colors.text}
            textColor={theme.colors.text}
            left={<TextInput.Icon icon={"magnify"} />}
            style={{
              backgroundColor: theme.colors.surface,
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
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.text,
                style: { backgroundColor: theme.colors.surface },
              },
              {
                icon: "calendar-clock-outline",
                value: "release_date",
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.text,
                style: { backgroundColor: theme.colors.surface },
              },
              {
                icon: "percent",
                value: "rating",
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.text,
                style: { backgroundColor: theme.colors.surface },
              },
            ]}
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
            }}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "none"}
            >
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  paddingBottom: 350,
                }}
                scrollEventThrottle={16} // Smooth scrolling updates
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handleSearch}
                  />
                }
              >
                <View style={{ minHeight: 1 }}>
                  {/* Map through the games array and display each game */}
                  {query?.length > 0 ? (
                    query?.map((g) => (
                      <Pressable
                        key={g.id}
                        onPress={() => {
                          setmodalData(g);
                          toggleModal();
                        }}
                      >
                        <SearchCard key={g.id} game={g} />
                      </Pressable>
                    ))
                  ) : (
                    <></>
                  )}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default AddGame;
