import React from "react";

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
}

export function OngCard({ nameOng, descricao, city, district }: DataOngsProps) {
	return (
		<CardOngs>
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
