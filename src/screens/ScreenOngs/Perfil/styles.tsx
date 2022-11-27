import styled from "styled-components/native";
import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
	flex: 1;
`;

export const ContainerInfo = styled.View`
	padding: 0 35px;

	margin-top: ${RFPercentage(2)}px;
	justify-content: space-between;
`;

export const PefilInformations = styled.View`
	margin-top: 30px;
	justify-content: center;
	align-items: center;
	/* background-color: red; */
`;
export const TextInfo = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(16)}px;
	margin-bottom: 5px;
`;
export const InfoUser = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	margin-bottom: 5px;
`;

export const ContainerBtn = styled.View`
	align-items: center;
	margin-bottom: ${RFValue(15)}px;
`;

export const TextTitle = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(16)}px;
	margin: 25px 0 3px 0;
	padding-left: 40px;
`;

export const AdressInfo = styled.View`
	width: 100%;
	height: auto;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 25px;
	/* background-color: blue; */
`;
export const AdressLeft = styled.View`
	width: 50%;
	padding-left: 40px;
`;
export const AdressRigth = styled.View`
	width: 50%;
	padding-left: 45px;
`;
