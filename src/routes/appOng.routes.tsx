// as rotas que o usuario vai poder navegar enquanto ele nao estiver autenticado na aplicação
import React from "react";
import { Dashboard } from "../screens/ScreenOngs/DashboardOngs";

import { createStackNavigator } from "@react-navigation/stack";
import { DashboardUser } from "../screens/ScreenUser/DashboardUser";

const AppStack = createStackNavigator();

export const AppOngRoutes: React.FC = () => (
	<AppStack.Navigator screenOptions={{ headerShown: false }}>
		<AppStack.Screen name="Dashboard" component={Dashboard} />
	</AppStack.Navigator>
);
