import { StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,
  VStack,
  HStack,
  Text,
} from "@react-native-material/core";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { styles } from "./login_styles";
import GoogleLogin from "../../components/google_login";
import { connect } from "react-redux";
import { signin } from "../../redux/actions/authActions";

function Login(props) {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [user, setUser] = useAuth();
  const memoStyles = useMemo(() => styles, [styles]);
  const handleLogin = useCallback(() => {
    props.signin(userInput);
  }, [userInput]);
  useEffect(() => {
    if (props.user.errorMessage && props.user.user == null) {
      alert(props.user.errorMessage);
    }
  }, [props.user.errorMessage]);

  useEffect(() => {
    if (props.user.user) {
      setUser(props.user.user);
    }
  }, [props.user.user]);

  return (
    <View style={memoStyles.container}>
      <VStack spacing={6} style={memoStyles.vstackPadding}>
        <VStack spacing={1}>
          <Text variant="h6">Login</Text>
          <Text variant="subtitle1">Login to your account</Text>
        </VStack>
        <VStack spacing={2}>
          <TextInput
            style={memoStyles.textInput}
            color={memoStyles.color}
            variant="outlined"
            placeholder="Email"
            onChangeText={(text) => {
              setUserInput((prvUser) => {
                return { ...prvUser, email: text };
              });
            }}
          />
          <TextInput
            style={memoStyles.textInput}
            color={memoStyles.color}
            variant="outlined"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              setUserInput((prvUser) => {
                return { ...prvUser, password: text };
              });
            }}
          />
          <View>
            <View style={memoStyles.loginButtons}>
              <GoogleLogin />
              <Button
                onPress={handleLogin}
                title="Login"
                loading={props.user.loading}
                color="#a80707"
              />
            </View>
            <Button
              title="Or Register from here"
              variant="text"
              onPress={() => props.navigation.navigate("Register")}
              compact
              color="#000000"
            />
          </View>
        </VStack>
      </VStack>
    </View>
  );
}

const mapStateToProps = (state) => {
  return { user: state };
};
export default connect(mapStateToProps, { signin })(Login);
