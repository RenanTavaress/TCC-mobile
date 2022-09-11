import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

interface User {
	// name: string;
	// email: string;
	token: string;
	email: string;
	guid: string;
	type: string;
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

			api.defaults.headers.common["token"] = `${response.token}`;

			setUser(response);

			await AsyncStorage.setItem("@RNAuth2:user", JSON.stringify(response));
			await AsyncStorage.setItem("@RNAuth2:token", response.token);
		} catch {
			console.log("erro no login");
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
