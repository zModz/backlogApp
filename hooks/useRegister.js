import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      process.env.EXPO_PUBLIC_SERVER_IP + "/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(json.error || "An error occurred");
    }

    if (res.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "USER_LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { register, error, isLoading };
};
