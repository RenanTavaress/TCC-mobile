import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
	width: 100%;
	height: ${Platform.OS === "ios" ? RFPercentage(11) : RFPercentage(13)}px;

	background-color: ${({ theme }) => theme.colors.primary};
	flex-direction: row;
`;

export const BackScreen = styled.TouchableOpacity`
	width: 25%;
	height: 100%;

	align-items: center;
	justify-content: flex-end;
	padding-bottom: 9px;
	padding-right: 50px;
	text-align: center;
`;

export const Icon = styled(AntDesign)`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	/* margin-right: 20px; */
`;

export const HeaderText = styled.View`
	width: 50%;
	height: 100%;

	align-items: center;
	justify-content: flex-end;
	padding-bottom: 5px;
`;

export const Text = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
`;

export const ViewContainer = styled.View`
	width: 25%;
	height: 100%;
`;
