import React, { useContext } from "react";
import { FabButton } from "../../../components/Button/FAB";
import { Header } from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
	PreferenceCard,
} from "../../../components/PreferenceCard";
import { Container, ListPreferences } from "./styles";
import { PreferencesContext } from "../../../contexts/preferences";

type propsLoginOng = NativeStackScreenProps<
	RootStackParamList,
	"EditingPerfil"
>;

export function Preferences() {
	const isFocused = useIsFocused();
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const { preferences, getDatPreferences } = useContext(PreferencesContext);

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
					renderItem={({ item }) => <PreferenceCard {...item} />}
				/>
			</Container>
			<FabButton
				title="+"
				onPress={() => navigation.navigate("createPreferences")}
			/>
		</>
	);
}
