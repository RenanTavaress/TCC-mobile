// as rotas que o usuario vai poder navegar enquanto ele nao estiver autenticado na aplicação
import React from "react";
import { Dashboard } from "../screens/ScreenOngs/DashboardOngs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createStackNavigator } from "@react-navigation/stack";
import { DashboardUser } from "../screens/ScreenUser/DashboardUser";
import { Perfil } from "../screens/ScreenUser/Perfil";

const {Navigator, Screen} = createBottomTabNavigator();

export const AppRoutes: React.FC = () => (
	<Navigator screenOptions={{ headerShown: false }}>
		<Screen name="DashboardUser" component={DashboardUser} />
		<Screen name="Perfil" component={Perfil} />
	</Navigator>
);
