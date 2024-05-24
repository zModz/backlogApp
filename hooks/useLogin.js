import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      process.env.EXPO_PUBLIC_SERVER_IP + "/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    ).catch((error) => {
      Alert.alert("Request Timeout", error.message);
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(json.error || "An error occurred");
    }

    if (res.ok) {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "USER_LOGIN", payload: json });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        // console.error(error);
      }
    }
  };

  return { loading, error, login };
};
