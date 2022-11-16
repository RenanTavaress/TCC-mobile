import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import { ListPets } from "../screens/ScreenUser/ListPets";
import { FilterScreen } from "../screens/ScreenUser/FilterScreen";
import { FilterPet } from "../contexts/FilterPet";
import { PetScreen } from "../screens/ScreenUser/PetScreen";

export const ListPetStack: React.FC = () => (
	<FilterPet>
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="listPets" component={ListPets} />
			<Screen name="FilterScreen" component={FilterScreen} />
			<Screen name="petScreen" component={PetScreen} />
		</Navigator>
	</FilterPet>
);
