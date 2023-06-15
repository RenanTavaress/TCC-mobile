import React, { Children } from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
	title: string;
	color?: string;
}

export function ContainerButton({ title, color ,children,  ...rest }: Props) {
	return (
		<Container {...rest}>
			<Title color={color}>{title}</Title>
			{children}
		</Container>
	);
}
