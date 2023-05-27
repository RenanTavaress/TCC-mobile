import React from "react";
import { FabButton } from "../../../components/Button/FAB";
import { Header } from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useIsFocused } from "@react-navigation/native";
import {
	PreferenceCard,
	PreferencePetProps,
} from "../../../components/PreferenceCard";
import { Container, ListPreferences } from "./styles";

type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPerfil"
>;

export function Preferences() {
	const isFocused = useIsFocused();
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const [preferences, setPreferences] = useState<PreferencePetProps[]>([]);

	async function getDatPreferences() {
		const { data } = await api.get("/api/preferences/list");
		setPreferences(data.data);
	
	}

	async function deletePreferences(guid: string) {
		const getPreference = preferences.find(
			(preferenceGuid) => preferenceGuid.guid === guid
		);
		await api.delete(`/api/preferences/delete/guid/${getPreference?.guid}`);
		const updateScreen = preferences.filter(
			(preference) => preference.guid !== guid
		);
		setPreferences(updateScreen);
	}

	useEffect(() => {
		if (isFocused) {
			getDatPreferences();
		}
	}, [isFocused]);

	return (
		<>
			<Header title="Suas Preferências" icon="left" />
			<Container>
				<ListPreferences
					data={preferences}
					keyExtractor={(item) => item.guid}
					renderItem={({ item }) => (
						<PreferenceCard
							{...item}
							deletePreferences={() => deletePreferences(item.guid)}
						/>
					)}
				/>
			</Container>
			<FabButton
				title="+"
				onPress={() => navigation.navigate("createPreferences")}
			/>
		</>
	);
}
