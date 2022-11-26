import React from "react";

import {
	CardPet,
	TextNamePet,
	ContaineCardDescription,
	DescriptionPet,
	AgePet,
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
	photo1:string;
	photo2:string;
	photo3:string;
	photo4:string;
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
}: DataPetsProps) {
	return (
		<CardPet onPress={onPress}>
			<TextNamePet>{typePet}</TextNamePet>
			<ContaineCardDescription>
				<DescriptionPet>{description}</DescriptionPet>
				<AgePet>
					{age} {breed}
				</AgePet>
			</ContaineCardDescription>
		</CardPet>
	);
}
