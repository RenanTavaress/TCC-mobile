import React, { useContext } from "react";
import { Alert, Text } from "react-native";
import { Login } from "../../../components/Login";
import AuthContext from "../../../contexts/auth";
import { signIn } from "../../../services/auth";

export function LoginUser() {
	const { signed, user, signIn } = useContext(AuthContext);

	function handleSignIn(username: string, password: string) {
		try {
			signIn(username, password);
		} catch (error) {
			Alert.alert("Algo deu Errado", "Seu E-mail ou senha está incorreto");
		}
	}

	return (
		<Login
			screenRegister="RegisterUser"
			linkRegister="Ainda não é cadastrado?"
			handleSignIn={handleSignIn}
			forgotPassword="Esqueci Senha"
		/>
	);
}
