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
import { memo } from "react";
import { useMemo } from "react";

function Chat(props) {
  const MessagesMemoized = memo(ChatMessages);
  const ChatBoxMemoized = memo(ChatTextBox);
  const memoStyles = useMemo(() => styles, [styles]);
  const device = useMemo(() => (Platform.OS === "ios" ? "padding" : "height"));
  return (
    <KeyboardAvoidingView
      behavior={device}
      enabled={true}
      style={memoStyles.keyboardAvoiding}
      keyboardVerticalOffset={73}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={memoStyles.container}>
          <View style={memoStyles.msgs}>
            <MessagesMemoized />
          </View>
          <View>
            <View style={memoStyles.chatTxtBox}>
              <ChatBoxMemoized />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
Chat.whyDidYouRender = true;
export default Chat;
