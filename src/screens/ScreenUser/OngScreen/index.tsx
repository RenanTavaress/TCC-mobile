import React from "react";
import { Container } from "./styles";
import { Header } from "../../../components/Header";
import { useRoute } from "@react-navigation/native";

export function OngScreen() {
	const {params} = useRoute() as { params: { id: string, nameOng: string } };;

	const { nameOng } = params 
	
	return (
		<Container>
			<Header title={nameOng} icon="left" />
		</Container>
	);
}
