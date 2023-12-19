import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../AuthApi/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const response = await api.post("/signup", { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      console.log("Registered Successfully");
      navigation.navigate('HomeScreen')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          marginVertical: 10,
          textAlign: "center",
          color: "orange",
        }}
      >
        Create New Account
      </Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Your Email"
          style={styles.textInputStyle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter Your Password"
          style={styles.textInputStyle}
        />
      </View>
      <TouchableOpacity
        style={{
          borderColor: "red",
          backgroundColor: "orange",
          borderWidth: 2,
          padding: 8,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={() => handleSignUp()}
      >
        <Text style={{ textAlign: "center", fontSize: 15 }}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
        <Text style={{ color: "#0070E0" }}>
          Already have an Account? Sign In instead
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    marginHorizontal: 10,
  },
  textInputStyle: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
    textDecorationLine: "none",
    paddingLeft: 15,
  },
  inputContainer: {
    marginVertical: 10,
  },
});
