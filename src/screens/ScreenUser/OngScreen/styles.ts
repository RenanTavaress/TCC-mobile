import { FlatList, FlatListProps, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DataPetsProps } from "../../../components/PetCard";

export const Container = styled.View`
	flex: 1;
`;

export const HeaderOng = styled.View`
	background-color: ${({theme}) => theme.colors.shape};
	padding: 8px;

`

export const Description = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(20)}px;

`

export const City = styled.Text`` 

export const District = styled.Text``



export const ContainerPets = styled(
	FlatList as new (
		props: FlatListProps<DataPetsProps>
	) => FlatList<DataPetsProps>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	width: 100%;
	height: 100%;
	padding-top: ${RFValue(7)}px;
`;
