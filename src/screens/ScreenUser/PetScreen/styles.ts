import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
`;

export const ContainerInfos = styled.View`
	justify-content: space-between;
	//align-items: center;
	flex: 1;

`

export const ContainerPetInfo = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	padding: ${RFValue(15)}px;
	flex-direction: row;
	height: auto;
`;

export const ContainerInfo = styled.View`
	width: 50%;
`;
export const ContainerHeath = styled.View`
	width: 50%;
`;

export const ContainerDescription = styled.View`
	//flex: auto;
	justify-content: flex-start;
	align-items: flex-start;
	height: auto;
	padding: ${RFValue(15)}px;
	margin: 0 0 15px 0;
	background-color: ${({ theme }) => theme.colors.shape};
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
export const InfoPet = styled.Text`
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;


export const ContainerButtonInfo = styled.View`
	align-items: center;
	justify-content: center;

`