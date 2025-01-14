// React
import "react-native-gesture-handler";
import { useState } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Components
import { Button, Divider, TextInput } from "react-native-paper";
import { useRegister } from "../hooks/useRegister";

import { useTheme } from "@react-navigation/native";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Perror, setError] = useState("");

  const { register, loading, error } = useRegister();

  const handleRegister = async () => {
    if (password === cPassword) {
      await register(username, email, password);
    } else {
      setError("Passwords don't match");
    }
  };

  const colors = useTheme().colors;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <StatusBar style="auto" />
      <View></View>
      <KeyboardAvoidingView behavior={Platform.ios ? "padding" : "height"}>
        <View
          style={{
            elevation: 5,
            minWidth: 320,
            maxHeight: 460,
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
              height: 52,
              width: 50,
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
              <Text style={{ color: "#e7195a" }}>{error || Perror}</Text>
            </View>
          )}
          <TextInput
            mode="outlined"
            label="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            activeOutlineColor={colors.text}
            error={error}
            style={{ margin: 5 }}
          />
          <TextInput
            mode="outlined"
            label="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            activeOutlineColor={colors.text}
            error={error}
            style={{ margin: 5 }}
          />
          <TextInput
            mode="outlined"
            label="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            activeOutlineColor={colors.text}
            error={error}
            secureTextEntry={!showPassword}
            style={{ margin: 5 }}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            onChangeText={(text) => setCPassword(text)}
            value={cPassword}
            activeOutlineColor={colors.text}
            error={error}
            secureTextEntry={!showPassword}
            style={{ margin: 5 }}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <Button
            mode="contained"
            icon="account-plus"
            loading={loading}
            disabled={loading}
            buttonColor={colors.primary}
            textColor={colors.secondaryAccent}
            onPress={() => handleRegister()}
            style={{ margin: 5 }}
          >
            Create Account
          </Button>
          <Button
            mode="outlined"
            icon={"login"}
            textColor={colors.primary}
            style={{ margin: 5, borderColor: colors.primary }}
            onPress={() => navigation.navigate("Login")}
          >
            Already a user
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
