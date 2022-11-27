import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
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
	ImageContainer,
	ImageLeft,
	ImageButton,
	ImagePet,
	ImageRigh,
} from "./styles";

interface PropsDatailCompany {
	name: string;
	email: string;
	phone: string;
}

export function PetScreen() {
	const [petsCompany, setPetsCompany] = useState<PropsDatailCompany>(
		{} as PropsDatailCompany
	);
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
			companyGuid: string;
			photo1: string;
			photo2: string;
			photo3: string;
			photo4: string;
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
		companyGuid,
		photo1,
		photo2,
		photo3,
		photo4,
	} = params;

	useEffect(() => {
		async function getPetsCompany() {
			const response = await api.get(`/api/company/detail/guid/${companyGuid}`);
			setPetsCompany(response.data.data);
		}
		getPetsCompany();
	}, []);

	function showInfoOng() {
		Alert.alert(
			"Contatos",
			`Nome da Ong: ${petsCompany.name} \n\nEmail da Ong: ${petsCompany.email} \n\nTelefone da Ong: ${petsCompany.phone}`
		);
	}
	return (
		<Container>
			<Header title={typePet} icon="left" />
			<ContainerInfos>
				<ImageContainer>
					{photo1 && (
						<ImageLeft>
							<ImageButton>
								<ImagePet source={{ uri: photo1 }} />
							</ImageButton>

							<ImageButton>
								<ImagePet source={{ uri: photo2 }} />
							</ImageButton>
						</ImageLeft>
					)}
					{photo3 && (
						<ImageRigh>
							<ImageButton>
								<ImagePet source={{ uri: photo3 }} />
							</ImageButton>

							<ImageButton>
								<ImagePet source={{ uri: photo4 }} />
							</ImageButton>
						</ImageRigh>
					)}
				</ImageContainer>
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
					<ContainerButton
						title="Entre em contato com a ONG."
						onPress={showInfoOng}
					/>
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
