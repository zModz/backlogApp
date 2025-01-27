// React
import "react-native-gesture-handler";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Components
import { Button, TextInput } from "react-native-paper";
import { useLogin } from "../hooks/useLogin";

import { useTheme } from "../context/themeContext";
import { createStyles } from "../Styles";

const Login = ({ navigation }) => {
  // theme
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useLogin();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <StatusBar style={theme.theme === "dark" ? "light" : "dark"} />

        <KeyboardAvoidingView behavior={Platform.ios ? "padding" : "none"}>
          <View
            style={{
              flexShrink: 2,
              minWidth: 320,
              minHeight: 460,
              maxHeight: 500,
              backgroundColor: theme.colors.surface,
              borderRadius: 15,
              padding: 5,
              justifyContent: "center",
              flexDirection: "column",
              elevation: 5,
            }}
          >
            <Image
              source={require("../assets/ARMORY2_ico.png")}
              style={{
                height: 145,
                width: 140,
                alignSelf: "center",
                margin: 15,
              }}
            />
            {error && (
              <View
                style={{
                  padding: 10,
                  backgroundColor: "#ffefef",
                  borderRadius: 4,
                  borderStyle: "solid",
                  borderColor: "#e7195a",
                  borderWidth: 1,
                  margin: 10,
                }}
              >
                <Text style={{ color: "#e7195a" }}>{error}</Text>
              </View>
            )}
            <TextInput
              mode="outlined"
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              textColor={theme.colors.text}
              activeOutlineColor={theme.colors.text}
              style={{
                backgroundColor: theme.colors.surface,
                margin: 5,
              }}
              error={error}
            />
            <TextInput
              mode="outlined"
              label="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              textColor={theme.colors.text}
              activeOutlineColor={theme.colors.text}
              secureTextEntry={!showPassword}
              style={{
                backgroundColor: theme.colors.surface,
                margin: 5,
              }}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              error={error}
            />
            <Button
              mode="contained"
              icon="login"
              loading={loading}
              disabled={loading}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.text}
              onPress={() => handleSubmit()}
              style={{ margin: 5 }}
            >
              Login
            </Button>
            <Button
              mode="outlined"
              icon={"account-plus"}
              textColor={theme.colors.primary}
              style={{ margin: 5, borderColor: theme.colors.primary }}
              onPress={() => navigation.navigate("Register")}
            >
              Create an Account
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
