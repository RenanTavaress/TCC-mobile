import React from "react";
import { CardPreference, TextInfo, DeleteView, TextView } from "./styles";
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
				<TextInfo>{typePet}</TextInfo>
			</TextView>

			<DeleteView onPress={deletePreferences}>
				<FontAwesome name="trash" size={20} color="red" />
			</DeleteView>
		</CardPreference>
	);
}
