import styled from "styled-components/native";

export const Container = styled.View`
   width: 80%;
   height: 85px;
   margin: 7px 0;
   background-color: ${({ theme }) => theme.colors.shape};
   padding: 10px 0 0 7px;
`

export const NameOng = styled.Text`
   font-family: ${({ theme }) => theme.fonts.medium};
   color: ${({ theme }) => theme.colors.text};
   font-size: 16px;

`

export const MenssageOng = styled.Text`
   font-family: ${({ theme }) => theme.fonts.regular};
   color: ${({ theme }) => theme.colors.text_dark};
   font-size: 12px;
`