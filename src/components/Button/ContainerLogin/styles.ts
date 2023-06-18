import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";

interface PropsColor {
	color?: string;
}

export const Container = styled(TouchableOpacity)`
	width: ${RFValue(150)}px;
	height: ${RFValue(50)}px;
	background: ${({ theme }) => theme.colors.shape};
	border-color: ${({ theme }) => theme.colors.primary};
	border-width: ${RFValue(0.9)}px;
	border-radius: 8px;

	justify-content: space-around;
	align-items: center;
	flex-direction: row;
	padding: ${RFValue(5)}px;
	margin-top: ${RFValue(15)}px;
	margin-bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text<PropsColor>`
	color: ${(props) => props.color || theme.colors.text_dark};

	font-family: ${({ theme }) => theme.fonts.regular};
`;
