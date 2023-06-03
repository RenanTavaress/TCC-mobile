import {
	useFocusEffect,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { DeleteButton } from "../../../components/Button/Delete";
import { Header } from "../../../components/Header";
import { DataPetProps } from "../../../contexts/DataPet";
import api from "../../../services/api";
import { RootStackParamList } from "../../RootStackParams";
import { Container, ContainerInfos, ContainerButtonInfo } from "./styles";
import { PetDetail } from "../../../components/PetDetail";

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPetScreen"
>;

export function PetScreen() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const [petDetail, setPetDetail] = useState<DataPetProps>({} as DataPetProps);
	const navigate = useNavigation();
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
			color: string;
		};
	};

	const { guid } = params;

	async function deletePet(guid: string) {
		await api.delete(`/api/pet/delete/guid/${guid}`);
		Alert.alert("Deletado", "Pet Deletado com sucesso!");
		return navigate.goBack();
	}

	function handleDeletePet() {
		Alert.alert("Deletar pet", "Tem certeza que deseja deletar o pet?", [
			{ text: "Não", style: "cancel" },
			{
				text: "Sim",
				style: "destructive",
				onPress: () => deletePet(guid),
			},
		]);
	}

	async function getPetDetail() {
		const { data } = await api.get(`/api/pet/detail/guid/${guid}`);
		setPetDetail(data.data);
	}

	useEffect(() => {
		getPetDetail();
	}, []);

	useFocusEffect(
		useCallback(() => {
			getPetDetail();
		}, [])
	);

	return (
		<Container>
			<Header title={petDetail?.typePet} icon="left" />
			<ContainerInfos>
				<PetDetail petDetail={petDetail} />

				<ContainerButtonInfo>
					<ContainerButton
						title="Editar Pet"
						onPress={() => {
							navigation.navigate("EditingPetScreen", petDetail);
						}}
					/>
					<DeleteButton onPress={() => handleDeletePet()} />
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
