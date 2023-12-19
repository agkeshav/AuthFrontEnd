import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const instance = axios.create({
  baseURL: "https://607e-122-161-72-12.ngrok-free.app/",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default instance;
