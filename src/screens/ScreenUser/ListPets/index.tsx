import React, { memo, useContext } from "react";
import { Header } from "../../../components/Header";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
	Container,
	ContainerPets,
	FilterContainer,
	CleanFilterBox,
	CleanFilterText,
	FilterBox,
	FilterText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import { PetsFilterContext } from "../../../contexts/FilterPet";

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"FilterScreen",
	"petScreen"
>;

export interface PropsItem {
	item: DataPetsProps;
}

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
}

export function ListPets() {
	const { petsFilter, submitForm, isFiltered } = useContext(PetsFilterContext);
	const navigation = useNavigation<propsLoginOng["navigation"]>();


	const CardPet = memo(({ item }: PropsItem) => {
		return (
			<PetCard
				{...item}
				onPress={() => {
					navigation.navigate("petScreen", item);
				}}
			/>
		);
	});

	return (
		<Container>
			<Header title="Pets" />
			<FilterContainer>
				{isFiltered && (
					<CleanFilterBox onPress={submitForm}>
						<AntDesign name="closecircleo" size={15} color="black" />
						<CleanFilterText>Limpar</CleanFilterText>
					</CleanFilterBox>
				)}

				<FilterBox onPress={() => navigation.navigate("FilterScreen")}>
					<FontAwesome name="filter" size={24} color="black" />
					<FilterText>Filtro</FilterText>
				</FilterBox>
			</FilterContainer>
			<ContainerPets
				data={petsFilter}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => <CardPet item={item} />}
			/>
		</Container>
	);
}
