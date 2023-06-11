import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const ContainerPetInfo = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	padding: ${RFValue(15)}px;
	flex-direction: row;
	height: auto;
`;

export const ContainerInfo = styled.View`
	width: 50%;
`;
export const ContainerHeath = styled.View`
	width: 50%;
`;

export const ContainerDescription = styled.View`
	//flex: auto;
	justify-content: flex-start;
	align-items: flex-start;
	height: auto;
	padding: ${RFValue(15)}px;
	margin: 0 0 15px 0;
	background-color: ${({ theme }) => theme.colors.shape};
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
	margin-bottom: ${RFValue(2)}px;
`;
export const InfoPet = styled.Text`
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
	margin-bottom: ${RFValue(10)}px;
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
	width: 100%;
	height: auto;
	background-color: white;
	border: 1px solid ${({ theme }) => theme.colors.text};
	visibility: hidden;
`;

export const ImagePet = styled.Image`
	height: 250px;
	width: auto;
`;

export const ContainerRating = styled.View`
	height: auto;
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.shape};


`
