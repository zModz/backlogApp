import { StatusBar, Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const scale = width / 320;

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appHeader: {
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 5,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      backgroundColor: theme.colors.surface,
      elevation: 5,

      width: "100%",
      minHeight: 100 * scale,
    },
    headerText: {
      fontSize: 24,
      alignSelf: "center",
      color: theme.colors.text,
    },
    backlogCard: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: "#D0343C", // turn this dynamic
      marginBottom: 10,
      borderRadius: 10,
      justifyContent: "center",
      flexDirection: "column",
      padding: 5,

      minWidth: "90%",
      minHeight: 150,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: "bold",
      width: 130 * scale,
      maxHeight: 55,
      color: theme.colors.text,
    },
    cardText: {
      fontSize: 14,
      width: 130 * scale,
      maxHeight: 55,
      marginLeft: 5,
      color: theme.colors.text,
      overflow: "visible",
    },
    loading: {
      width: "50%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      padding: 10,
      marginHorizontal: 15,
      marginVertical: 10,
      backgroundColor: theme.colors.surface,
      borderRadius: 25,
      elevation: 5,
    },
  });
