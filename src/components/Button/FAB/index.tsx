import React from "react";
import { Container, Title } from "./styles";

interface PropsFAB {
   title: string;
   onPress?(): void;
}

export function FabButton({title, onPress}: PropsFAB) {
   return(
      <Container onPress={onPress}>
         <Title>{title}</Title>
      </Container>
   )
}