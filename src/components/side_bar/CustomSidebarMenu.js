import React, { useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Avatar, Text, Button, HStack } from "@react-native-material/core";
import { useAuth } from "../../contexts/authContext";
import { useLang } from "../../contexts/langContext";
import { styles } from "./sideBar_styles";
import { languages } from "../../contexts/langContext";
import { connect } from "react-redux";
import { signout } from "../../redux/actions/authActions";

function CustomSidebarMenu(props) {
  const [user, setUser] = useAuth();
  const [lang, setLang] = useLang();

  const handleSignOut = () => {
    Alert.alert(languages[lang].signoutConfirmMsg, "", [
      {
        text: languages[lang].cancel,
        onPress: () => {},
        style: "cancel",
      },
      {
        text: languages[lang].signOut,
        onPress: () => {
          props.signout();
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(user);
    if (props.user.user == null) {
      setUser(null);
    }
  }, [props.user.user]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Avatar style={styles.itemAlignments} image={{ uri: user.photoURL }} />
      <Text style={[styles.itemAlignments, styles.email]}>{user.email}</Text>
      <HStack spacing={6}>
        <Text style={{ alignSelf: "center", margin: 10 }}>{lang}</Text>
        <Button
          title={lang == "EN" ? "AR" : "EN"}
          variant="outlined"
          color="Black"
          style={{ margin: 5, height: 30, marginLeft: 170 }}
          onPress={() => {
            lang == "EN" ? setLang("AR") : setLang("EN");
          }}
        />
      </HStack>
      <Text
        style={styles.publicRoom}
        onPress={() => {
          props.navigation.navigate("Chat");
        }}
      >
        Public chat room
      </Text>
      <Text style={styles.publicRoom} onPress={() => {}}>
        Chat with another user
      </Text>

      <Button
        title={languages[lang].signOut}
        onPress={handleSignOut}
        color="#a80707"
        variant="outlined"
        style={styles.itemAlignments}
      />
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return { user: state };
};
export default connect(mapStateToProps, { signout })(CustomSidebarMenu);
