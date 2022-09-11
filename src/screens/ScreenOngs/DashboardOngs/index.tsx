import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AuthContext from "../../../contexts/auth";

export function Dashboard() {
	const { logOut, signed } = useContext(AuthContext);
	function handleLogout() {
		logOut();
	}
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Text>Logadoooo  com ONGGGG BoaaaAAAA, {signed}</Text>
			<Button title="Logout" onPress={handleLogout} />
		</View>
	);
}
