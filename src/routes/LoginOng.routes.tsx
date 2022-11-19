import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from "../screens/Welcome";

import { LoginOng } from "../screens/ScreenOngs/LoginOng";
import { LoginUser } from "../screens/ScreenUser/LoginUser";
import { RegisterOng } from "../screens/ScreenOngs/RegisterOng";
import { RegisterUser } from "../screens/ScreenUser/RegisterUser";
import { ForgotPassword } from "../screens/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function LoginOngRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="LoginOng" component={LoginOng} />
			<Stack.Screen name="User" component={LoginUser} />
			<Stack.Screen name="RegisterOng" component={RegisterOng} />
			<Stack.Screen name="RegisterUser" component={RegisterUser} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
		</Stack.Navigator>
	);
}
