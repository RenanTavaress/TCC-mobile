import React, { useCallback, useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import {
	Container,
	HeaderOng,
	OngImg,
	AdressOng,
	Description,
	InfOngs,
	ContainerPets,
	ContainerOngInfo,
	InfoRegion,
	TextInfo,
	ContactOng,
	ContainerDescription,
} from "./styles";
import { Header } from "../../../components/Header";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FabButton } from "../../../components/Button/FAB";
import { DataProps, DataUserContext } from "../../../contexts/dataUsers";

export interface PropsPets {
	data: Array<DataPetsProps>;
}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"petScreen"
>;

export function Dashboard() {
	const [listPet, setListPet] = useState<DataPetsProps[]>([]);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { datasTypeUser } = useContext(DataUserContext) as DataProps;

	async function getPetsOngs() {
		const response = await api.get<PropsPets>(
			`/api/pet/list/companyguid/${datasTypeUser.guid}`
		);
		setListPet(response.data.data);
		
	}

	useEffect(() => {
		
		getPetsOngs();

		// function removedata() {
		// 	AsyncStorage.removeItem("@RNAuth2:token");
		// }
		// removedata();
	}, []);

	useFocusEffect(
		useCallback(() => {
			getPetsOngs();
		}, [])
	);

	return (
		<Container>
			<Header title={`Olá ${datasTypeUser.name}, seja bem vindo`} />

			<ContainerPets
				data={listPet}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => (
					<PetCard
						{...item}
						// onPress={() => {
						// 	navigation.navigate("petScreen", item);
						// }}
					/>
				)}
			/>

			<FabButton title="+" onPress={() => navigation.navigate("AddPet")} />
		</Container>
	);
}
