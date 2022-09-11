import React from "react";
import { Container, Header, TitleText, ChooseLoginContainer } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { ContainerButton } from "../../components/Button/ContainerLogin";

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"LoginOng",
	"User"
>;

export function Welcome() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	return (
		<Container>
			<Header>
				<TitleText>Olá, Bem vindo</TitleText>
			</Header>

			<ChooseLoginContainer>
				<ContainerButton
					title="Para as ONGs"
					onPress={() => navigation.navigate("LoginOng")}
				/>

				<ContainerButton
					title="Para adotar um pet"
					onPress={() => navigation.navigate("User")}
				/>
			</ChooseLoginContainer>
		</Container>
	);
}
