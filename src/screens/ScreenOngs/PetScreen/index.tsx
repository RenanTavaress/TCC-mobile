import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import {Alert} from 'react-native'
import { Image, View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { DeleteButton } from "../../../components/Button/Delete";
import { Header } from "../../../components/Header";
import { DataPetContext } from "../../../contexts/DataPet";
import api from "../../../services/api";
import { RootStackParamList } from "../../RootStackParams";
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

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPetScreen"
>;

export function PetScreen() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const navigate = useNavigation();
	const {datasPet, getDataPet} = useContext(DataPetContext)
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
			photo1: string;
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
		photo1,
	} = params;

	async function handleDeletePet(guid: string) {
		await api.delete(`/api/pet/delete/guid/${guid}`)
		Alert.alert("Deletado", "Pet Deletado com sucesso!");
		return navigate.goBack();
		
	}

	return (
		<Container>
			<Header title={typePet} icon="left" />
			<ContainerInfos>
				<View>
					{
						<Image
							source={{ uri: photo1 }}
							style={{ width: 200, height: 200 }}
						/>
					}
				</View>
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
						title="Editar Pet"
						onPress={() => {
							// console.log(params.category.key)
							navigation.navigate("EditingPetScreen", params);
						}}
					/>
					<DeleteButton onPress={() => handleDeletePet(guid)}/>
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
