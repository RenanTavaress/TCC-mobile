import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
	// 10.0.1.1 ou 10.0.2.1
	baseURL: "http://192.168.0.146:9595/backend",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(async (config) => {
	if (await AsyncStorage.getItem("@RNAuth2:token")) {
		config.headers = {
			token: `${await AsyncStorage.getItem("@RNAuth2:token")}`,
		};
	}

	return config;
});

export default api;
