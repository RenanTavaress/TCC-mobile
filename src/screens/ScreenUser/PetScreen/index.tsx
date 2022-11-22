import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { Header } from "../../../components/Header";
import api from "../../../services/api";
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
	const [petsCompany, setPetsCompany] = useState({})
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
			companyGuid: string;
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
		companyGuid
	} = params;

	useEffect(() => {
		async function getPetsCompany() {
			const response = await api.get(`/company/detail/name/guid/${companyGuid}`)
			console.log(response)
			setPetsCompany(response.data.data)
		}
		getPetsCompany()
	},[])

	// function showInfoOng() {
	// 	console.log(petsCompany.email, petsCompany.name, petsCompany.phone);
	// }
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
					<ContainerButton title="Entre em contato com a ONG."  />
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
