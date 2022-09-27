import styled from "styled-components/native";
import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;

	height: ${Platform.OS === "ios" ? RFPercentage(12) : RFPercentage(15)}px;

	background-color: ${({ theme }) => theme.colors.primary};
	padding-bottom: 10px;
	align-items: center;
	justify-content: flex-end;
	
`;

export const TextTitle = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;
`;

export const ContainerInfo = styled.View`
	height: 80%;

	margin-top: ${RFPercentage(7)}px;
	justify-content: space-between;
`;

export const PefilInformations = styled.View`
	height: 60%;
	
	justify-content: center;
	align-items: center;
`;
export const TextInfo = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(20)}px;
	margin-bottom: 5px;
`;
export const InfoUser = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(17)}px;
	margin-bottom: 5px;
`;

export const ContainerBtn = styled.View`
   align-items: center;
   padding-bottom: ${RFValue(50)}px;
   /* /background-color: ${({ theme }) => theme.colors.attention}; */

`;
