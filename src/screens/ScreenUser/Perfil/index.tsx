import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import AuthContext from "../../../contexts/auth";
import {
	Container,
	Header,
	TextTitle,
	PefilInformations,
	TextInfo,
	InfoUser,
   ContainerInfo,
	ContainerBtn,
} from "./styles";

export function Perfil() {
	const { logOut, user } = useContext(AuthContext);
	function handleLogout() {
		logOut();
	}
	return (
		<Container>
			<Header>
				<TextTitle>Perfil</TextTitle>
			</Header>

			<ContainerInfo>
				<PefilInformations>
					<TextInfo>Nome: </TextInfo>
					<InfoUser>Renan User</InfoUser>

					<TextInfo>Email: </TextInfo>
					<InfoUser>renan@teste.com</InfoUser>

					<TextInfo>CPF: </TextInfo>
					<InfoUser>00000000000</InfoUser>

					<TextInfo>Telefone: </TextInfo>
					<InfoUser>11931448120</InfoUser>
				</PefilInformations>

				<ContainerBtn>
					<ContainerButton title="Editar perfil"/>

					<ContainerButton title="sair" onPress={handleLogout} />
				</ContainerBtn>
			</ContainerInfo>
		</Container>
	);
}
