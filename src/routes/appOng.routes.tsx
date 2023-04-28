import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

import { OngRoutes } from "./ong.routes";
import { PerfilOngRoutes } from "./PerfilOng.routes";
import { DataOng } from "../contexts/DataOng";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppOngRoutes: React.FC = () => {
	const theme = useTheme();
	return (
		<DataOng>
			<Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: theme.colors.primary,
					tabBarInactiveTintColor: theme.colors.text,
					tabBarLabelPosition: "beside-icon",
					tabBarStyle: {
						height: Platform.OS === "ios" ? 65 : 55,
						paddingVertical: Platform.OS === "ios" ? 0 : 0,
					},
				}}
			>
				<Screen
					name="Seus pets"
					component={OngRoutes}
					options={{
						tabBarIcon: ({ size, color }) => (
							<MaterialIcons name="pets" size={size} color={color} />
						),
					}}
				/>
				<Screen
					name="Perfil"
					component={PerfilOngRoutes}
					options={{
						tabBarIcon: ({ size, color }) => (
							<FontAwesome5 name="user" size={size} color={color} />
						),
					}}
				/>
			</Navigator>
		</DataOng>
	);
};
