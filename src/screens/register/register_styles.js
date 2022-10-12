import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  },
  phoneContainerStyle: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    width: "100%",
    paddingBottom: 3,
    paddingTop: 2,
  },
  phoneTextContainerStyle: { backgroundColor: "white" },
  textInput: { paddingVertical: 5 },
  color: "#000000",
  imageBtn: { height: 40, padding: 2, margin: 6 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vstackPadding: { padding: 16 },
});
