import { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuthTwitch } from "../config/twitchAuth";
import { ActivityIndicator } from "react-native-paper";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { user: action.payload };
    case "USER_LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [auth, setAuth] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);

        // Fetch user from AsyncStorage
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          dispatch({ type: "USER_LOGIN", payload: JSON.parse(storedUser) });
        }

        // Fetch auth details from getAuthTwitch
        const authResponse = await getAuthTwitch();
        setAuth(authResponse);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  console.log("AuthContext state: ", state);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
