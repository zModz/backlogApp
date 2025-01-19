import { StatusBar, Dimensions, StyleSheet } from "react-native";
// import { useColorScheme } from "react-native";
// import { useTheme } from "@react-navigation/native";

import Colors from "./theme/Colors";
const { width } = Dimensions.get("window");

const scale = width / 320;
// const theme = useColorScheme();
// const colors = useTheme().colors;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C7C7",
  },
  backlogCard: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#EAEAEA",
    borderLeftWidth: 3,
    borderLeftColor: "#D0343C",
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "column",
    padding: 5,

    minWidth: "90%",
    minHeight: 150,
  },
});
