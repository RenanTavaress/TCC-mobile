import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { PreferencePetProps } from "../components/PreferenceCard";

export interface PreferencesProps {
	breed: string | null;
	gender: string;
	size: string;
	typePet: string;
   guid: string
   deletePreferences: () => void;
}

interface PreferencesContext {
   data: PreferencesProps[]
}

interface GetPreferencesProps {
	children: JSX.Element;
}

export type PreferencesContextProps = {
	preferences: PreferencesProps[];
	setPreferences: (preferencesParams: PreferencesProps[]) => void;
	getDatPreferences: (params: void) => void;
	deletePreferences: (guid: string) => void;
};

export const PreferencesContext = createContext<PreferencesContextProps>({} as PreferencesContextProps);

export function GetPreferences({ children }: GetPreferencesProps) {
	const [preferences, setPreferences] = useState<PreferencesProps[]>([]);

	async function getDatPreferences() {
		const { data } = await api.get<PreferencesContext>("/api/preferences/list");
		//console.log(data.data);
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

	return (
		<PreferencesContext.Provider
			value={{
				preferences,
				setPreferences,
				getDatPreferences,
				deletePreferences,
			}}
		>
			{children}
		</PreferencesContext.Provider>
	);
}
