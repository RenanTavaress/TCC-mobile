// as rotas que o usuario vai poder navegar enquanto ele nao estiver autenticado na aplicação
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	MaterialIcons,
	FontAwesome5,
	MaterialCommunityIcons,
	Entypo
} from "@expo/vector-icons";
import { UserStacks } from "./userStacks.routes";
import { DataUser } from "../contexts/dataUsers";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Donation } from "../screens/ScreenUser/Donation";

import { ListPetStack } from "./FilterPet.routes";
import { RequestUserStack } from "./Request.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes: React.FC = () => {
	const theme = useTheme();
	return (
		<DataUser>
			<Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: theme.colors.primary,
					tabBarInactiveTintColor: theme.colors.text,
					tabBarLabelPosition: "beside-icon",
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						height: Platform.OS === "ios" ? 65 : 60,
						paddingVertical: Platform.OS === "ios" ? 0 : 0,
					},
				}}
			>
				{/* <Screen
					name="Ongs"
					component={DashboardUserStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<FontAwesome5 name="house-user" size={size} color={color} />
						),
					}}
				/> */}
				<Screen
					name="Pets"
					component={ListPetStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<MaterialIcons name="pets" size={size} color={color} />
						),
					}}
				/>
				<Screen
					name="Perfil"
					component={UserStacks}
					options={{
						tabBarIcon: ({ size, color }) => (
							<FontAwesome5 name="user-alt" size={size} color={color} />
						),
					}}
				/>

				<Screen
					name="Requisição"
					component={RequestUserStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<FontAwesome5 name="arrow-up" size={size} color={color} />
						),
					}}
				/>

				<Screen
					name="Doação"
					component={Donation}
					options={{
						tabBarIcon: ({ size, color }) => (
							<MaterialCommunityIcons
								name="hand-heart"
								size={size}
								color={color}
							/>
						),
					}}
				/>
			</Navigator>
		</DataUser>
	);
};
