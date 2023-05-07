import React from "react";
import { Perfil } from "../screens/ScreenUser/Perfil";
import { FavoriteScreen } from "../screens/ScreenUser/FavoriteScreen";
import { EditingPerfil } from "../screens/ScreenUser/EditingPerfil";
import { createStackNavigator } from "@react-navigation/stack";
import { OngScreen } from "../screens/ScreenUser/OngScreen";
import { PetScreen } from "../screens/ScreenUser/PetScreen";
import { FavoritePet } from "../contexts/FavoritesPets";
import { Preferences } from "../screens/ScreenUser/Preferences";
import { CreatePreferences } from "../screens/ScreenUser/CreatePreferences";

const { Navigator, Screen } = createStackNavigator();

export const UserStacks: React.FC = () => (
	<FavoritePet>
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="Perfil User" component={Perfil} />
			<Screen name="EditingPerfil" component={EditingPerfil} />
			<Screen name="favoritesPets" component={FavoriteScreen} />
			<Screen name="preferences" component={Preferences} />
			<Screen name="createPreferences" component={CreatePreferences} />
			<Screen name="petScreen" component={PetScreen} />
		</Navigator>
	</FavoritePet>
);
