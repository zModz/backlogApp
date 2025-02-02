import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuthContext } from "./useAuthContext";
import { useBacklogContext } from "./useBacklogContext";

const useAddToBacklog = () => {
  const { backlogs, dispatch } = useBacklogContext();
  const { user } = useAuthContext();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const addToBacklog = async (gameDetails) => {
    if (!user) {
      Alert.alert(
        "Not Authorized",
        "Please log in to add games to your backlog."
      );
      return;
    }

    // if (!backlogs || !backlogs._id) {
    //   Alert.alert("Error", "Backlog data is missing.");
    //   return;
    // }

    setIsAdding(true);
    setError(null);

    try {
      const backlogGame = {
        ...gameDetails,
        addedAt: Date.now(),
        completedAt: 0,
      };

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/api/backlog/${user.backlogID}`,
        {
          method: "PATCH",
          body: JSON.stringify(backlogGame),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "ADD_BACKLOG", payload: json });
        Alert.alert("Game Added to Backlog!", "Happy Gaming 🎮");
      } else {
        throw new Error(json.message || "Failed to add game to backlog.");
      }
    } catch (error) {
      console.error("Error adding game to backlog:", error);
      setError(error.message);
      Alert.alert("Error", "Could not add game to backlog.");
    } finally {
      setIsAdding(false);
    }
  };

  return { addToBacklog, isAdding, error };
};

export default useAddToBacklog;
