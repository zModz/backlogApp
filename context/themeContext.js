// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { light, dark } from "../theme/Colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // load the saved theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if(savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        }
      } catch (error) {
        console.log("Failed to load theme from storage:", error);
      }
    };

    loadTheme()
  }, []);

  // Toggle theme and save the new value to AsyncStorage
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? "dark" : "light";
      await AsyncStorage.setItem("theme", newTheme);
      setIsDarkMode(!isDarkMode);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  };

  const theme = isDarkMode ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);