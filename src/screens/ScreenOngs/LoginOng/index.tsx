import React, { useContext } from "react";
import AuthContext from "../../../contexts/auth";

import { Login } from "../../../components/Login";
import { Alert } from "react-native";

export function LoginOng() {
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
			welcome="Faça o login da sua ONG"
			handleSignIn={handleSignIn}
			screenRegister="RegisterOng"
			linkRegister="Sua ONG ainda não é cadastrada?"
		/>
	);
}
