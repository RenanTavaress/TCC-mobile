import React, { useCallback, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { CardRequest } from "../../../components/CardRequest";
import {
	Container,
	ContainerRequestPets,
	UpdateViewButton,
	UpdateViewContainer,
	UpdateViewText,
} from "./styles";
import { DataPetsProps } from "../../../components/PetCard";
import api from "../../../services/api";
import AuthContext from "../../../contexts/auth";
import { useFocusEffect } from "@react-navigation/native";
import { PetsFilterContext } from "../../../contexts/FilterPet";
import { Ionicons } from "@expo/vector-icons";

export function RequestOng() {
	const [isReserved, setIsReserved] = useState<DataPetsProps[]>([]);

	const { user } = useContext(AuthContext);

	function handleCancelCard(guid: string) {
		setIsReserved((prevReserved: DataPetsProps[]) =>
			prevReserved.filter((item) => item.guid !== guid)
		);
		//setUpdateDataPet(!updateDataPet)
	}
	async function getPetReserved() {
		const { data } = await api.get(
			`/api/pet/list/reserved/companyguid/${user!.guid}`
		);

		setIsReserved(data.data);
	}

	useFocusEffect(
		useCallback(() => {
			getPetReserved();
		}, [])
	);

	return (
		<Container>
			<Header icon="left" title="Suas Requisições" />
			<UpdateViewContainer>
				<UpdateViewButton onPress={getPetReserved}>
					<Ionicons name="reload-outline" size={18} color="black" />
					<UpdateViewText>Atualizar</UpdateViewText>
				</UpdateViewButton>
			</UpdateViewContainer>
			<ContainerRequestPets
				data={isReserved}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => {
					return (
						<CardRequest
							photo1={item.photo1}
							typePet={item.typePet}
							guid={item.guid}
							handleCancelCard={handleCancelCard}
							typeUser={user!.type}
						/>
					);
				}}
			/>
		</Container>
	);
}
