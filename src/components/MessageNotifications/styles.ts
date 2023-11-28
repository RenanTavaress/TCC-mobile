import styled from "styled-components/native";

export const Container = styled.View`
	margin-top: 10px;
	width: 90%;
	height: auto;
	border: 2px solid ${({ theme }) => theme.colors.primary};
	border-radius: 5px;
   padding: 10px;
	margin-bottom: 19px;
`;

export const TextMenssage = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
	font-size: 14px;
`;

export const StatusMenssage = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	color: ${({ theme }) => theme.colors.text_dark};
	font-size: 16px;
   margin-top: 5px;
`;

export const TtileMenssage = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	color: ${({ theme }) => theme.colors.title};
	font-size: 15px;
   margin-top: 5px;
`;

