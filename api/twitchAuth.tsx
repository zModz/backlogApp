export const getAuthTwitch = async () => {
  try {
    const response = await fetch(
      "https://id.twitch.tv/oauth2/token?client_id=" +
        process.env.EXPO_PUBLIC_CLIENTID +
        "&client_secret=" +
        process.env.EXPO_PUBLIC_SECRETID +
        "&grant_type=client_credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
