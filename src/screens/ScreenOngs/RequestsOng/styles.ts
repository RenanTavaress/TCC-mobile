import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DataPetsProps } from "../../../components/PetCard";

export const Container = styled.View`
	flex: 1;
	align-items: flex-end;
`;


export const ContainerRequestPets = styled(
	FlatList as new (
		props: FlatListProps<DataPetsProps>
	) => FlatList<DataPetsProps>
).attrs({
	showsVerticalScrollIndicator: false,
})`
`;

export const UpdateViewContainer = styled.View`
	width: 100%;
	height: 35px;
	//background-color: red;
	align-items: flex-end;
	justify-content: center;

`

export const UpdateViewButton = styled.TouchableOpacity`
	width: 35%;
	height: 80%;
	border: 2px solid ${({ theme }) => theme.colors.primary};
	justify-content: center;
	align-items: center;
	margin-right: 15px;
	flex-direction: row;

`

export const UpdateViewText = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(13)}px;

	margin-left: 10px;

`