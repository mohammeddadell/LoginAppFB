import { View, TouchableWithoutFeedback, Image } from "react-native";
import { Text, Avatar, Divider } from "@react-native-material/core";
import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./messages_styles";
import { useAuth } from "../../../contexts/authContext";

function ChatMessages(props) {
  const [user, setUser] = useAuth();
  const [messages, setMessages] = useState([]);
  const chatsRef = collection(firestore, "Chats");
  const flatlistRef = useRef();
  useEffect(() => {
    let messagesFirestore = [];
    if (messages.length == undefined || messages.length == 0) {
      const unsubscribe = onSnapshot(chatsRef, (querySnapshot) => {
        messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === "added")
          .map(({ doc }) => {
            const msg = doc.data();
            setMessages((prvMessages) => {
              return [...prvMessages, msg];
            });
          });
      });
    }
  }, []);
  useEffect(() => {
    flatlistRef.current.scrollToEnd({ animated: true });
  }, [messages]);
  const renderMsg = ({ item }) => (
    <TouchableWithoutFeedback>
      <View>
        <View
          style={[
            styles.renderMsg,
            user.email == item.user.email ? styles.renderMsgDirectionLocal : {},
          ]}
        >
          <View style={styles.avatar}>
            <Avatar image={{ uri: item.user.photoURL }} />
            <Text style={{ fontSize: 12 }}> {item.user.displayName}</Text>
          </View>

          <View
            style={[
              styles.msgContainer,

              user.email == item.user.email
                ? styles.localMsg
                : styles.remoteMsg,
            ]}
          >
            <Text style={{ color: "white" }}>{item.msg}</Text>
            {item.photoMsg.length > 0 ? (
              <Image
                style={{ height: 100, width: 100 }}
                source={{
                  uri: item.photoMsg,
                }}
              ></Image>
            ) : (
              <></>
            )}
          </View>
        </View>
        <Divider
          style={{ marginBottom: 10 }}
          leadingInset={15}
          trailingInset={15}
          color="black"
        />
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        onLayout={() => flatlistRef.current.scrollToEnd({ animated: true })}
        data={messages}
        renderItem={renderMsg}
      />
    </View>
  );
}

export default ChatMessages;
