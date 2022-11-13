import React from "react";
import { Container, TitleCategory, Icon } from "./styles";

interface Props {
	title: string;
	onPress: () => void;
}

export const CategoryCard = ({ title, onPress }: Props) => {
	return (
		<Container onPress={onPress}>
			<TitleCategory>{title}</TitleCategory>
			<Icon name="chevron-down" />
		</Container>
	);
};
