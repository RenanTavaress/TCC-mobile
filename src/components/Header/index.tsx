import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Container,
	BackScreen,
	Icon,
	HeaderText,
	Text,
	NotificationContainer,
} from "./styles";
import { User } from "../../contexts/auth";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

interface HeaderProps {
	title: string;
	icon?: string;
	user?: User | null;
	urlNotifications?: string | undefined;
}

export function Header({ title, icon, user, urlNotifications }: HeaderProps) {
	const navigate = useNavigation();
	const theme = useTheme()
	return (
		<Container>
			<BackScreen onPress={icon ? () => navigate.goBack() : () => {}}>
				{icon && <Icon name={icon} />}
			</BackScreen>

			<HeaderText>
				<Text>{title}</Text>
			</HeaderText>

			{user?.type === "USER" && urlNotifications && (
				<NotificationContainer
					onPress={() => navigate.navigate(urlNotifications)}
				>
					<Ionicons name="notifications" size={20} color={theme.colors.shape} />
				</NotificationContainer>
			)}
		</Container>
	);
}
