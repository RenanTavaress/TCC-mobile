import React from "react";
import { View } from "react-native";

import {
	CardPet,
	TextNamePet,
	ContaineCardDescription,
	DescriptionPet,
	AgePet,
	ContainerImage,
	ImagePet,
	ContainerInfosPets,
} from "./styles";

export interface DataPetsProps {
	guid: string;
	companyGuid: string;
	age: string;
	breed: string;
	description: string;
	medication: string;
	typePet: string;
	size: string;
	vaccines: string;
	onPress?(): void;
	gender: string;
	name: string;
	email: string;
	phone: string;
	photo1: string;
	color: string;
	birthDate: string;
	identification: string;
	isReserved: boolean;
	reservationInfo: string;
	isAdopted:  boolean;
	status: string;
}

export function PetCard({
	age,
	breed,
	description,
	typePet,
	birthDate,
	onPress,
	photo1,
	identification,
	isReserved,
	isAdopted
}: DataPetsProps) {
	const birthDay = age ? age : birthDate;
	return (
		<CardPet onPress={onPress} isReserved={isReserved || isAdopted}>
			<ContainerImage>
				<TextNamePet>{typePet}</TextNamePet>
				<ImagePet source={{ uri: photo1 }} />
			</ContainerImage>

			<ContaineCardDescription>
				<DescriptionPet>{description}</DescriptionPet>
				<ContainerInfosPets>
					<AgePet>Identificação: {identification}</AgePet>
					<AgePet>{breed ? `${birthDay}, ${breed}` : `${birthDay}`}</AgePet>
				</ContainerInfosPets>
			</ContaineCardDescription>
		</CardPet>
	);
}
