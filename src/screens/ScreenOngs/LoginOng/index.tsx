import React, { useContext } from "react";
import AuthContext from "../../../contexts/auth";

import { Login } from "../../../components/Login";
import { Alert } from "react-native";

export function LoginOng() {
	const { signed, user, signIn } = useContext(AuthContext);

	async function handleSignIn(username: string, password: string) {
		try {
			await signIn(username, password);
		} catch (error) {
			Alert.alert(
				"Algo deu Errado",
				"Seu E-mail ou senha está incorreto"
			);
		}
	}

	return (
		<Login
			handleSignIn={handleSignIn}
			screenRegister="RegisterOng"
			linkRegister="Sua ONG ainda não é cadastrada?"
			forgotPassword="Esqueci a senha"
			screenRegister2="RegisterUser"
			linkRegister2="Cadastrar para adotar"
		/>
	);
}
