import "react-native-gesture-handler";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/login/login";
import Register from "./src/screens/register/register";
import Home from "./src/screens/home/home";
import Chat from "./src/screens/chat/chat";
import Splash from "./src/screens/splash/splash";
import "./src/firebase/config";
import AuthProvider, { useAuth } from "./src/contexts/authContext";
import LangProvider, { useLang } from "./src/contexts/langContext";
import CustomSidebarMenu from "./src/components/side_bar/CustomSidebarMenu";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./src/redux/reducers/authReducer";
import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(authReducer);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = () => {
  const [user] = useAuth();

  if (user) {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home Page",
            drawerIcon: (config) => (
              <Feather name="menu" size={24} color="black" />
            ),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Chat"
          options={{
            drawerLabel: "Chat",
            drawerIcon: (config) => (
              <Feather name="menu" size={24} color="black" />
            ),
          }}
          component={Chat}
        />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
};

export default function App() {
  useEffect(() => {
    registerForPushNotification()
      .then((token) => console.log(token))
      .catch((error) => console.log(error));
  }, []);
  const registerForPushNotification = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  };
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthProvider>
          <LangProvider>
            <Navigator />
          </LangProvider>
        </AuthProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
