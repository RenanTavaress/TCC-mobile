import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { InputForm } from "../../../components/Form/InputForm";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderContent = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};
	width: 60%;
	height: ${Platform.OS === "ios" ? RFPercentage(12) : RFPercentage(15)}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	text-align: center;
	padding-bottom: 10px;
`;

export const BackScreen = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	padding-bottom: 3px;
`;

export const Icon = styled(AntDesign)`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	margin-left: 10px;
`;

export const ViewContainer = styled.View`
	width: 40%;
`;

export const TextTitle = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(19)}px;
	margin-right: 5.5%;
`;

export const MainForm = styled.ScrollView`
	width: 100%;
	padding: 24px 35px;
`;

export const AdressForm = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
`;

export const ContainerLeftForm = styled.View`
	width: 52%;
`;

export const ContainerRigthForm = styled.View`
	width: 44%;
`;

export const DescriptioInput = styled(InputForm)`
	height: 50px;
`;

export const RegisterButton = styled(ContainerButton)`
	height: ${RFValue(45)}px;
	width: 100%;
`;
