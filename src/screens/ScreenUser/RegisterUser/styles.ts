import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { InputForm } from "../../../components/Form/InputForm";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
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
