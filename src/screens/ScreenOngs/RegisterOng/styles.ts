import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { InputForm } from "../../../components/Form/InputForm";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary};
	height: ${RFValue(70)}px;
	justify-content: flex-end;
	align-items: center;
`;

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	margin-bottom: 5px;
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

	/* border-color: ${({ theme }) => theme.colors.text};
	border-color: #61626210 */

	
`;
