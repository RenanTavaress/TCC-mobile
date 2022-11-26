import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)`
	width: ${RFValue(135)}px;
	height: ${RFValue(35)}px;
	background: ${({ theme }) => theme.colors.shape};
	border-color: ${({ theme }) => theme.colors.primary};
	border-width: ${RFValue(0.9)}px;
	border-radius: 8px;

	justify-content: center;
	align-items: center;

	margin-bottom: ${RFValue(55)}px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark};

	font-family: ${({ theme }) => theme.fonts.regular};
`;
