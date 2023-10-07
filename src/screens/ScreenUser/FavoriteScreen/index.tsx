import React, { useContext, useEffect } from "react";
import { Header } from "../../../components/Header";
import { PetCard } from "../../../components/PetCard";

import { Container, ContainerPets } from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import {
	FavoritePetContext,
	PetFavoriteProps,
} from "../../../contexts/FavoritesPets";
import { ViewNoResults } from "../../ScreenOngs/DashboardOngs/styles";
import { TextInfo } from "../Perfil/styles";

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"FilterScreen",
	"petScreen"
>;

export interface FormData {
	[name: string]: any;
	breed: string;
	city: string;
	companyName: string;
	description: string;
	district: string;
	gender: string;
	size: string;
	typePet: string;
	color: string;
}

export function FavoriteScreen() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const isFocused = useIsFocused();
	const { getFavoritesPets, listFavoritePet } = useContext<PetFavoriteProps>(
		FavoritePetContext
	) as PetFavoriteProps;

	useEffect(() => {
		if (isFocused) {
			getFavoritesPets();
		}
	}, [isFocused]);

	return (
		<Container>
			<Header title="Pets Favoritos" icon="left" />

			{listFavoritePet?.length === 0 && (
				<ViewNoResults>
					<TextInfo>Não ha pet salvos</TextInfo>
				</ViewNoResults>
			)}
			<ContainerPets
				data={listFavoritePet}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => (
					<PetCard
						{...item}
						onPress={() => {
							navigation.navigate("petScreen", item);
						}}
					/>
				)}
			/>
		</Container>
	);
}
