import { View, TouchableOpacity } from "react-native";
import { TextInput, Avatar } from "@react-native-material/core";
import { useState } from "react";
import { styles } from "./text_box_styles";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useMemo } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";
import {
  getStorage,
  ref as strgRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import uuid from "uuid";
import { firestore } from "../../../firebase/config";
import { useAuth } from "../../../contexts/authContext";

function ChatTextBox(props) {
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [user, setUser] = useAuth();
  const chatsRef = collection(firestore, "Chats");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const memoStyles = useMemo(() => styles, [styles]);

  const sendMessage = useCallback(
    async (txt, uri) => {
      let imgDLURL = "";
      if (uri.length > 0) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
        const fileRef = strgRef(getStorage(), uuid.v4());
        const result = await uploadBytes(fileRef, blob);
        blob.close();
        imgDLURL = await getDownloadURL(fileRef);
      }
      if (txt.length > 0 || imgDLURL.length > 0) {
        await addDoc(chatsRef, {
          msg: txt,
          photoMsg: imgDLURL,
          user: {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          createdAt: serverTimestamp(),
        }).then(() => {
          setMsg("");
          setImg("");
        });
      }
    },
    [msg, img]
  );
  const pickImage = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImg(result.uri);
    }
  }, [img]);
  const takePic = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result = await await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImg(result.uri);
    }
  }, [img]);
  const handleTxtMsgInput = (txt) => {
    setMsg(txt);
  };
  return (
    <View style={memoStyles.container}>
      <Feather
        name="camera"
        size={24}
        color="black"
        onPress={takePic}
        style={memoStyles.icons}
      />
      <Feather
        name="image"
        size={24}
        color="black"
        onPress={pickImage}
        style={memoStyles.icons}
      />
      {img.length > 0 ? (
        <Avatar style={memoStyles.avatar} image={{ uri: img }} />
      ) : (
        <></>
      )}

      <View style={memoStyles.txtBox}>
        <TextInput
          inputContainerStyle={memoStyles.txtInputCont}
          multiline={true}
          variant="outlined"
          color="black"
          value={msg}
          onChangeText={(txt) => handleTxtMsgInput(txt)}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          sendMessage(msg, img);
        }}
      >
        <Feather name="send" size={24} color="black" style={memoStyles.icons} />
      </TouchableOpacity>
    </View>
  );
}
//ChatTextBox.whyDidYouRender = true;
export default ChatTextBox;
