import React, { useContext } from "react";
import {
	CardView,
	ImagePet,
	TextNamePet,
	CancelRequestButton,
	ContainerImage,
	ButtoView,
	IconReject,
} from "./styles";
import api from "../../services/api";

interface SomeDataPetsProps {
	typePet: string;
	photo1: string;
	guid: string;
	handleCancelCard: (param: string) => void;
	typeUser: string;
}

export function CardRequest({
	typePet,
	photo1,
	guid,
	handleCancelCard,
	typeUser,
}: SomeDataPetsProps) {
	async function cancelRequest() {
		await api.put(`/api/pet/cancel/reserve/guid/${guid}`);
		handleCancelCard(guid);
	}

	async function aceptRequest() {
		await api.put(`/api/pet/adopt/guid/${guid}`);
		handleCancelCard(guid);
	}

	return (
		<CardView>
			<ContainerImage>
				<TextNamePet>{typePet}</TextNamePet>
				<ImagePet
					source={{
						uri: photo1,
					}}
				/>
			</ContainerImage>
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
		</CardView>
	);
}
