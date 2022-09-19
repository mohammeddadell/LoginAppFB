import { View, TouchableOpacity } from "react-native";
import { TextInput, Avatar } from "@react-native-material/core";
import { useState } from "react";
import { styles } from "./text_box_styles";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
  const sendMessage = async (txt, uri) => {
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
  };
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      setImg(result.uri);
    }
  };
  const takePic = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result = await await ImagePicker.launchCameraAsync();
    console.log(result);
    if (!result.cancelled) {
      setImg(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Feather
        name="camera"
        size={24}
        color="black"
        onPress={takePic}
        style={styles.icons}
      />
      <Feather
        name="image"
        size={24}
        color="black"
        onPress={pickImage}
        style={styles.icons}
      />
      {img.length > 0 ? (
        <Avatar style={{ margin: 5 }} image={{ uri: img }} />
      ) : (
        <></>
      )}

      <View style={styles.txtBox}>
        <TextInput
          inputContainerStyle={{ height: 45 }}
          multiline={true}
          variant="outlined"
          color="black"
          value={msg}
          onChangeText={(txt) => {
            setMsg(txt);
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          sendMessage(msg, img);
        }}
      >
        <Feather name="send" size={24} color="black" style={styles.icons} />
      </TouchableOpacity>
    </View>
  );
}

export default ChatTextBox;
