import React, { useContext } from "react";
import { View, ActivityIndicator, Alert } from "react-native";

import { AppRoutes } from "./app.routes";
import AuthContext from "../contexts/auth";
import LoginOngRoutes from "./LoginOng.routes";
import { AppOngRoutes } from "./appOng.routes";
import { DataUser } from "../contexts/dataUsers";

export const Routes = () => {
	const { signed, loading, user } = useContext(AuthContext);
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#999" />
			</View>
		);
	}

	if (user?.type === "COMPANY" && signed) {
		return <AppOngRoutes />;
	} else if (user?.type === "USER" && signed) {
		return <AppRoutes />;
	}

	return <LoginOngRoutes />;
};
