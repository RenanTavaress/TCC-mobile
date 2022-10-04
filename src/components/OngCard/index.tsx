import React from "react";
import { DataPetsProps } from "../PetCard";

import {
	CardOngs,
	TextNameOng,
	ContaineCardDescription,
	DescriptionOng,
	CityOng,
} from "./styles";

export interface DataOngsProps {
	nameOng: string;
	descricao: string;
	city: string;
	district: string;
	onPress?(): void;
	pets: DataPetsProps[]
}

export function OngCard({ nameOng, descricao, city, district, onPress }: DataOngsProps) {
	return (
		<CardOngs onPress={onPress}>
			<TextNameOng>{nameOng}</TextNameOng>
			<ContaineCardDescription>
				<DescriptionOng>{descricao}</DescriptionOng>
				<CityOng>
					{district}, {city}
				</CityOng>
			</ContaineCardDescription>
		</CardOngs>
	);
}
