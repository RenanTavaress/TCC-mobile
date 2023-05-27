import React from "react";
import { View } from "react-native";

import {
	CardPet,
	TextNamePet,
	ContaineCardDescription,
	DescriptionPet,
	AgePet,
	ContainerImage,
	ImagePet
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
}

export function PetCard({
	age,
	breed,
	description,
	medication,
	typePet,
	size,
	vaccines,
	onPress,
	photo1
}: DataPetsProps) {
	return (
		<CardPet onPress={onPress}>
			<ContainerImage>
				<TextNamePet>{typePet}</TextNamePet>
				<ImagePet source={{ uri: photo1 }}/>
			</ContainerImage>
			
			<ContaineCardDescription>
				<DescriptionPet>{description}</DescriptionPet>
				<AgePet>
					{age} Meses, {breed}
				</AgePet>
			</ContaineCardDescription>
		</CardPet>
	);
}
