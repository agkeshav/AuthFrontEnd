import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import LoadingScreen from "./screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();
export default function App() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const tryLocalSignIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token) {
        setToken(token);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    tryLocalSignIn();
  });

  return loading === true ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
          <Stack.Screen component={SignInScreen} name="SignInScreen" />
          <Stack.Screen component={HomeScreen} name="HomeScreen" />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={HomeScreen} name="HomeScreen" />
          <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
          <Stack.Screen component={SignInScreen} name="SignInScreen" />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
