import { useRoute } from "@react-navigation/native";
import React from "react";
import { Header } from "../../../components/Header";
import { Container, ContainerPetInfo, ContainerInfo, ContainerHeath, TextInfo, InfoPet } from "./styles";

export function PetScreen() {
	const { params } = useRoute() as {
		params: {
			age: string;
			breed: string;
			description: string;
			medication: string;
			name: string;
			size: string;
			vaccines: string;
		};
	};

	const { age, breed, description, medication, name, size, vaccines } = params;
	return (
		<Container>
			<Header title={name} icon="left" />
			<ContainerPetInfo>
				<ContainerInfo>
					<TextInfo>Raça:</TextInfo>
					<InfoPet>{breed}</InfoPet>
					<TextInfo>Idade:</TextInfo>
					<InfoPet>{age}</InfoPet>
					<TextInfo>Tamanho:</TextInfo>
					<InfoPet>{size}</InfoPet>
				</ContainerInfo>
				<ContainerHeath>
					<TextInfo>Medicamento:</TextInfo>
					<InfoPet>{medication}</InfoPet>
					<TextInfo>Vacinas:</TextInfo>
					<InfoPet>{vaccines}</InfoPet>
				</ContainerHeath>
				<TextInfo>Descrição:</TextInfo>
				<InfoPet>{description}</InfoPet>
			</ContainerPetInfo>
		</Container>
	);
}
