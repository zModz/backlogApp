import { Alert } from "react-native";
import React from "react";

const CheckBacklog = async (user, gameId) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_IP}/api/backlog/${user.backlogID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      throw new Error(
        errorResponse.error || "An error occurred while fetching the backlog"
      );
    }

    const data = await response.json();
    const gameInBacklog = data.backlog.find((game) => game.id === gameId); // Find the game in the backlog

    // console.log(gameInBacklog);
    return !!gameInBacklog; // Returns true if the game is found, false otherwise
  } catch (error) {
    Alert.alert("Error", error.message || "Unable to check the backlog");
    return false; // Return false if an error occurs
  }
};

export default CheckBacklog;
