import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Input } from "../../components/Form/Input";
import { propsLoginOng } from "../../screens/Welcome";
import {
	Container,
	LoginContainer,
	InputLogin,
	ButtonLogin,
	ButtonText,
	Link,
	LinkRegister,
} from "./styles";
import {
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../Header";
import { Keyboard } from "react-native";

interface ScreenLoginProps {
	handleSignIn?: (username: string, password: string) => void;
	screenRegister: "RegisterOng";
	linkRegister: string;
	forgotPassword: string;
	screenRegister2: "RegisterUser";
	linkRegister2: string;
}

export function Login({
	handleSignIn,
	screenRegister,
	screenRegister2,
	linkRegister,
	linkRegister2,
	forgotPassword,
}: ScreenLoginProps) {
	const navigation = useNavigation<propsLoginOng["navigation"]>();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit() {
		handleSignIn?.(username, password);
	}

	return (
		<TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
			<Container>
				<Header title="Login" />
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					enabled
				>
					<LoginContainer>
						<InputLogin>
							<Input
								placeholder="Email"
								keyboardType="email-address"
								value={username}
								onChangeText={setUsername}
								autoCapitalize="none"
							/>
							<Input
								placeholder="Senha"
								secureTextEntry={true}
								value={password}
								onChangeText={setPassword}
								autoCapitalize="none"
							/>
							<ButtonLogin onPress={handleSubmit}>
								<ButtonText>Entrar</ButtonText>
							</ButtonLogin>
						</InputLogin>

						<Link onPress={() => navigation.navigate(screenRegister)}>
							<LinkRegister>{linkRegister}</LinkRegister>
						</Link>

						<Link onPress={() => navigation.navigate(screenRegister2)}>
							<LinkRegister>{linkRegister2}</LinkRegister>
						</Link>

						<Link onPress={() => navigation.navigate("ForgotPassword")}>
							<LinkRegister>{forgotPassword}</LinkRegister>
						</Link>
					</LoginContainer>
				</KeyboardAvoidingView>
			</Container>
		</TouchableWithoutFeedback>
	);
}
