import React, { useContext, useEffect, useState } from "react";
import { DataOngsProps, OngCard } from "../../../components/OngCard";
import AuthContext from "../../../contexts/auth";
import api from "../../../services/api";
import {
	Container,
	Header,
	TextTitle,
	ContainerOngs,
	// CardOngs,
	// TextNameOng,
	// ContaineCardDescription,
	// DescriptionOng,
	// CityOng,
} from "./styles";

interface DataUserProps {
	guid: string;
	name: string;
	email: string;
	document: string;
	phone: string;
}

interface DataProps {
	data: DataUserProps;
}

export interface DataOngsProps2 extends DataOngsProps {
	id: string;
}

export function DashboardUser() {
	const { user } = useContext(AuthContext);
	const [datasUser, setDatasUser] = useState({} as DataUserProps);
	const datasOng: DataOngsProps2[] = [
		{
			id: "1",
			nameOng: "ONG 1",
			descricao:
				"textto de descrição 1 ehjrgdshfjgdsfhbdsjfkhsdudfjghfdjghdfjkghdfjghauohgufjghafjdihguohf",
			city: "São Paulo",
			district: "Vila Mariana",
		},
		{
			id: "2",
			nameOng: "ONG 2",
			descricao: "textto de descrição 2 sdhjfvbdshkfgbdedfgfgdhfgjhgff",
			city: "São Paulo",
			district: "Moema",
		},
		{
			id: "3",
			nameOng: "ONG 3",
			descricao: "textto de descrição 3 fjkdgfhsdugfnmksndbnfndskdfgnkjds",
			city: "São Paulo",
			district: "Jurubatuba",
		},
		{
			id: "4",
			nameOng: "ONG 4",
			descricao: "textto de descrição 4",
			city: "São Paulo",
			district: "Perdizes",
		},
		{
			id: "5",
			nameOng: "ONG 5",
			descricao: "textto de descrição 5",
			city: "São Paulo",
			district: "Santana",
		},
		{
			id: "6",
			nameOng: "ONG 6",
			descricao: "textto de descrição 6",
			city: "São Paulo",
			district: "Morumbi",
		},
		{
			id: "7",
			nameOng: "ONG 7",
			descricao: "textto de descrição 7",
			city: "São Paulo",
			district: "itaquera",
		},
	];

	async function getDataUser() {
		try {
			const { data } = await api.get<DataProps>(
				`/api/user/detail/guid/${user!.guid}`
			);
			setDatasUser(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getDataUser();
	}, []);

	return (
		<Container>
			<Header>
				<TextTitle>Olá {datasUser.name}, seja bem vindo</TextTitle>
			</Header>

			<ContainerOngs
				data={datasOng}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <OngCard {...item} />}
			/>
		</Container>
	);
}
