import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
   flex: 1;
`

export const FormContainer = styled.View`
   padding: 10px;

`

export const RadioContainer = styled.View`
	width: 90%;
	flex-direction: row;
	justify-content: space-between;

	margin: 15px 0;
`;

export const ViewSize = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const TextSize = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Footer = styled.View`
	margin-top: ${RFValue(10)}px;
	align-items: center;
	justify-content: center;
`;