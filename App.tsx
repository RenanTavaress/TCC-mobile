import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import * as SplashScreen from "expo-splash-screen";
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
	SplashScreen.preventAutoHideAsync();
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	SplashScreen.hideAsync();

	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</NavigationContainer>
		</ThemeProvider>
	);
}
