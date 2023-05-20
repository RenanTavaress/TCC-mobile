import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Container,
	BackScreen,
	Icon,
	HeaderText,
	Text,
} from "./styles";

interface HeaderProps {
	title: string;
	icon?: string;
}

export function Header({ title, icon }: HeaderProps) {
	const navigate = useNavigation();
	return (
		<Container>
			<BackScreen  onPress={icon ? () => navigate.goBack(): () => {}}>
				{icon && <Icon name={icon} />}
			</BackScreen>

			<HeaderText>
				<Text>{title}</Text>
			</HeaderText>
			{/* <ViewContainer></ViewContainer> */}
		</Container>
	);
}
