import React, { useContext } from "react";
import {
	CardView,
	ImagePet,
	TextNamePet,
	CancelRequestButton,
	ContainerImage,
	ButtoView,
	IconReject,
	ContainerText,
	TextIdentificationPet,
	ImageContainer,
} from "./styles";
import api from "../../services/api";
import { Alert } from "react-native";

interface SomeDataPetsProps {
	typePet: string;
	photo1: string;
	guid: string;
	handleCancelCard: (param: string) => void;
	typeUser: string;
	identification: string;
}

export function CardRequest({
	typePet,
	photo1,
	guid,
	handleCancelCard,
	typeUser,
	identification,
}: SomeDataPetsProps) {
	async function cancelRequest() {
		await api.put(`/api/pet/cancel/reserve/guid/${guid}`);
		handleCancelCard(guid);
		Alert.alert("Cancelado!", "Você cancelou a solicitação de reserva");
	}

	async function aceptRequest() {
		await api.put(`/api/pet/adopt/guid/${guid}`);
		handleCancelCard(guid);
		Alert.alert("Sucesso!", "Você aceitou a solicitação de reserva");
	}

	return (
		<CardView>
			<ContainerText>
				<TextNamePet>{typePet}</TextNamePet>
				<TextIdentificationPet>ID: {identification}</TextIdentificationPet>
			</ContainerText>

			<ContainerImage>
				<ImageContainer>
					<ImagePet
						source={{
							uri: photo1,
						}}
					/>
				</ImageContainer>

				<ButtoView>
					{typeUser == "COMPANY" && (
						<CancelRequestButton>
							<IconReject name="checkcircleo" onPress={aceptRequest} />
						</CancelRequestButton>
					)}

					<CancelRequestButton>
						<IconReject name="closecircleo" onPress={cancelRequest} />
					</CancelRequestButton>
				</ButtoView>
			</ContainerImage>
		</CardView>
	);
}
