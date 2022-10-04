import React from "react";
import { Container, HeaderOng, Description, City, District } from "./styles";
import { Header } from "../../../components/Header";
import { useRoute } from "@react-navigation/native";

export function OngScreen() {
	const {params} = useRoute() as { params: { id: string, nameOng: string, descricao: string, city: string, district: string } };;

	const { nameOng, descricao, city, district } = params 
	
	return (
		<Container>
			<Header title={nameOng} icon="left" />
			<HeaderOng>
				<Description>{descricao}</Description>
				<City>{city}</City>	
				<District>{district}</District>

			</HeaderOng>
		</Container>
	);
}


