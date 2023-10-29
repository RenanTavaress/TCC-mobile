import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const CardView = styled.View`
	width: 90%;
	height: ${RFPercentage(20)}px;
	background-color: ${({ theme }) => theme.colors.shape};
	padding: 15px;

	margin: ${RFValue(15)}px 0 0 7.5px;
	border-radius: ${RFValue(15)}px;
`;

export const TextNamePet = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
	width: 50%;
`;

export const ContainerImage = styled.View`
	width: 100%;
	height: auto;
	flex-direction: row;
`;

export const ImagePet = styled.Image`
	height: 100%;
	width: 100%;
`;

export const ImageContainer = styled.View`
	width: 60%;
	height: auto;
	margin-bottom: 20px;
`;

export const ContainerText = styled.View`
	height: auto;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;
export const ButtoView = styled.View`
	height: 100%;
	width: 40%;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
`;

export const CancelRequestButton = styled.TouchableOpacity`
	height: 30%;

	border-radius: ${RFValue(60)}px;
`;

export const IconReject = styled(AntDesign)`
	font-size: ${RFValue(28)}px;

	color: ${({ theme, name }) =>
		name === "closecircleo" ? theme.colors.attention : theme.colors.primary};
`;

export const TextIdentificationPet = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
