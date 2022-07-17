import { StyleSheet, Text, View, Button } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Avatar } from "@react-native-material/core";
import { languages } from "../../contexts/langContext";
import { useLang } from "../../contexts/langContext";

export default function Home({ navigation }) {
  const [user, setUser] = useAuth();
  const [lang, setLang] = useLang();
  return (
    <View>
      <Text>
        {languages[lang].welcome}, {user.displayName}!
      </Text>
    </View>
  );
}
