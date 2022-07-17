import { StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,
  VStack,
  HStack,
  Text,
} from "@react-native-material/core";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../../firebase/config";
import { useAuth } from "../../contexts/authContext";
import { styles } from "./login_styles";
import GoogleLogin from "../../components/google_login";

export default function Login({ navigation }) {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useAuth();
  const auth = getAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      ).then((cred) => {
        console.log(cred.user);
        setUser(cred.user);
      });
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 40 }}>
      <VStack spacing={6} style={{ padding: 16 }}>
        <VStack spacing={1}>
          <Text variant="h6">Login</Text>
          <Text variant="subtitle1">Login to your account</Text>
        </VStack>
        <VStack spacing={2}>
          <TextInput
            style={styles.textInput}
            color={styles.color}
            variant="outlined"
            placeholder="Email"
            onChangeText={(text) => {
              setUserInput((prvUser) => {
                return { ...prvUser, email: text };
              });
            }}
          />
          <TextInput
            style={styles.textInput}
            color={styles.color}
            variant="outlined"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              setUserInput((prvUser) => {
                return { ...prvUser, password: text };
              });
            }}
          />
          <HStack justify="between">
            <GoogleLogin />
            <Button
              onPress={handleLogin}
              title="Login"
              loading={isLoading}
              color="#a80707"
            />
          </HStack>
          <Button
            title="Or Register from here"
            variant="text"
            onPress={() => navigation.navigate("Register")}
            compact
            color="black"
          />
        </VStack>
      </VStack>
    </View>
  );
}
