import React, {
	memo,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import { PetsFilterContext } from "../../../contexts/FilterPet";
import { ViewNoResults } from "../../ScreenOngs/DashboardOngs/styles";
import { TextInfo } from "../Perfil/styles";
import { RequestPetContext } from "../../../contexts/RequestPets";

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
	isReserved: boolean;
	isAdopted: boolean;
}

export function ListPets() {
	const { petsFilter, submitForm, isFiltered } = useContext(PetsFilterContext);
	const { isReserved } = useContext(RequestPetContext);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const [opa, setOpa] = useState(false);

	const CardPet = memo(({ item }: PropsItem) => {
		return (
			<PetCard
				{...item}
				onPress={() => {
					console.log(item.isReserved);
					navigation.navigate("petScreen", item);
				}}
			/>
		);
	});
	console.log("carregou O componet do ListPets ");
	useEffect(() => {
		setOpa(!opa);
		console.log("carregou O useEffect do ListPets ");
	}, [isReserved]);

	//useFocusEffect(useCallback(() => {setOpa(!opa)}, [isReserved]));

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

			{petsFilter?.length === undefined && (
				<ViewNoResults>
					<TextInfo>Não há pets disponíveis</TextInfo>
				</ViewNoResults>
			)}

			<ContainerPets
				data={petsFilter}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => <CardPet item={item} />}
			/>
		</Container>
	);
}
