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

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    try {
      const response = await api.post("/signin", { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      console.log("Sign In Successfully");
      navigation.navigate("HomeScreen");
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
        Login Your Account
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
        onPress={()=>handleSignIn()}
      >
        <Text style={{ textAlign: "center", fontSize: 15 }}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{ color: "#0070E0" }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Don't have an Account? Register Now
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
