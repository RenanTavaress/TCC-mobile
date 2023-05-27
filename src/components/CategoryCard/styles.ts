import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

export const Container = styled.TouchableOpacity.attrs({
   activeOpacity: 0.7
})`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.shape};

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 18px 16px;
	margin-bottom: 10px;
`;

export const TitleCategory = styled.Text`
	color: ${({ theme }) => theme.colors.text};

	font-family: ${({ theme }) => theme.fonts.regular};

	font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Entypo)`
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(20)}px;
`;
