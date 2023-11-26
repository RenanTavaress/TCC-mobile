import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Container,
	BackScreen,
	Icon,
	HeaderText,
	Text,
	NotificationContainer,
	IconNotification,
	ContainerIconNotification,
	BadgeText,
	Badge,
} from "./styles";
import { User } from "../../contexts/auth";

interface HeaderProps {
	title: string;
	icon?: string;
	user?: User | null;
	urlNotifications?: string | undefined;
	numberNotification?: number | undefined;
}

export function Header({
	title,
	icon,
	user,
	urlNotifications,
	numberNotification = 0,
}: HeaderProps) {
	const navigate = useNavigation();

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
					<ContainerIconNotification>
						<IconNotification name="notifications" />
						{numberNotification > 0 && (
							
							<Badge>
								<BadgeText>{numberNotification}</BadgeText>
							</Badge>
						)}
					</ContainerIconNotification>
				</NotificationContainer>
			)}
		</Container>
	);
}
