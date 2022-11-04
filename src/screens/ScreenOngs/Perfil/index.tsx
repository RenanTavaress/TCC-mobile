import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { Header } from "../../../components/Header";
import AuthContext from "../../../contexts/auth";
import { DataOngContext, OngProps } from "../../../contexts/DataOng";
import { UserProps, DataUserContext } from "../../../contexts/dataUsers";
import { RootStackParamList } from "../../RootStackParams";
import {
	Container,
	ContainerBtn,
	ContainerInfo,
	InfoUser,
	PefilInformations,
	TextInfo,
	AdressInfo,
	AdressLeft,
	AdressRigth,
	TextTitle
} from "./styles";

type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPerfilOng"
>;

export function PerfilOng() {
	const { logOut } = useContext(AuthContext);
	const { datasOngs } = useContext<OngProps>(DataOngContext) as OngProps;
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
					<InfoUser>{datasOngs.name}</InfoUser>

					<TextInfo>Email: </TextInfo>
					<InfoUser>{datasOngs.email}</InfoUser>

					<TextInfo>CPF: </TextInfo>
					<InfoUser>{datasOngs.document}</InfoUser>

					<TextInfo>Telefone: </TextInfo>
					<InfoUser> {datasOngs.phone}</InfoUser>
				</PefilInformations>
				<TextTitle>Endereço:</TextTitle>
				<AdressInfo>
					<AdressLeft>
						<TextInfo>Rua:</TextInfo>
						<InfoUser>{datasOngs.street}</InfoUser>
						<TextInfo>CEP:</TextInfo>
						<InfoUser>{datasOngs.cep}</InfoUser>
						<TextInfo>Cidade:</TextInfo>
						<InfoUser>{datasOngs.city}</InfoUser>
					</AdressLeft>
					<AdressRigth>
						<TextInfo>Numero:</TextInfo>
						<InfoUser>{datasOngs.numberAddress}</InfoUser>
						<TextInfo>Bairro:</TextInfo>
						<InfoUser>{datasOngs.district}</InfoUser>
						<TextInfo>UF:</TextInfo>
						<InfoUser>{datasOngs.uf}</InfoUser>
					</AdressRigth>
				</AdressInfo>

				<ContainerBtn>
					<ContainerButton
						title="Editar perfil"
						onPress={() => navigation.navigate("EditingPerfilOng")}
					/>

					<ContainerButton title="sair" onPress={handleLogout} />
				</ContainerBtn>
			</ContainerInfo>
		</Container>
	);
}
