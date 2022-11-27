import react, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { Header } from "../../../components/Header";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import api from "../../../services/api";
import { FontAwesome, AntDesign  } from "@expo/vector-icons";
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
	// const [petsFilter, setPetsFilter] = useState<DataPetsProps[]>([]);
	const { petsFilter, submitForm } = useContext(PetsFilterContext);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	
	return (
		<Container>
			<Header title="Pets" />
			<FilterContainer>
				<CleanFilterBox onPress={submitForm}>
					<AntDesign name="closecircleo" size={15} color="black" />
					<CleanFilterText>Limpar</CleanFilterText>
				</CleanFilterBox>
				<FilterBox onPress={() => navigation.navigate("FilterScreen")}>
					<FontAwesome name="filter" size={24} color="black" />
					<FilterText>Filtro</FilterText>
				</FilterBox>
			</FilterContainer>
			<ContainerPets
				data={petsFilter}
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
