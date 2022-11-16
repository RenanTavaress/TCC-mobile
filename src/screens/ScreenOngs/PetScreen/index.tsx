import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { Header } from "../../../components/Header";
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
	} = params;

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
					<ContainerButton
						title="Editar Pet"
						onPress={() => {
							// console.log(params.category.key)
							navigation.navigate("EditingPetScreen", params);
						}}
					/>
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
