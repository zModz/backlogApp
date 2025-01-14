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
import { useTheme } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useLogin();

  const handleSubmit = async () => {
    await login(email, password);
  };

  const colors = useTheme().colors;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <StatusBar style="auto" />

        <KeyboardAvoidingView behavior={Platform.ios ? "padding" : "height"}>
          <View
            style={{
              elevation: 5,
              minWidth: 320,
              maxHeight: 450,
              backgroundColor: colors.secondary,
              borderRadius: 15,
              padding: 5,
              justifyContent: "center",
              flexDirection: "column",
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
              activeOutlineColor={colors.text}
              style={{ margin: 10 }}
              error={error}
            />
            <TextInput
              mode="outlined"
              label="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              activeOutlineColor={colors.text}
              secureTextEntry={!showPassword}
              style={{ margin: 10 }}
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
              buttonColor={colors.primary}
              textColor={colors.secondaryAccent}
              onPress={() => handleSubmit()}
              style={{ margin: 10 }}
            >
              Login
            </Button>
            <Button
              mode="outlined"
              icon={"account-plus"}
              textColor={colors.primary}
              style={{ margin: 10, borderColor: colors.primary }}
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
