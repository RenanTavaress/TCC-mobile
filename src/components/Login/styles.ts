import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
	flex: 1;
`;

export const LoginContainer = styled.View`
	width: 100%;
	height: 100%;

	justify-content: center;
	align-items: center;
`;

export const InputLogin = styled.View`
	width: ${RFValue(250)}px;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`;

export const ButtonLogin = styled.TouchableOpacity.attrs({
	activeOpacity: 0.5,
})`
	height: ${RFValue(40)}px;
	width: ${RFValue(150)}px;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 8px;

	justify-content: center;
	align-items: center;
`;

export const ButtonText = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(19)}px;
	text-align: center;
`;

export const Link = styled.TouchableOpacity.attrs({
	activeOpacity: 0.5,
})`
	margin-bottom: ${RFValue(7)}px

`;

export const LinkRegister = styled.Text.attrs({
	textDecorationLine: "underline",
})`
	color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(13)}px;
`;
