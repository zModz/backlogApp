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

    const res = await fetch("http://192.168.1.62:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).catch((error) => {
      Alert.alert("Request Timeout", error);
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
      }
    }
  };

  return { loading, error, login };
};
