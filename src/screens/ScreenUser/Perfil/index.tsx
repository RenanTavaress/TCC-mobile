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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { DataUserContext, UserProps } from "../../../contexts/dataUsers";
import {
	FavoritePetContext,
	PetFavoriteProps,
} from "../../../contexts/FavoritesPets";

type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPerfil"
>;

export function Perfil() {
	const { logOut } = useContext(AuthContext);
	const { datasUser } = useContext<UserProps>(DataUserContext) as UserProps;
	const { listFavoritePet, getFavoritesPets } = useContext<PetFavoriteProps>(
		FavoritePetContext
	) as PetFavoriteProps;
	const isFocused = useIsFocused();
	const navigation = useNavigation<propsLoginOng["navigation"]>();

	useEffect(() => {
		if (isFocused) {
			getFavoritesPets();
		}
	}, [isFocused]);

	function handleLogout() {
		logOut();
	}
	return (
		<Container>
			<Header title="Perfil do Usuário" />

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
						title="Editar Perfil"
						onPress={() => navigation.navigate("EditingPerfil")}
					/>
					{listFavoritePet?.length !== 0 && (
						<ContainerButton
							title="Seus Pets Favoritos"
							onPress={() => navigation.navigate("favoritesPets")}
						/>
					)}

					<ContainerButton
						title="Descreva seu Pet Ideal"
						onPress={() => navigation.navigate("preferences")}
					/>
					<ContainerButton title="Sair" onPress={handleLogout} />
				</ContainerBtn>
			</ContainerInfo>
		</Container>
	);
}
