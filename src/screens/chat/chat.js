import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./chat_styles";
import ChatMessages from "../../components/chat/messages/messages";
import ChatTextBox from "../../components/chat/text_box/text_box";

function Chat(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}
      style={{ flex: 1, paddingTop: 50 }}
      keyboardVerticalOffset={73}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.msgs}>
            <ChatMessages />
          </View>
          <View>
            <View style={styles.chatTxtBox}>
              <ChatTextBox />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Chat;
