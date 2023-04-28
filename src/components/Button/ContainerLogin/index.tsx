import React, { Children } from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
	title: string;
}

export function ContainerButton({ title, children,  ...rest }: Props) {
	return (
		<Container {...rest}>
			<Title>{title}</Title>
			{children}
		</Container>
	);
}
