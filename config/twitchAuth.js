import axios from "axios";

export const getAuthTwitch = async () => {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token?client_id=" +
        process.env.EXPO_PUBLIC_CLIENTID +
        "&client_secret=" +
        process.env.EXPO_PUBLIC_SECRETID +
        "&grant_type=client_credentials"
    );
    const data = await response.data;
    console.log("Twitch Auth: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
