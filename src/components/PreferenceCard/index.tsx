import React from "react";
import { CardPreference, TextInfo, DeleteView, TextView, InfoContainer, TitlePet } from "./styles";
import { FontAwesome } from "@expo/vector-icons";

export interface PreferencePetProps {
	guid: string;
	typePet: string;
	age?: string;
	breed: string;
	size?: string;
	gender: string;
	deletePreferences: () => void;
}

export function PreferenceCard({
	typePet,
	age,
	breed,
	size,
	gender,
	guid,
	deletePreferences,
}: PreferencePetProps) {
	return (
		<CardPreference>
			<TextView>
				<InfoContainer>
					<TitlePet>Raça: {typePet}</TitlePet>
					<TextInfo>Porte: {size == 'pequeno' ? 'Pequeno' : size == 'medio'? 'Médio' : 'Grande'}</TextInfo>
				</InfoContainer>
				<InfoContainer>
					{breed && <TextInfo>{breed}</TextInfo>}
					<TextInfo>{gender === "M" ? "Macho": "Fêmea"}</TextInfo>
				</InfoContainer>
			</TextView>

			<DeleteView onPress={deletePreferences}>
				<FontAwesome name="trash" size={20} color="red" />
			</DeleteView>
		</CardPreference>
	);
}
