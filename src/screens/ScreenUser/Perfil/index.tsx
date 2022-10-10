import React, { useContext, useEffect, useState, useCallback } from "react";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import AuthContext from "../../../contexts/auth";
import { Header } from "../../../components/Header";
import {
	Container,
	PefilInformations,
	TextInfo,
	InfoUser,
	ContainerInfo,
	ContainerBtn,
} from "./styles";
import { RootStackParamList } from "../../RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DataUserContext } from "../../../contexts/dataUsers";

type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPerfil"
>;

interface DataUserProps {
	guid: string;
	name: string;
	email: string;
	document: string;
	phone: string;
}

interface DataProps {
	datasUser: DataUserProps;
	setDatasUser: (datasUser: DataUserProps) => void;
}

export function Perfil() {
	const { logOut } = useContext(AuthContext);
	const { datasUser } = useContext<DataProps>(DataUserContext) as DataProps;
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	//console.log(datasUser)

	function handleLogout() {
		logOut();
	}
	return (
		<Container>
			<Header title="Perfil" />

			<ContainerInfo>
				<PefilInformations>
					<TextInfo>Nome:</TextInfo>
					<InfoUser>{datasUser.name}</InfoUser>

					<TextInfo>Email: </TextInfo>
					<InfoUser>{datasUser.email}</InfoUser>

					<TextInfo>CPF: </TextInfo>
					<InfoUser>{datasUser.document}</InfoUser>

					<TextInfo>Telefone: </TextInfo>
					<InfoUser> {datasUser.phone}</InfoUser>
				</PefilInformations>

				<ContainerBtn>
					<ContainerButton
						title="Editar perfil"
						onPress={() => navigation.navigate("EditingPerfil")}
					/>

					<ContainerButton title="sair" onPress={handleLogout} />
				</ContainerBtn>
			</ContainerInfo>
		</Container>
	);
}
