import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DataPetsProps } from "../../../components/PetCard";

export const Container = styled.View`
	flex: 1;
	align-items: center;
`;


export const ContainerRequestPets = styled(
	FlatList as new (
		props: FlatListProps<DataPetsProps>
	) => FlatList<DataPetsProps>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	
`;