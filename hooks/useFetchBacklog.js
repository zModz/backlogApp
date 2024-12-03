import { Alert } from "react-native";
import { useState } from "react";

import { useBacklogContext } from "../hooks/useBacklogContext";

export const useFetchBacklog = () => {
  // Get the backlog data and user info from contexts
  const { dispatch } = useBacklogContext();
  const [refreshing, setRefreshing] = useState(true);
  const [backlog, setBacklog] = useState([]);

  const [error, setError] = useState(null);

  const fetchBacklog = async (user) => {
    const res = await fetch(
      process.env.EXPO_PUBLIC_SERVER_IP + "/api/backlog/" + user.backlogID,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    ).catch((error) => {
      Alert.alert("Network Error", error.message);
    });

    if (!res.ok) {
      setLoading(false);
      setError(json.error || "An error occurred");
    }

    const json = await res.json();

    if (res.ok) {
      try {
        dispatch({ type: "SET_BACKLOG", payload: json });
        setBacklog(json.backlog);
      } catch (error) {
        setError(error.message);
      }
    }

    setRefreshing(false);
  };

  return { fetchBacklog, backlog, refreshing, error };
};
