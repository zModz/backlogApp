import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
const colors = useTheme().colors;
const { width } = Dimensions.get("window");
const scale = width / 320;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backlogCard: {
    backgroundColor: colors.secondary,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "column",
    padding: 5,

    minWidth: "90%",
    minHeight: 150,
  },
});
