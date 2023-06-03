import React, { useContext, useEffect } from "react";
import { Header } from "../../../components/Header";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
	Container,
	ContainerPets,
} from "./styles";
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import { PetsFilterContext } from "../../../contexts/FilterPet";
import { FavoritePetContext, PetFavoriteProps } from "../../../contexts/FavoritesPets";

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
		if(isFocused){
			getFavoritesPets()
		}
		
	},[isFocused])

	return (
		<Container>
			<Header title="Pets Favoritados" icon="left" />
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
