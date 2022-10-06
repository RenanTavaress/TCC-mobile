import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import {
	Container,
	HeaderOng,
	Description,
	City,
	District,
	ContainerPets,
} from "./styles";
import { Header } from "../../../components/Header";
import { useRoute } from "@react-navigation/native";
import { DataPetsProps, PetCard } from "../../../components/PetCard";

export interface PropsPets {
	data: Array<DataPetsProps>;
}

export function OngScreen() {
	const [listPet, setListPet] = useState<DataPetsProps[]>([]);
	const { params } = useRoute() as {
		params: {
			guid: string;
			cep: string;
			city: string;
			country: string;
			description: string;
			district: string;
			email: string;
			name: string;
			numberAddress: string;
			document: string;
			street: string;
			uf: string;
			phone: string;
		};
	};

	const { guid, name, description, city, district } = params;

	useEffect(() => {
		async function getPets() {
			const response = await api.get<PropsPets>(
				`/api/pet/list/companyguid/${guid}`
			);
			console.log(response.data.data)
			setListPet(response.data.data);
		}
		getPets();
	}, []);

	return (
		<Container>
			<Header title={name} icon="left" />
			<HeaderOng>
				<Description>{description}</Description>
				<City>{city}</City>
				<District>{district}</District>
			</HeaderOng>
			
			<ContainerPets
				data={listPet}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => <PetCard {...item} />}
			/>
		</Container>
	);
}
