import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { AntDesign } from "@expo/vector-icons";
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
} from "./styles";
import { DataUserContext, UserProps } from "../../../contexts/dataUsers";
import { useTheme } from "styled-components";

interface PropsDatailCompany {
	name: string;
	email: string;
	phone: string;
}

interface PropsParameterId {
	guid: string;
}

export function PetScreen() {
	const {colors } = useTheme()
	const { datasUser } = useContext<UserProps>(DataUserContext) as UserProps;
	const [petsCompany, setPetsCompany] = useState<PropsDatailCompany>(
		{} as PropsDatailCompany
	);
	const [favorite, setFavorite] = useState(false);
	const { params } = useRoute() as {
		params: {
			guid: string;
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
		guid,
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
	} = params;

	useEffect(() => {
		async function getPetsCompany() {
			const response = await api.get(`/api/company/detail/guid/${companyGuid}`);
			setPetsCompany(response.data.data);
		}
		getPetsCompany();

		async function getFavorites() {
			const response = await api.get(`/api/favorite/list/${datasUser.guid}`);
			const pet = response.data.data.find(
				(petId: PropsParameterId) => petId.guid === guid
			);
			setFavorite(() => pet?.guid === guid);
		}
		getFavorites();
	}, []);

	async function favoritePet() {
		await api.post(`/api/favorite/add/${datasUser.guid}`, {
			petGuid: guid,
		});

		setFavorite(true);
	}

	async function removeFavoritePet() {
		await api.delete(`/api/favorite/remove/${datasUser.guid}`, {
			data: {
				petGuid: guid,
			},
		});
		setFavorite(false);
	}

	function showInfoOng() {
		Alert.alert(
			"Informações de Contato",
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
						</ImageLeft>
					)}
				</ImageContainer>
				<View>
					<ContainerPetInfo>
						<ContainerInfo>
							<TextInfo>Raça:</TextInfo>
							<InfoPet>{breed}</InfoPet>
							<TextInfo>Idade:</TextInfo>
							<InfoPet>{age}</InfoPet>
							<TextInfo>Porte:</TextInfo>
							<InfoPet>{size}</InfoPet>
						</ContainerInfo>
						<ContainerHeath>
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
						title="Favoritar Pet"
						onPress={!favorite ? favoritePet : removeFavoritePet}
					>
						<AntDesign
							name={!favorite ? "hearto" : "heart"}
							size={24}
							color={colors.primary}
						/>
					</ContainerButton>
					<ContainerButton
						title="Entre em contato com a ONG."
						onPress={showInfoOng}
					/>
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
