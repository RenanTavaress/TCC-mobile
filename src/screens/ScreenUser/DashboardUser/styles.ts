import { FlatList, FlatListProps, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
//import { DataOngsProps } from "../../../components/OngCard";
import { DataOngsProps2 } from "../../../components/OngCard";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;

	height: ${Platform.OS === "ios" ? RFPercentage(12) : RFPercentage(15)}px;

	background-color: ${({ theme }) => theme.colors.primary};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 10px;
`;

export const TextTitle = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;
`;

export const ContainerOngs = styled(
	FlatList as new (
		props: FlatListProps<DataOngsProps2>
	) => FlatList<DataOngsProps2>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	width: 100%;
	height: 100%;
	padding-top: ${RFValue(7)}px;
`;
