import React from "react";
import { Perfil } from "../screens/ScreenUser/Perfil";
import { EditingPerfil } from "../screens/ScreenUser/EditingPerfil";
import { createStackNavigator } from "@react-navigation/stack";
import { OngScreen } from "../screens/ScreenUser/OngScreen";

const { Navigator, Screen } = createStackNavigator();

export const UserStacks: React.FC = () => (
	<Navigator screenOptions={{ headerShown: false }}>
		<Screen name="Perfil User" component={Perfil} />
		<Screen name="EditingPerfil" component={EditingPerfil} />
	</Navigator>
);
