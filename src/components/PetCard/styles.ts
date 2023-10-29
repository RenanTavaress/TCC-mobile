import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface Petprops {
	isReserved: boolean
}

export const CardPet = styled.TouchableOpacity<Petprops>`
	width: 92.5%;
	height: ${RFPercentage(20)}px;
	background-color: ${({ theme }) => theme.colors.shape};
	padding: 15px;
	margin: ${RFValue(8)}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left: ${RFValue(13)}px;
	border-radius: ${RFValue(15)}px;
	opacity: ${props => (props.isReserved ? 0.5 : 1)}; 
`;

export const ContainerImage = styled.View`
	height: 100%;
	width: 50%;
`;

export const ImagePet = styled.Image`
	height: 80%;
	width: 100%;
`;

export const TextNamePet = styled.Text`
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContaineCardDescription = styled.View`
	height: 100%;
	justify-content: space-between;
	width: 43%;
`;

export const  ContainerInfosPets  = styled.View`
	width: 100%;
	height: 35%;
	justify-content: space-between;
`
export const DescriptionPet = styled.Text.attrs({
	numberOfLines: 2,
})`
	font-size: ${RFValue(12)}px;

	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.medium};
`;
export const AgePet = styled.Text.attrs({
	numberOfLines: 2,
})`
	font-size: ${RFValue(10)}px;
	max-width: 136px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContainerReservedText = styled.View<Petprops>`
	height: 100%;
	width: 100%;
	position: absolute;
	align-items: center;
	justify-content: center;
`

export const ReservedText = styled.Text<Petprops>`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.primary};
	position: absolute;
	opacity: 100;
	color:  ${props => (props.isReserved ? props.theme.colors.isReserved: props.theme.colors.success_light)};
	
	

`