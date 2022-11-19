import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { Header } from "../../../components/Header";
import {
	Container,
	ContainerInfos,
	ContainerPetInfo,
	ContainerInfo,
	ContainerHeath,
	TextInfo,
	InfoPet,
	ContainerDescription,
	ContainerButtonInfo,
} from "./styles";

export function PetScreen() {
	const { params } = useRoute() as {
		params: {
			age: string;
			breed: string;
			description: string;
			medication: string;
			typePet: string;
			size: string;
			vaccines: string;
			gender: string;
			name: string;
			email: string;
			phone: string;
		};
	};

	const {
		age,
		breed,
		description,
		medication,
		typePet,
		size,
		vaccines,
		gender,
		email,
		name,
		phone,
	} = params;

	function showInfoOng() {
		console.log(email, name, phone);
	}
	return (
		<Container>
			<Header title={typePet} icon="left" />
			<ContainerInfos>
				<View>
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
							<TextInfo>Sexo:</TextInfo>
							<InfoPet>{gender === "M" ? "Masculino" : "Feminino"}</InfoPet>
						</ContainerHeath>
					</ContainerPetInfo>
					<ContainerDescription>
						<TextInfo>Descrição:</TextInfo>
						<InfoPet>{description}</InfoPet>
					</ContainerDescription>
				</View>

				<ContainerButtonInfo>
					<ContainerButton title="Entre em contato com a ONG." onPress={showInfoOng} />
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
