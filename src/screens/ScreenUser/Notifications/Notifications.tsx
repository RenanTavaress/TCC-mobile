import React, {useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import {
	Container,
	ContainerNotificationsMenssage,
	ViewNotification,
} from "./styles";
import { MessageComponents } from "../../../components/MessageNotifications";
import {
	NotificationContext,
	NotificationContextProps,
} from "../../../contexts/Notification";
import api from "../../../services/api";

export function Notifications() {
	const { notifications, notRead, setCountIsRead, updateIsRead } =
		useContext<NotificationContextProps>(
			NotificationContext
		) as NotificationContextProps;

	async function updateReadNotifications() {
		const update = notRead.map(async (notification) => {
			await api.put(`/api/notification/read/guid/${notification.guid}`);
		});

		await Promise.all(update);
		setCountIsRead(updateIsRead.length)
	}

	useEffect(() => {
		updateReadNotifications();
		updateIsRead()
	}, []);

	return (
		<Container>
			<Header title="Notificação" icon="left" />
			<ViewNotification>
				<ContainerNotificationsMenssage
					data={notifications}
					keyExtractor={(item) => item.guid}
					renderItem={({ item }) => {
						return (
							<MessageComponents
								companyName={item.companyName}
								content={item.content}
								title={item.title}
							/>
						);
					}}
				/>
			</ViewNotification>
		</Container>
	);
}
