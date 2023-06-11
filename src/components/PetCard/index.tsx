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
}

export function PetCard({
	age,
	breed,
	description,
	typePet,
	birthDate,
	onPress,
	photo1,
}: DataPetsProps) {
	const birthDay = age ? age : birthDate
	return (
		<CardPet onPress={onPress}>
			<ContainerImage>
				<TextNamePet>{typePet}</TextNamePet>
				<ImagePet source={{ uri: photo1 }} />
			</ContainerImage>

			<ContaineCardDescription>
				<DescriptionPet>{description}</DescriptionPet>
				<AgePet>{breed ? `${birthDay}, ${breed}` : `${birthDay}`}</AgePet>
			</ContaineCardDescription>
		</CardPet>
	);
}
