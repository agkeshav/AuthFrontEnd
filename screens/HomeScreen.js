import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import api from "../AuthApi/api";

export default function HomeScreen(props) {
  //   console.log(props);
  const [userEmail, setUserEmail] = useState(undefined);

  const navigation = useNavigation();
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Successfully Log Out");
      navigation.navigate("SignUpScreen");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUserEmail = async () => {
    try {
      const response = await api.get("/");
      setUserEmail(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleUserEmail();
  }, [userEmail]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{userEmail}</Text>
      <Button title="Log Out" onPress={() => handleLogOut()} />
    </View>
  );
}
