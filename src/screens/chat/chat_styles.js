import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",

    paddingBottom: 20,
  },
  msgs: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 5,
  },
  keyboardAvoiding: { flex: 1, paddingTop: 50 },
});
