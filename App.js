import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/login/login";
import Register from "./src/screens/register/register";
import Home from "./src/screens/home/home";
import Splash from "./src/screens/splash/splash";
import "./src/firebase/config";
import AuthProvider, { useAuth } from "./src/contexts/authContext";
import LangProvider, { useLang } from "./src/contexts/langContext";
import CustomSidebarMenu from "./src/components/side_bar/CustomSidebarMenu";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = () => {
  const [user] = useAuth();
  const [lang] = useLang();

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
          options={{ drawerLabel: "Home Page" }}
          component={Home}
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
  return (
    <NavigationContainer>
      <AuthProvider>
        <LangProvider>
          <Navigator />
        </LangProvider>
      </AuthProvider>
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
