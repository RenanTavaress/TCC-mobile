import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFPercentage(16)}px;

	justify-content: flex-end;
	align-items: center;
`;

export const TitleText = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(24)}px;
`;

export const ChooseLoginContainer = styled.View`
	width: 100%;
	height: 85%;
	justify-content: center;
	align-items: center;
`;
export const ChooseLogin = styled.TouchableOpacity.attrs({
	activeOpacity: 0.5,
})`
	width: ${RFValue(175)}px;
	height: ${RFValue(53)}px;
	background: ${({ theme }) => theme.colors.shape};
	border-color: ${({ theme }) => theme.colors.primary};
	border-width: ${RFValue(0.9)}px;
	border-radius: 8px;

	justify-content: center;
	align-items: center;

	margin-bottom: ${RFValue(55)}px;
`;

export const TextLogin = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};

	font-family: ${({ theme }) => theme.fonts.regular};
`;
