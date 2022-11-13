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
	name: string;
	size: string;
	vaccines: string;
	onPress?(): void;
}

export function PetCard({
	age,
	breed,
	description,
	medication,
	name,
	size,
	vaccines,
	onPress,
}: DataPetsProps) {
	return (
		<CardPet onPress={onPress}>
			<TextNamePet>{name}</TextNamePet>
			<ContaineCardDescription>
				<DescriptionPet>{description}</DescriptionPet>
				<AgePet>
					{age}
					{' '}
					{breed}
				</AgePet>
			</ContaineCardDescription>
		</CardPet>
	);
}
