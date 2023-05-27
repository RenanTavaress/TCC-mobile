import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "../../global/styles/theme";

interface TouchProps {
	isActive: boolean;
}

export const Container = styled.View`
	flex: 1;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`;

// export const Header = styled.View`
// 	width: 100%;
// 	/* height: ${RFValue(113)}px; */

// 	background-color: ${({ theme }) => theme.colors.primary};
// 	justify-content: flex-end;
// 	align-items: center;
// 	padding-bottom: ${RFValue(19)}px;
// `;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;
`;

export const Categorys = styled.TouchableOpacity<TouchProps>`
	width: 100%;
	padding: ${RFValue(15)}px;

	flex-direction: row;
	align-items: center;

	background-color: ${({ isActive }) =>
		isActive ? theme.colors.primary_light : theme.colors.background};
`;

export const Icon = styled(MaterialCommunityIcons)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	margin-right: 5px;
`;

export const CategoryName = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text_dark};
`;

export const Separetor = styled.View`
	height: 1px;
	width: 100%;

	background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
	width: 100%;

	padding: 15px;
	align-items: center;
	justify-content: flex-end;
`;
