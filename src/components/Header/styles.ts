import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";


export const Container = styled.View`
	width: 100%;
	height: ${Platform.OS === "ios" ? RFPercentage(6) : RFPercentage(10)}px;

	background-color: ${({ theme }) => theme.colors.primary};
	flex-direction: row;
`;

export const BackScreen = styled.TouchableOpacity`
	width: 25%;
	height: 100%;

	align-items: center;
	justify-content: center;
	padding-top: 8px;
	padding-right: 50px;
	text-align: center;
`;

export const Icon = styled(AntDesign)`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.text_dark};
`;

export const HeaderText = styled.View`
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: center;
	padding-top: 8px;
`;

export const Text = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
`;

export const NotificationContainer = styled.TouchableOpacity`
	width: 25%;
	height: 100%;
	/* background-color: red; */

	align-items: center;
	justify-content: center;
	padding-top: 8px;
`;




export const ContainerIconNotification = styled.View`
  position: relative;
`;

export const IconNotification = styled(Ionicons)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Badge = styled.View`
  position: absolute;
  top: -9px;
  left: -3px;
  background-color: red;
  border-radius: 50px;
  padding: 2px;
  height: auto;
  width: auto;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: ${RFValue(12)}px;
`;


