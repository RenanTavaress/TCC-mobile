import React from "react";
import {
	Container,
	TitleCategory,
	Icon,
	IconContainer,
	TextCleanFilter,
} from "./styles";

interface Props {
	title: string;
	onPress: () => void;
	isFiltering?: boolean;
	originalTitle?: string;
	setTitle?: (params: string) => void;
}

export const CategoryCard = ({
	title,
	onPress,
	originalTitle,
	setTitle,
	isFiltering = false,
}: Props) => {
	function handleCleanFilter() {
		setTitle(originalTitle)
	}

	return (
		<Container onPress={onPress}>
			<TitleCategory>{title}</TitleCategory>
			<IconContainer>
				{isFiltering && title !== originalTitle && (
					<TextCleanFilter onPress={handleCleanFilter}>
						X
					</TextCleanFilter>
				)}
				<Icon name="chevron-down" />
			</IconContainer>
		</Container>
	);
};
