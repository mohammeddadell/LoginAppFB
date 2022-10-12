import { View, TouchableWithoutFeedback, Image } from "react-native";
import { Text, Avatar, Divider } from "@react-native-material/core";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  const memoStyles = useMemo(() => styles, [styles]);
  let messagesFirestore = [];
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsRef, (querySnapshot) => {
      messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const msgObj = doc.data();
          const msgId = doc.id;
          return {
            msg: msgObj,
            id: msgId,
            createdAt: doc.data().createdAt,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      if (messages.length !== messagesFirestore.length) {
        setMessages(messagesFirestore);
      }
    });
    return () => unsubscribe();
  }, [messagesFirestore]);

  const renderMsg = useCallback(({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View>
          <View
            style={[
              memoStyles.renderMsg,
              user.email == item.msg.user.email
                ? memoStyles.renderMsgDirectionLocal
                : {},
            ]}
          >
            <View style={memoStyles.avatar}>
              <Avatar
                image={{ uri: item.msg.user.photoURL, cache: "force-cache" }}
              />
              <Text style={memoStyles.displayNameTxt}>
                {item.msg.user.displayName}
              </Text>
            </View>
            <View
              style={[
                memoStyles.msgContainer,

                user.email == item.msg.user.email
                  ? styles.localMsg
                  : styles.remoteMsg,
              ]}
            >
              <Text style={memoStyles.msgTxt}>{item.msg.msg}</Text>
              {item.msg.photoMsg.length > 0 ? (
                <Image
                  style={memoStyles.msgImg}
                  source={{
                    uri: item.msg.photoMsg,
                    cache: "force-cache",
                  }}
                ></Image>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Divider
            style={memoStyles.devider}
            leadingInset={15}
            trailingInset={15}
            color="black"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }, []);
  const itemKey = useCallback((item) => {
    return item.id;
  }, []);

  /* const listScroll = useCallback(() => {
    flatlistRef.current.scrollToEnd({ animated: true });
  }, [flatlistRef]);*/
  return (
    <View style={memoStyles.container}>
      <FlatList
        ref={flatlistRef}
        //  onLayout={listScroll}
        data={messages}
        renderItem={renderMsg}
        keyExtractor={itemKey}
        inverted={true}
      />
    </View>
  );
}
//ChatMessages.whyDidYouRender = true;
export default ChatMessages;
