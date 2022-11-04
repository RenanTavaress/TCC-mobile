import React from "react";


import { createStackNavigator } from "@react-navigation/stack";
import { PerfilOng } from "../screens/ScreenOngs/Perfil";
import { EditingOng } from "../screens/ScreenOngs/EditingPerfil";


const AppStack = createStackNavigator();

export const PerfilOngRoutes: React.FC = () => (
	<AppStack.Navigator screenOptions={{ headerShown: false }}>
		<AppStack.Screen name="PerfilOng" component={PerfilOng} />
		<AppStack.Screen name="EditingPerfilOng" component={EditingOng} />
	</AppStack.Navigator>
);
