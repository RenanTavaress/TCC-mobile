import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: ${RFPercentage(50)}px;
	position: absolute;
	bottom: 70px;
	right: 40px;
	background-color: ${({theme}) => theme.colors.primary};
   height: 60px;
   width: 60px;
`;

export const Title = styled.Text`
	margin: 5px 5px 10px 5px;
	font-size: 35px;
	color: ${({theme}) => theme.colors.shape};
	font-family: ${({theme}) => theme.fonts.medium};
	text-align: center;
	
`;
