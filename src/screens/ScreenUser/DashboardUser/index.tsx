import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { DataOngsProps2, OngCard } from "../../../components/OngCard";
import { UserProps, DataUserContext } from "../../../contexts/dataUsers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, ContainerOngs } from "./styles";
import { RootStackParamList } from "../../RootStackParams";
import api from "../../../services/api";

interface DataOngsProps {
	data: Array<DataOngsProps2>;
}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"ongScreen"
>;

export function DashboardUser() {
	const [listOngs, setListOngs] = useState<DataOngsProps2[]>([]);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { datasUser } = useContext<UserProps>(DataUserContext) as UserProps;

	useEffect(() => {
		async function getListOngs() {
			const response = await api.get<DataOngsProps>(`/api/company/list`);
			setListOngs(response.data.data);
		}
		getListOngs();
		//console.log(listOngs);
	}, []);

	return (
		<Container>
			<Header title={`Olá ${datasUser.name}, seja bem vindo`} />
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
