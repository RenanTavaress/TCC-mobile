import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
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

interface ScreenLoginProps {
	handleSignIn?: (username: string, password: string) => void;
	screenRegister: "RegisterUser" | "RegisterOng";
	linkRegister: string;
}

export function Login({
	handleSignIn,
	screenRegister,
	linkRegister,
}: ScreenLoginProps) {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	//const { signed, user, signIn } = useContext(AuthContext);
	//console.log(signed);
	//console.log(user);
	// function handleSignIn() {
	// 	//console.log("logar");
	// 	signIn();
	// }

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit() {
		handleSignIn?.(username, password);
	}

	return (
		<TouchableWithoutFeedback style={{ flex: 1 }}>
			<Container>
				<Header title="Faça seu login" icon="left" />
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
					</LoginContainer>
				</KeyboardAvoidingView>
			</Container>
		</TouchableWithoutFeedback>
	);
}
