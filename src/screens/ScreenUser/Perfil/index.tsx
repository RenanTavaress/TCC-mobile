import React, { useContext, useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";
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
	data: DataUserProps;
}

export function Perfil() {
	const { logOut } = useContext(AuthContext);
	const { document, email, name, phone } = useContext(DataUserContext);
	//const [datasUser, setDatasUser] = useState({} as DataUserProps);
	const navigation = useNavigation<propsLoginOng["navigation"]>();

	// useEffect(() => {
	// 	async function getDataUser() {
	// 		try {
	// 			const { data } = await api.get<DataProps>(
	// 				`/api/user/detail/guid/${user!.guid}`
	// 			);
	// 			setDatasUser(data.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	getDataUser()
	// }, [])

	function handleLogout() {
		logOut();
	}
	return (
		<Container>
			<Header title="Perfil" />

			<ContainerInfo>
				<PefilInformations>
					<TextInfo>Nome:</TextInfo>
					<InfoUser>{name}</InfoUser>

					<TextInfo>Email: </TextInfo>
					<InfoUser> {email}</InfoUser>

					<TextInfo>CPF: </TextInfo>
					<InfoUser> {document}</InfoUser>

					<TextInfo>Telefone: </TextInfo>
					<InfoUser> {phone}</InfoUser>
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
