import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RequestPets } from "../contexts/RequestPets";
import { RequestOng } from "../screens/ScreenOngs/RequestsOng";
import { DataPet } from "../contexts/DataPet";
const { Navigator, Screen } = createStackNavigator();

export const RequestOngStack: React.FC = () => (
	<DataPet>
		{/* <RequestPets> */}
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="RequestOng" component={RequestOng} />
			</Navigator>
		{/* </RequestPets> */}
	</DataPet>
);
