import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import { FormData } from ".";
import { DataPetsProps } from "../../../components/PetCard";

export const Container = styled.View`
	flex: 1;
`;

export const FilterContainer = styled.TouchableOpacity`
	width: 100%;
	height: ${RFValue(40)}px;
	align-items: flex-end;
	margin-top:${RFValue(6)}px ;
	padding-right: ${RFValue(17)}px;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const CleanFilterBox = styled.TouchableOpacity`
	width: ${RFValue(80)}px;
	height: ${RFValue(35)}px;
	border: 2.5px solid ${({ theme }) => theme.colors.primary};
	margin-right: ${RFValue(15)}px;
	border-radius: 15px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 0 5px;
`

export const CleanFilterText = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(13)}px;
	text-align: center;
	margin-top:${RFValue(3)}px ;
`;

export const FilterBox = styled.TouchableOpacity`
	width: ${RFValue(90)}px;
	height: ${RFValue(40)}px;
	border: 2.5px solid ${({ theme }) => theme.colors.primary};
	border-radius: 8px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 0 5px;


`;

export const FilterText = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(17)}px;
	text-align: center;
	margin-top:${RFValue(3)}px ;
`;

export const ContainerPets = styled(
	FlatList as new (
		props: FlatListProps<DataPetsProps>
	) => FlatList<DataPetsProps>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	height: ${RFPercentage(50)}px;
`;
