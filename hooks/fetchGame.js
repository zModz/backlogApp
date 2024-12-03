import { useState } from "react";
import { Alert } from "react-native";

export const fetchGame = () => {
  const [timer, setTimer] = useState(null);
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDev = async (d, a) => {
    const res = await fetch("https://api.igdb.com/v4/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
        Authorization: a.token_type + " " + a.access_token,
      },
      body: "fields id,name; where id=" + d + ";limit 10;",
    }).catch((err) => {
      Alert.alert("An Error Occured", err.message);
    }); // Log any errors

    const json = await res.json();

    if (res.ok) {
      return json;
    }
  };

  const getPlat = async (p, a) => {
    const res = await fetch("https://api.igdb.com/v4/platforms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
        Authorization: a.token_type + " " + a.access_token,
      },
      body: "fields id,name; where id=" + p + ";limit 10;",
    }).catch((err) => {
      Alert.alert("An Error Occured", err.message);
    }); // Log any errors

    const json = await res.json();

    if (res.ok) {
      return json;
    }
  };

  const getGame = async (t, a) => {
    const res = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.EXPO_PUBLIC_CLIENTID,
        Authorization: a.token_type + " " + a.access_token,
      },
      body:
        'fields cover.url, name, release_dates.date, genres.name, category, involved_companies.*, screenshots.url, platforms, status, summary, rating; search "' +
        t +
        '%"; where version_parent = null & category = (0,1,3,6,8);',
    }).catch((err) => {
      Alert.alert("An Error Occured", err.message);
    }); // Log any errors

    const json = await res.json();

    if (res.ok) {
      return json;
    }
  };

  const returnGame = async (t, a) => {
    setIsLoading(true);

    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      let g = await getGame(t, a);

      for (let i = 0; i < g.length; i++) {
        if (g[i].involved_companies != undefined) {
          for (let j = 0; j < g[i].involved_companies.length; j++) {
            if (g[i].involved_companies[j].developer == true) {
              var dev = g[i].involved_companies[j].company;

              g[i].involved_companies = await getDev(dev, a);
            }
          }
        } else {
          g[i].involved_companies = "Unknown";
        }

        if (g[i].platforms != undefined) {
          g[i].platforms.forEach(async (element, index, arr) => {
            arr[index] = await getPlat(element, a);
          });
        }
      }

      setGame(g);
    }, 10);

    setTimer(newTimer);

    setIsLoading(false);
  };

  return { game, isLoading, returnGame };
};
