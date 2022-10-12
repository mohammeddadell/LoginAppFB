import { View } from "react-native";
import {
  Button,
  TextInput,
  VStack,
  HStack,
  Text,
  Avatar,
} from "@react-native-material/core";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import PhoneInput from "react-native-phone-number-input";
import { useAuth } from "../../contexts/authContext";
import { styles } from "./register_styles";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    image: null,
  });
  const [value, setValue] = useState("");
  const phoneInput = useRef();
  const [user, setUser] = useAuth();
  const memoStyles = useMemo(() => styles, [styles]);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserInfo((prvUser) => {
        return { ...prvUser, image: result };
      });
    }
  }, [userInfo.image]);

  const handleRegister = useCallback(() => {
    props.registerUser(userInfo);
  }, [userInfo]);
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
          <Text variant="h6">Register</Text>
          <Text variant="subtitle1">Create an account</Text>
        </VStack>
        <VStack spacing={2}>
          <TextInput
            style={memoStyles.textInput}
            color={memoStyles.color}
            variant="outlined"
            placeholder="Full Name"
            onChangeText={(text) => {
              setUserInfo((prvUser) => {
                return { ...prvUser, fullName: text };
              });
            }}
          />
          <PhoneInput
            containerStyle={memoStyles.phoneContainerStyle}
            textContainerStyle={stmemoStylesyles.phoneTextContainerStyle}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="EG"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setUserInfo((prvUser) => {
                return { ...prvUser, phoneNumber: text };
              });
            }}
            withDarkTheme={false}
            withShadow={false}
            autoFocus={false}
          />
          <TextInput
            color={memoStyles.color}
            style={memoStyles.textInput}
            variant="outlined"
            placeholder="Email"
            onChangeText={(text) => {
              setUserInfo((prvUser) => {
                return { ...prvUser, email: text };
              });
            }}
          />
          <TextInput
            color={memoStyles.color}
            style={memoStyles.textInput}
            variant="outlined"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              setUserInfo((prvUser) => {
                return { ...prvUser, password: text };
              });
            }}
          />
          <HStack spacing={8}>
            {userInfo.image && <Avatar image={{ uri: userInfo.image.uri }} />}
            <Button
              variant="outlined"
              title="Pick an avatar"
              color="#a80707"
              onPress={pickImage}
              style={memoStyles.imageBtn}
            />
          </HStack>

          <View style={memoStyles.buttonsContainer}>
            <Button
              title="Have an account? Login"
              variant="text"
              onPress={() => props.navigation.navigate("Login")}
              compact
              color="#000000"
            />
            <Button
              onPress={handleRegister}
              title="Register"
              loading={props.user.loading}
              color="#a80707"
            />
          </View>
        </VStack>
      </VStack>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
export default connect(mapStateToProps, { registerUser })(Register);
