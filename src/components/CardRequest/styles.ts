import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const CardView = styled.View`
	width: 90%;
	height: ${RFPercentage(20)}px;
	background-color: ${({ theme }) => theme.colors.shape};
	margin-top: ${RFValue(15)}px;
	padding: 15px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-radius: ${RFValue(15)}px;
`;

export const TextNamePet = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ImagePet = styled.Image`
	height: 80%;
	width: 100%;
`;

export const ContainerImage = styled.View`
	height: 100%;
	width: 50%;
	/* / margin-right: ${RFValue(50)}px; */
	padding-bottom: 13px;
`;
export const ButtoView = styled.View`
	height: 100%;
	width: 45%;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
`;

export const CancelRequestButton = styled.TouchableOpacity`
	height: 30%;
	/* / width: ${RFValue(60)}px; */
	border-radius: ${RFValue(60)}px;
`;

export const IconReject = styled(AntDesign)`
	/* color: ${({ theme }) => theme.colors.attention}; */
	font-size: ${RFValue(28)}px;

	color: ${({ theme, name }) =>
		name === "closecircleo" ? theme.colors.attention : theme.colors.primary};
`;
