// React
import "react-native-gesture-handler";
import { useState } from "react";
import { Text, View, Alert, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

// Components
import { Button, Divider, TextInput } from "react-native-paper";
import { useLogin } from "../hooks/useLogin";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="auto" />
      <View
        style={{
          elevation: 5,
          width: 350,
          height: "auto",
          backgroundColor: "#fff",
          borderRadius: 15,
          padding: 5,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Image
          source={require("../assets/ARMORY2_ico.png")}
          style={{
            height: 155,
            width: 150,
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
          style={{ margin: 10 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
          style={{ margin: 10 }}
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
        />
        <Button
          mode="contained"
          icon="login"
          loading={loading}
          disabled={loading}
          onPress={() => handleSubmit()}
          style={{ margin: 10 }}
        >
          Login
        </Button>
        <Button mode="outlined" icon={'account-plus'} style={{ margin: 10 }} onPress={() => navigation.navigate('Register')}>Create an Account</Button>
      </View>
    </View>
  );
};

export default Login;
