import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  msgContainer: {
    flex: 1,
    padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  remoteMsg: {
    backgroundColor: "#26262A",
  },
  localMsg: {
    backgroundColor: "#438DEF",
  },
  renderMsg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    paddingBottom: 0,
  },
  renderMsgDirectionLocal: { flexDirection: "row-reverse" },
  avatar: {
    paddingRight: 6,
    paddingLeft: 6,
    paddingBottom: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  txtContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
    paddingRight: 15,
  },
});
