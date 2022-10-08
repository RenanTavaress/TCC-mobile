import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import {
	Container,
	HeaderOng,
	OngImg,
	AdressOng,
	Description,
	InfOngs,
	ContainerPets,
	ContainerOngInfo,
	InfoRegion,
	TextInfo,
	ContactOng,
	ContainerDescription,
} from "./styles";
import { Header } from "../../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataPetsProps, PetCard } from "../../../components/PetCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";

export interface PropsPets {
	data: Array<DataPetsProps>;
}

export type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"petScreen"
>;

export function OngScreen() {
	const [listPet, setListPet] = useState<DataPetsProps[]>([]);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { params } = useRoute() as {
		params: {
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
		};
	};

	const {
		guid,
		name,
		description,
		city,
		district,
		country,
		street,
		numberAddress,
		cep,
		email,
		phone,
	} = params;

	useEffect(() => {
		async function getPets() {
			const response = await api.get<PropsPets>(
				`/api/pet/list/companyguid/${guid}`
			);
			setListPet(response.data.data);
		}
		getPets();
	}, []);

	return (
		<Container>
			<Header title={name} icon="left" />

			<ContainerPets
				data={listPet}
				keyExtractor={(item) => item.guid}
				renderItem={({ item }) => (
					<PetCard
						{...item}
						onPress={() => {
							navigation.navigate("petScreen", item);
						}}
					/>
				)}
				ListHeaderComponent={
					<>
						<HeaderOng>
							<OngImg
								source={{ uri: "https://github.com/RenanTavaress.png" }}
							/>
							<ContainerOngInfo>
								<AdressOng>
									<TextInfo>Endereço:</TextInfo>
									<InfOngs>
										{street}, {numberAddress}
									</InfOngs>
									<InfOngs>{cep}</InfOngs>
									<InfoRegion>
										{district}, {city}, {country}
									</InfoRegion>
								</AdressOng>

								<ContactOng>
									<TextInfo>Contatos:</TextInfo>
									<InfOngs>{phone}</InfOngs>
									<InfOngs>{email}</InfOngs>
								</ContactOng>
							</ContainerOngInfo>
						</HeaderOng>
						<ContainerDescription>
							<TextInfo>Descrição:</TextInfo>
							<Description>{description}</Description>
						</ContainerDescription>
					</>
				}
			/>
		</Container>
	);
}
