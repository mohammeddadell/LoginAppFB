import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import "../firebase/config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Button, Avatar } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

export default function GoogleLogin() {
  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.GOOGLE_WEB_CLIENT_ID,
  });
  const [user, setUser] = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((cred) => {
          console.log(cred.user);
          setUser(cred.user);
          setIsLoading(false);
        })
        .catch((erro) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [response]);
  return (
    <Button
      loading={isLoading}
      disabled={!request}
      title="Login with Google"
      onPress={() => {
        setIsLoading(true);
        promptAsync();
      }}
      color="white"
    />
  );
}
