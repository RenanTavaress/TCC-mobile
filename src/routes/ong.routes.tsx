import React from "react";
import { Dashboard } from "../screens/ScreenOngs/DashboardOngs";

import { createStackNavigator } from "@react-navigation/stack";
import { AddPet } from "../screens/ScreenOngs/AddPets";

const AppStack = createStackNavigator();

export const OngRoutes: React.FC = () => (
	<AppStack.Navigator screenOptions={{ headerShown: false }}>
		<AppStack.Screen name="Dashboard" component={Dashboard} />
		<AppStack.Screen name="AddPet" component={AddPet} />
	</AppStack.Navigator>
);
