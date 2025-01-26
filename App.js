//#region Imports
// React
import "react-native-gesture-handler";
import * as React from "react";
import { useColorScheme } from "react-native";

// Custom Packages
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, Portal } from "react-native-paper";


// Custom Screens
import AddGame from "./screens/AddGame";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Notifications from "./screens/Notifications";

// Components
import DrawerMenu from "./components/DrawerComponent";

// Context
import { AuthContextProvider } from "./context/authContext";
import { BacklogCTXProvider } from "./context/backlogContext";
import { ThemeProvider } from "./context/themeContext"

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
//#endregion

const Stack = createStackNavigator();

const Main = React.memo(() => {
  console.log("Main");
  const { user, loading, auth } = useAuthContext();
  const { logout } = useLogout();

  // TODO: Verify is token is expired
  // console.log(user);

  console.log("User: ", user);

  return (
    <PaperProvider>
      <Portal>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                <Stack.Screen
                  name="Main"
                  component={DrawerMenu}
                  options={{ headerShown: false }}
                />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="AddGame"
                    component={AddGame}
                    options={{ title: "Add Game", headerShown: false }}
                    initialParams={auth}
                  />
                  <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{ headerShown: false }}
                  />
                </Stack.Group>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Portal>
    </PaperProvider>
  );
});

// This is the default export of a React functional component named "App"
export default function App() {
  // The App component returns a JSX structure that includes:
  // 1. PaperProvider: A component from the "react-native-paper" library that provides a consistent theme and styling for all the paper components in the app.
  // 2. NavigationContainer: A component from the "react-navigation" library that manages the navigation state and provides a way to navigate between different screens.
  // 3. Stack.Navigator: A component from the "react-navigation" library that defines a stack of screens that can be navigated to.
  // 4. Stack.Screen: A component from the "react-navigation" library that defines a single screen in the stack. The screen's name is "Main" and its component is "DrawerMenu".
  return (
    <AuthContextProvider>
      <BacklogCTXProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </BacklogCTXProvider>
    </AuthContextProvider>
  );
}
