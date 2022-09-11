import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const CardOngs = styled.View`
	width: 92.5%;
	height: ${RFPercentage(15)}px;
	background-color: ${({ theme }) => theme.colors.shape};
	padding: 15px;
	margin: ${RFValue(8)}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left: ${RFValue(13)}px;
`;
export const TextNameOng = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContaineCardDescription = styled.View`
	height: 100%;
	justify-content: space-between;
	width: 130px;
`;
export const DescriptionOng = styled.Text.attrs({
	numberOfLines: 2,
})`
	font-size: ${RFValue(16)}px;
	
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
export const CityOng = styled.Text.attrs({
	numberOfLines: 2,
})`
	font-size: ${RFValue(12)}px;
	max-width: 136px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
`;
