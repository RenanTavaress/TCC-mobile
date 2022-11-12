import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";

interface User {
	token: string;
	email: string;
	guid: string;
	type: string;
	permission: number;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	loading: boolean;
	signIn(email: string, password: string): Promise<void>;
	logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadStorageData() {
			const storageUser = await AsyncStorage.getItem("@RNAuth2:user");
			const storageToken = await AsyncStorage.getItem("@RNAuth2:token");

			if (storageUser && storageToken) {
				api.defaults.headers.common["token"] = `${storageToken}`;
				setUser(JSON.parse(storageUser));
				//setLoading(false);
			}
			setLoading(false);
		}
		loadStorageData();
	}, []);

	async function signIn(email: string, password: string) {
		try {
			const response = await auth.signIn({ email, password });
			//console.log(response)

			// if (response?.permission !== 0) {
				api.defaults.headers.common["token"] = `${response.token}`;

				setUser(response);

				await AsyncStorage.setItem("@RNAuth2:user", JSON.stringify(response));
				await AsyncStorage.setItem("@RNAuth2:token", response.token);
			// } else {
			// 	return Alert.alert(
			// 		"Não foi possivel logar",
			// 		"O nosso Admimistrador ainda não autorizou o seu login, aguarde até 2 dias uteis"
			// 	);
			// }
		} catch {
			Alert.alert("Algo deu Errado", "Seu E-mail ou senha está incorreto");
		}
	}
	function logOut() {
		delete api.defaults.headers.common["Authorization"];
		AsyncStorage.clear().then(() => setUser(null));
	}

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, loading, signIn, logOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

// export function useAuth(){
// 	const contexts = useContext(AuthContext)
// 	return contexts;
// }
