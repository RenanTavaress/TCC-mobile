import React, { useCallback, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { CardRequest } from "../../../components/CardRequest";
import { Container, ContainerRequestPets } from "./styles";
import { DataPetsProps } from "../../../components/PetCard";
import api from "../../../services/api";
import AuthContext from "../../../contexts/auth";
import { useFocusEffect } from "@react-navigation/native";
import { PetsFilterContext } from "../../../contexts/FilterPet";

export function RequestOng() {
	const [isReserved, setIsReserved] = useState<DataPetsProps[]>([]);

	const { user } = useContext(AuthContext);

	function handleCancelCard(guid: string) {
		setIsReserved((prevReserved: DataPetsProps[]) =>
			prevReserved.filter((item) => item.guid !== guid)
		);
		//setUpdateDataPet(!updateDataPet)
	}

	// useFocusEffect(
	// 	useCallback(() => {
	// 		async function getPetReserved() {
	// 			const verifyTypeUser =
	// 				user?.type == "USER"
	// 					? `/api/pet/list/reserved`
	// 					: `/api/pet/list/reserved/companyguid/${user!.guid}`;
	// 			const { data } = await api.get(verifyTypeUser);

	// 			setIsReserved(data.data);
	// 		}
	// 		getPetReserved();
	// 	}, [])
	// );


	useFocusEffect(
		useCallback(() => {
			async function getPetReserved() {
				const { data } = await api.get(`/api/pet/list/reserved/companyguid/${user!.guid}`);

				setIsReserved(data.data);
			}
			getPetReserved();
		}, [])
	);

	return (
		<Container>
			<Header title="Suas Requisições" />
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
