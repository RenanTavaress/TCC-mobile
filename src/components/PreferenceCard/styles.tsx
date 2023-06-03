import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const CardPreference = styled.View`
	width: 100%;
	height: ${RFPercentage(15)}px;
	background-color: ${({ theme }) => theme.colors.shape};

	padding: ${RFValue(7)}px ${RFValue(3)}px;
	margin-bottom: ${RFValue(10)}px;
	flex-direction: row;
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TitlePet = styled(TextInfo)`
	font-family: ${({ theme }) => theme.fonts.bold};
`;

export const DeleteView = styled.TouchableOpacity`
	width: 25%;
	align-items: center;
	justify-content: center;
`;

export const TextView = styled.View`
	width: 80%;
	align-items: center;
	justify-content: space-between;

	padding-left: 15px;
	flex-direction: row;
	text-align: center;
`;

export const InfoContainer = styled.View`
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;
`;
