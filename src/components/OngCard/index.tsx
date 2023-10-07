import React from "react";

import {
	CardOngs,
	TextNameOng,
	ContaineCardDescription,
	DescriptionOng,
	CityOng,
} from "./styles";

export interface DataOngsProps2 {
	guid: string;
	cep: string;
	city: string;
	country: string;
	description: string;
	district: string;
	email: string;
	name: string;
	numberAddress: string;
	document: string;
	street: string;
	uf: string;
	phone: string;

	onPress?(): void;
}

export function OngCard({
	name,
	description,
	district,
	city,
	onPress,
}: DataOngsProps2) {
	return (
		<CardOngs onPress={onPress}>
			<TextNameOng>{name}</TextNameOng>
			<ContaineCardDescription>
				<DescriptionOng>{description}</DescriptionOng>
				<CityOng>
					{district}, {city}
				</CityOng>
			</ContaineCardDescription>
		</CardOngs>
	);
}
