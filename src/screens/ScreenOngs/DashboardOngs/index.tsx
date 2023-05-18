import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import { Container, ContainerPets } from "./styles";
import { Header } from "../../../components/Header";
import {
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import { FabButton } from "../../../components/Button/FAB";
import AuthContext from "../../../contexts/auth";
import { DataOngContext } from "../../../contexts/DataOng";
import { DataPetContext } from "../../../contexts/DataPet";
import { PropsItem } from "../../ScreenUser/ListPets";

export interface PropsPets {
	data: Array<DataPetsProps>;
}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"petScreen"
>;

export function Dashboard() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { user } = useContext(AuthContext);
	const { datasPet, getDataPet } = useContext(DataPetContext);
	const { datasOngs } = useContext(DataOngContext);

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

	const keyExtractor = (item: DataPetsProps, index: number) => {
		return `${item.guid}_${index}`;
	 };
  


	useFocusEffect(
		useCallback(() => {
			getDataPet();
		}, [])
	);

	return (
		<Container>
			<Header title={`Seus Pets`} />

			<ContainerPets
				data={datasPet}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => <CardPet item={item}/>}
			/>

			<FabButton title="+" onPress={() => navigation.navigate("AddPet")} />
		</Container>
	);
}
