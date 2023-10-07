import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RequestPet } from "../screens/ScreenUser/RequestPet";
import { RequestPets } from "../contexts/RequestPets";
import { RequestOng } from "../screens/ScreenOngs/RequestsOng";
import { DataPet } from "../contexts/DataPet";
const { Navigator, Screen } = createStackNavigator();

export const RequestUserStack: React.FC = () => (
	<DataPet>
		{/* <RequestPets> */}
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="RequestPet" component={RequestPet} />
			</Navigator>
		{/* </RequestPets> */}
	</DataPet>
);
