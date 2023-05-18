import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

interface Prop {
	isActive: boolean;
}

export const Container = styled.View`
	flex: 1;
`;

export const MainInfo = styled.ScrollView`
	height: 100%;
	width: 100%;
	background-color: ${theme.colors.shape};
	padding: 15px;
`;

export const HearderInfo = styled.View`
	height: 20%;
	width: 100%;
`;

export const Title = styled.Text`
	font-size: ${RFValue(22)}px;
	color: ${theme.colors.title};
	font-weight: 800;
`;

export const Linha = styled.View`
	height: 1.5px;
	width: 100%;
	margin: 20px 0 20px 0;
	background-color: ${theme.colors.title};
`;

export const Span = styled.Text<Prop>`
	font-size: ${RFValue(16)}px;
	color: ${theme.colors.text};
	font-weight: 600;
	margin-top: ${({ isActive }) => (isActive ? RFValue(25) : 0)}px;
`;

export const VideoCover = styled.View`
	width: 100%;
	margin-top: ${RFValue(25)}px;
`;

export const PixKey = styled.Text`
	margin-top: 10px;
	font-size: ${RFValue(18)}px;
	color: ${theme.colors.title};
	font-weight: 800;
`;

export const PixView = styled.View`
	margin-top: 15px;
`;

