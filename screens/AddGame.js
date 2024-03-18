import React from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    SafeAreaView,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button, List, TextInput } from "react-native-paper";

import Modal from "react-native-modal";

import axios from "axios";
import SearchCard from "../components/SearchCard";
import GameModal from "../components/Modal";
import { StatusBar } from "expo-status-bar";

// AddGame component definition
const AddGame = ({ route }) => {
    const [isModalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [modalData, setmodalData] = React.useState([]);

    const auth = route.params;

    // Initialize state for text input and games array
    const [text, setText] = React.useState("");
    const [timer, setTimer] = React.useState(null);
    const [games, setGames] = React.useState([]);
    const [gameDev, setGameDev] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // getGame function definition
    const getGame = async (t) => {

        // set up request parameters if user input is null
        let body =
            "fields cover.url,name,release_dates.date,genres.name,category;where version_parent = null & category = (0,3,6,8); limit 10;";

        // Update the text state with the user's input
        setText(t);

        if (t != "") {
            // show loading spinner while fetching game info
            setIsLoading(true);

            // set up request parameters if user input is not null
            body =
                'fields cover.url,name,release_dates.date,genres.name,category,involved_companies.*,screenshots.url,platforms,summary,status,rating;search "' +
                text +
                '";where rating != null & version_parent = null & category = (0,1,3,6,8);';
        }

        clearTimeout(timer);

        const newTimer = setTimeout(async () => {
            // Make a POST request to the IGDB API to search for games
            await axios
                .post("https://api.igdb.com/v4/games", body, {
                    // Set the required headers for the API request
                    headers: {
                        "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
                        Authorization: auth.token_type + " " + auth.access_token,
                    },
                })
                .then((res) => {
                    setGames(res.data);
                }) // Set the games state with the response data
                .catch((err) => console.error(err)) // Log any errors
                .finally(() => {
                    setIsLoading(false);
                }); // Hide loading spinner when finished searching
        }, 500);
        
        setTimer(newTimer);
    };

    // console.log(gameDev[0])

    // for (let i = 0; i < games.length; i++) {
    //     console.log('game: ', games[i])
    // }

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
                    onChangeText={getGame}
                />
            </View>
            <View>
                <SafeAreaView>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <ScrollView
                            contentContainerStyle={{
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingBottom: 140,
                            }}
                        >
                            {/* Map through the games array and display each game's name */}
                            {games
                                .sort((a, b) => b.rating - a.rating)
                                .map((game, i) => (
                                    <Pressable
                                        key={i}
                                        onPress={() => {
                                            setmodalData(game);
                                            toggleModal();
                                        }}
                                    >
                                        <SearchCard key={i} game={game} />
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
