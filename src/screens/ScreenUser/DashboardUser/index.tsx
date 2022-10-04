import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Header } from "../../../components/Header";
import { DataOngsProps, OngCard } from "../../../components/OngCard";
import { DataUserContext } from "../../../contexts/dataUsers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	Container,
	TextTitle,
	ContainerOngs,
	// CardOngs,
	// TextNameOng,
	// ContaineCardDescription,
	// DescriptionOng,
	// CityOng,
} from "./styles";
import { RootStackParamList } from "../../RootStackParams";

export interface DataOngsProps2 extends DataOngsProps {
	id: string;
}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"ongScreen"
>;

export function DashboardUser() {
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { name } = useContext(DataUserContext);
	const datasOng: DataOngsProps2[] = [
		{
			id: "1",
			nameOng: "ONG 1",
			descricao:
				"textto de descrição 1 ehjrgdshfjgdsfhbdsjfkhsdudfjghfdjghdfjkghdfjghauohgufjghafjdihguohf",
			city: "São Paulo",
			district: "Vila Mariana",
			pets: [
				{
					guid: "1",
					companyGuid: "1",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "2",
			nameOng: "ONG 2",
			descricao: "textto de descrição 2 sdhjfvbdshkfgbdedfgfgdhfgjhgff",
			city: "São Paulo",
			district: "Moema",
			pets: [
				{
					guid: "2",
					companyGuid: "2",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "3",
			nameOng: "ONG 3",
			descricao: "textto de descrição 3 fjkdgfhsdugfnmksndbnfndskdfgnkjds",
			city: "São Paulo",
			district: "Jurubatuba",
			pets: [
				{
					guid: "3",
					companyGuid: "3",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "4",
			nameOng: "ONG 4",
			descricao: "textto de descrição 4",
			city: "São Paulo",
			district: "Perdizes",
			pets: [
				{
					guid: "4",
					companyGuid: "4",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "5",
			nameOng: "ONG 5",
			descricao: "textto de descrição 5",
			city: "São Paulo",
			district: "Santana",
			pets: [
				{
					guid: "5",
					companyGuid: "5",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "6",
			nameOng: "ONG 6",
			descricao: "textto de descrição 6",
			city: "São Paulo",
			district: "Morumbi",
			pets: [
				{
					guid: "6",
					companyGuid: "6",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
		{
			id: "7",
			nameOng: "ONG 7",
			descricao: "textto de descrição 7",
			city: "São Paulo",
			district: "itaquera",
			pets: [
				{
					guid: "7",
					companyGuid: "7",
					age: "1",
					breed: "dsdsds",
					description: "fdsjfgsdhjf",
					medication: "sjhidfgsdhijff",
					name: "sdfjkghsdfjg",
					size: "jksdfhsdfj",
					vaccines: "hjisdfjsdf",
				},
			],
		},
	];

	return (
		<Container>
			<Header title={`Olá ${name}, seja bem vindo`} />
			<ContainerOngs
				data={datasOng}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<OngCard
						{...item}
						onPress={() => {
							navigation.navigate("ongScreen", item);
						}}
					/>
				)}
			/>
		</Container>
	);
}
