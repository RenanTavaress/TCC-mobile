import { FlatList, FlatListProps, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DataPetsProps } from "../../../components/PetCard";

export const Container = styled.View`
	flex: 1;
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

export const HeaderOng = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	height: ${RFPercentage(32)}px;
`;

export const OngImg = styled.Image`
	width: 100%;
	height: 45%;
`;

export const ContainerOngInfo = styled.View`
	margin-top: ${RFValue(15)}px;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin: 0 0 auto 0
`;

export const AdressOng = styled.View`
	width: 50%;
	padding-left: 12px;
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const InfOngs = styled.Text`
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const InfoRegion = styled.Text`
	font-size: ${RFValue(10)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContactOng = styled.View`
	width: 50%;
	padding-left: 25px;
	padding-right: 20px;
	justify-content: center;
`;


export const Description = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(15)}px;
`;

export const ContainerDescription = styled.View`
	flex: auto;
	justify-content: flex-start;
	align-items: flex-start;
	height: auto;
	padding: 0 ${RFValue(15)}px;
	margin: 0 0 15px 0;
	background-color: ${({ theme }) => theme.colors.shape};
`