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
import { FabButton } from "../../../components/Button/FAB";
import AuthContext from "../../../contexts/auth";
import { DataOngContext } from "../../../contexts/DataOng";
import { DataPetContext } from "../../../contexts/DataPet";

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
	const {user} = useContext(AuthContext)
	const { datasOngs } = useContext(DataOngContext);

	async function getPetsOngs() {
		const response = await api.get<PropsPets>(
			`/api/pet/list/companyguid/${user?.guid}`
		);
		//console.log(response.data)
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
			<Header title={`Olá ${datasOngs?.name}, seja bem vindo`} />

			<ContainerPets
				data={listPet}
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

			<FabButton title="+" onPress={() => navigation.navigate("AddPet")} />
		</Container>
	);
}
