import { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { getAuthTwitch } from "../config/twitchAuth";

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
    let logoutTimer;

    const initializeAuth = async () => {
      try {
        setLoading(true);

        // Fetch user from AsyncStorage
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);

          // Decode token to check expiration
          if (userData.token) {
            const decodedToken = jwtDecode(userData.token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
              // Token expired, log the user out
              dispatch({ type: "USER_LOGOUT" });
              await AsyncStorage.removeItem("user");
            } else {
              // Set logout timer
              const timeUntilExpiration =
                (decodedToken.exp - currentTime) * 1000;
              logoutTimer = setTimeout(
                () => handleLogout(),
                timeUntilExpiration
              );

              dispatch({ type: "USER_LOGIN", payload: userData });
            }
          }
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

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  const handleLogout = async () => {
    dispatch({ type: "USER_LOGOUT" });
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
