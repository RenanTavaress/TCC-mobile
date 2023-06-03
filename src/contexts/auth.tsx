import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	JSXElementConstructor,
} from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";
import { AxiosError } from "axios";

interface User {
	token: string;
	email: string;
	guid: string;
	type: string;
	permission?: number;
}
interface IProps {
	children: React.ReactNode;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	loading: boolean;
	signIn(email: string, password: string): Promise<void>;
	logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: IProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadStorageData() {
			const storageUser = await AsyncStorage.getItem("@RNAuth2:user");
			const storageToken = await AsyncStorage.getItem("@RNAuth2:token");

			if (!storageToken) {
				logOut();
			}

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
			const response = await auth.signIn2({ email, password });

			console.log(response.code);

			if (response.code === 403) {
				throw new Error("403");
			}

			api.defaults.headers.common["token"] = `${response?.data?.token}`;

			setUser(response.data);
			await AsyncStorage.setItem(
				"@RNAuth2:user",
				JSON.stringify(response.data)
			);

			await AsyncStorage.setItem("@RNAuth2:token", response?.data?.token || "");
			
		} catch (error) {
			if ((error as AxiosError).message === "403") {
				Alert.alert(
					"Acesso negado",
					"Sua conta ainda nao foi liberada pela nossa equipe, aguarde alguns dias"
				);
			} else {
				console.log((error as AxiosError).message);
				Alert.alert("Algo deu Errado", "Seu E-mail ou senha está incorreto");
			}
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
