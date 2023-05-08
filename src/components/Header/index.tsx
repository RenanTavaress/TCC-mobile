import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Container,
	BackScreen,
	Icon,
	HeaderText,
	Text,
	// ViewContainer,
} from "./styles";

interface HeaderProps {
	title: string;
	icon?: string;
}

export function Header({ title, icon }: HeaderProps) {
	const navigate = useNavigation();
	return (
		<Container>
			<BackScreen>
				{icon && <Icon name={icon} onPress={() => navigate.goBack()} />}
			</BackScreen>

			<HeaderText>
				<Text>{title}</Text>
			</HeaderText>
			{/* <ViewContainer></ViewContainer> */}
		</Container>
	);
}
