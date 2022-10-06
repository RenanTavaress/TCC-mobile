import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import {  DataOngsProps2, OngCard } from "../../../components/OngCard";
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
import api from "../../../services/api";

interface DataOngsProps {	
	data: DataOngsProps2;

}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"ongScreen"
>;

export function DashboardUser() {
	const [listOngs, setListOngs] = useState<DataOngsProps2[]>([]);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { name } = useContext(DataUserContext);

	useEffect(() => {
		async function getListOngs() {
			const response = await api.get<DataOngsProps[]>(`/api/company/list`);
			//console.log(response.data.data)
			setListOngs(response.data.data);
		}
		getListOngs();
		console.log(listOngs)
	}, []);

	
	return (
		<Container>
			<Header title={`Olá ${name}, seja bem vindo`} />
			<ContainerOngs
				data={listOngs}
				keyExtractor={(item) => item.guid}
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
