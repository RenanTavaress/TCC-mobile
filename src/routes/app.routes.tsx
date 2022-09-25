// as rotas que o usuario vai poder navegar enquanto ele nao estiver autenticado na aplicação
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardUser } from "../screens/ScreenUser/DashboardUser";

import { UserStacks } from "./userStacks.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes: React.FC = () => (
	<Navigator screenOptions={{ headerShown: false }}>
		<Screen name="DashboardUser" component={DashboardUser} />
		<Screen name="Perfil" component={UserStacks} />
	</Navigator>
);
