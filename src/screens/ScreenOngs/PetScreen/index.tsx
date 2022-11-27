import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Image, View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { DeleteButton } from "../../../components/Button/Delete";
import { Header } from "../../../components/Header";
import { DataPetContext, DataPetProps } from "../../../contexts/DataPet";
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
	ImageContainer,
	ImageLeft,
	ImageButton,
	ImagePet,
} from "./styles";

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPetScreen"
>;

export function PetScreen() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const [petDetail, setPetDetail] = useState<DataPetProps>({} as DataPetProps);
	const navigate = useNavigation();
	const { datasPet, getDataPet } = useContext(DataPetContext);
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
	} = params;

	async function handleDeletePet(guid: string) {
		await api.delete(`/api/pet/delete/guid/${guid}`);
		Alert.alert("Deletado", "Pet Deletado com sucesso!");
		return navigate.goBack();
	}

	async function getPetDetail() {
		const { data } = await api.get(`/api/pet/detail/guid/${guid}`);

		setPetDetail(data.data);
	}

	useEffect(() => {
		getPetDetail();
	}, []);

	return (
		<Container>
			<Header title={petDetail.typePet} icon="left" />
			<ContainerInfos>
				<ImageContainer>
					{petDetail.photo1 && (
						<ImageLeft>
							<ImageButton>
								<ImagePet source={{ uri: petDetail.photo1 }} />
							</ImageButton>
						</ImageLeft>
					)}
				</ImageContainer>
				<View>
					<ContainerPetInfo>
						<ContainerInfo>
							<TextInfo>Raça:</TextInfo>
							<InfoPet>{petDetail.breed}</InfoPet>
							<TextInfo>Idade:</TextInfo>
							<InfoPet>{petDetail.age}</InfoPet>
							<TextInfo>Tamanho:</TextInfo>
							<InfoPet>{petDetail.size}</InfoPet>
						</ContainerInfo>
						<ContainerHeath>
							<TextInfo>Medicamento:</TextInfo>
							<InfoPet>{petDetail.medication}</InfoPet>
							<TextInfo>Vacinas:</TextInfo>
							<InfoPet>{petDetail.vaccines}</InfoPet>
							<TextInfo>Sexo:</TextInfo>
							<InfoPet>
								{petDetail.gender === "M" ? "Masculino" : "Feminino"}
							</InfoPet>
						</ContainerHeath>
					</ContainerPetInfo>
					<ContainerDescription>
						<TextInfo>Descrição:</TextInfo>
						<InfoPet>{petDetail.description}</InfoPet>
					</ContainerDescription>
				</View>

				<ContainerButtonInfo>
					<ContainerButton
						title="Editar Pet"
						onPress={() => {
							// console.log(params.category.key)
							navigation.navigate("EditingPetScreen", petDetail);
						}}
					/>
					<DeleteButton onPress={() => handleDeletePet(guid)} />
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
