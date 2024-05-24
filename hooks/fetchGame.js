import { useState } from "react";
import { Alert } from "react-native";

export const fetchGame = () => {
  const [timer, setTimer] = useState(null);
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGame = async (t, a) => {
    setIsLoading(true);

    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      const res = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
          Authorization: a.token_type + " " + a.access_token,
        },
        body:
          'fields cover.url, name, release_dates.date, genres.name, category, involved_companies.*, screenshots.url, platforms, summary, status, rating; search "' +
          t +
          '%";where rating != null & version_parent = null & category = (0,1,3,6,8);',
      })
        .catch((err) => {
          Alert.alert("An Error Occured", err.message);
        }) // Log any errors
        .finally(() => {
          setIsLoading(false);
        });

      const json = await res.json();

      if (res.ok) {
        setGame(json);
      }
    }, 500);

    setTimer(newTimer);
  };

  return { game, isLoading, getGame };
};
