import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TextInput).attrs((props) => ({
	placeholderTextColor: props.theme.colors.text,
}))`
	width: 100%;
	height: ${RFValue(42)}px;
	padding: 0 8px;
	margin-bottom: 15px;

	border-color: ${({ theme }) => theme.colors.primary};
	border-width: 1.9px;
	border-radius: 5px;
`;
