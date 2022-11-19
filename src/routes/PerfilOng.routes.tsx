import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { PerfilOng } from "../screens/ScreenOngs/Perfil";
import { EditingOng } from "../screens/ScreenOngs/EditingPerfil";
import { SendRating } from "../screens/ScreenOngs/SendRating";

const AppStack = createStackNavigator();

export const PerfilOngRoutes: React.FC = () => (
	<AppStack.Navigator screenOptions={{ headerShown: false }}>
		<AppStack.Screen name="PerfilOng" component={PerfilOng} />
		<AppStack.Screen name="SendRating" component={SendRating} />
		<AppStack.Screen name="EditingPerfilOng" component={EditingOng} />
		
	</AppStack.Navigator>
);
