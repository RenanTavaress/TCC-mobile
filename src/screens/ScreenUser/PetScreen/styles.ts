import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
`;

export const ContainerPetInfo = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	flex: 1;
	padding: ${RFValue(15)}px;
`;

export const ContainerInfo = styled.View``
export const ContainerHeath = styled.View``


export const TextInfo = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
export const InfoPet = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
