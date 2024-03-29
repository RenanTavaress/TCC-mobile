import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { InputForm } from "../../../components/Form/InputForm";

export const Container = styled.View`
	flex: 1;
`;

export const ContainerAdd = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
})`
	
	
	height: 100%;
`;

export const FormContainer = styled.View`
	/* height: 100%; */
	width: 100%;
	margin-top: 25px;
	padding: 0 20px;
`;

export const InfoDataPet = styled.View``;

export const ViewSize = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const InfoRadioBtn = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;

	margin: 15px 0;
`;

export const ContainerAge = styled.View`
	width: 30%;
	margin-right: 40px;
`;

export const DescriptioInput = styled(InputForm)`
	height: 50px;
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.bold};
`;

export const TextSize = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ButtonContainer = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`;

export const ImageContainer = styled.View``;

export const ImageLeft = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: space-between;
	margin: 0 10px 10px 0;
	visibility: hidden;
`;

export const ImageButton = styled.View`
	width: 95%;
	height: auto;
	background-color: white;
	border: 1px solid ${({ theme }) => theme.colors.text};
	visibility: hidden;
`;

export const ImagePet = styled.Image`
	height: 150px;
	width: auto;
`;


export const ButtonPickImage = styled(ContainerButton)`
	margin-bottom: 5px;
	width: 100%;

`