import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Header } from "../../../components/Header";
import api from "../../../services/api";
import { Container, ContainerInfos, ContainerButtonInfo } from "./styles";
import { DataUserContext, UserProps } from "../../../contexts/dataUsers";
import { useTheme } from "styled-components";
import { PetDetail } from "../../../components/PetDetail";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

interface PropsDatailCompany {
	name: string;
	email: string;
	phone: string;
}

interface PropsParameterId {
	guid: string;
}

export function PetScreen() {
	const { colors } = useTheme();
	const [rating, setRating] = useState("");
	const { datasUser } = useContext<UserProps>(DataUserContext) as UserProps;
	const [petsCompany, setPetsCompany] = useState<PropsDatailCompany>(
		{} as PropsDatailCompany
	);
	const [favorite, setFavorite] = useState(false);
	const { params } = useRoute() as {
		params: {
			guid: string;
			age: string;
			breed: string;
			description: string;
			medication: string;
			typePet: string;
			size: string;
			vaccines: string;
			gender: string;
			companyGuid: string;
			photo1: string;
			color: string;
			birthDate: string;
			identification: string;
		};
	};

	const {
		guid,
		age,
		breed,
		description,
		medication,
		typePet,
		size,
		vaccines,
		gender,
		companyGuid,
		photo1,
		color,
		birthDate,
		identification
	} = params;

	useEffect(() => {
		async function getPetsCompany() {
			const response = await api.get(`/api/company/detail/guid/${companyGuid}`);
			setPetsCompany(response.data.data);
		}
		getPetsCompany();

		async function getFavorites() {
			const response = await api.get(`/api/favorite/list/${datasUser.guid}`);
			const pet = response.data.data.find(
				(petId: PropsParameterId) => petId.guid === guid
			);
			setFavorite(() => pet?.guid === guid);
		}
		getFavorites();
	}, []);

	useEffect(() => {
		async function getRating() {
			const response = await api.get(
				`/api/rating/average/companyguid/${companyGuid}`
			);
			console.log(response.data.data.average);
			setRating(response.data.data.average);
		}

		getRating();
	}, [rating]);

	async function favoritePet() {
		await api.post(`/api/favorite/add/${datasUser.guid}`, {
			petGuid: guid,
		});

		setFavorite(true);
	}

	async function removeFavoritePet() {
		await api.delete(`/api/favorite/remove/${datasUser.guid}`, {
			data: {
				petGuid: guid,
			},
		});
		setFavorite(false);
	}

	async function sendEmail() {
		const { uri } = await Print.printToFileAsync({
			html: ` <img
			src=${photo1}
			style="width: 110vw;" />`,
		});

		const genderEmail = gender === "M" ? "Macho" : "Fêmea";
		MailComposer.composeAsync({
			recipients: [`${petsCompany.email}`],
			subject: "Solicitação de adoção",
			body: `Olá ${petsCompany.name}, tenho interesse em adotar o ${typePet} de identificação (numero da identificação aqui), com as seguintes características:
			Cor: ${color},
			Porte:${size},
		Idade: ${age},
		 	Sexo: ${genderEmail},
			a imagem do pet está no anexo.
			`,
			attachments: [uri],
		})
			.then((result) => {
				if (result.status === "sent") {
					Alert.alert(
						"Sucesso",
						"Preenchimento de formulário de solicitação realizado com sucesso."
					);
				} else {
					Alert.alert("Envio de e-mail cancelado ou ocorreu um erro");
				}
			})
			.catch((error) => {
				// Trate o erro, se houver algum problema ao enviar o e-mail
				Alert.alert(
					"Erro ao enviar o e-mail",
					"Seu email não deve ta cadastrado no seu celular"
				);
			});
	}

	function showInfoOng() {
		Alert.alert(
			"Informações de Contato",
			`Nome da Ong: ${petsCompany.name} \n\nEmail da Ong: ${petsCompany.email} \n\nTelefone da Ong: ${petsCompany.phone} \n\n Para fazer doação para ong use a chave pix \n\nChave Pix: ${petsCompany.email}`
		);
	}
	return (
		<Container>
			<Header title={typePet} icon="left" />
			<ContainerInfos>
				<PetDetail
					petDetail={{
						photo1,
						breed,
						age,
						size,
						vaccines,
						gender,
						description,
						color,
						birthDate,
						rating,
						identification,
					}}
				/>

				<ContainerButtonInfo>
					<ContainerButton
						title="Favoritar Pet"
						onPress={!favorite ? favoritePet : removeFavoritePet}
					>
						<AntDesign
							name={!favorite ? "hearto" : "heart"}
							size={24}
							color={colors.primary}
						/>
					</ContainerButton>
					<ContainerButton
						title="Entre em contato com a ONG."
						onPress={showInfoOng}
					/>

					<ContainerButton
						title="Enviar solicitação de adoção"
						onPress={sendEmail}
					/>
				</ContainerButtonInfo>
			</ContainerInfos>
		</Container>
	);
}
