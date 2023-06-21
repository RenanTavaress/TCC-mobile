import React, { useContext } from "react";
import {
	CardPreference,
	TextInfo,
	DeleteView,
	TextView,
	InfoContainer,
	TitlePet,
} from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { PreferencesContext } from "../../contexts/preferences";

export interface PreferencePetProps {
	guid: string;
	typePet: string;
	breed: string | null;
	size: string;
	gender: string;
	deletePreferences: () => void;
}

export function PreferenceCard({
	typePet,
	breed,
	size,
	gender,
	guid,
}: PreferencePetProps) {
	const { deletePreferences } = useContext(PreferencesContext);
	return (
		<CardPreference>
			<TextView>
				<InfoContainer>
					<TitlePet>Raça: {typePet}</TitlePet>
					<TextInfo>
						Porte:{" "}
						{size == "pequeno"
							? "Pequeno"
							: size == "medio"
							? "Médio"
							: "Grande"}
					</TextInfo>
				</InfoContainer>
				<InfoContainer>
					{breed && <TextInfo>{breed}</TextInfo>}
					<TextInfo>{gender === "M" ? "Macho" : "Fêmea"}</TextInfo>
				</InfoContainer>
			</TextView>

			<DeleteView onPress={() => deletePreferences(guid)}>
				<FontAwesome name="trash" size={20} color="red" />
			</DeleteView>
		</CardPreference>
	);
}
