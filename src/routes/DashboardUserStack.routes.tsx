import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OngScreen } from "../screens/ScreenUser/OngScreen";
const { Navigator, Screen } = createStackNavigator();
import { DashboardUser } from "../screens/ScreenUser/DashboardUser";
import { PetScreen } from "../screens/ScreenUser/PetScreen";

export const DashboardUserStack: React.FC = () => (
	<Navigator screenOptions={{ headerShown: false }}>
		<Screen name="DashboardUser" component={DashboardUser} />
		<Screen name="ongScreen" component={OngScreen} />
		<Screen name="petScreen" component={PetScreen} />
	</Navigator>
);
