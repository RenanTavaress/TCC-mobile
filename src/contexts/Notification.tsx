import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";
import api from "../services/api";

export interface NotificationProps {
	date: string;
	title: string;
	content: string;
	isRead: boolean;
	guid: string;
	userGuid: string;
	companyName: string;
}

interface NotificationContext {
	data: NotificationProps[];
}

export type NotificationContextProps = {
	notifications: NotificationProps[];
	countIsRead: number;
	notRead: NotificationProps[];
	setCountIsRead: (param: number) => void;
	updateIsRead: () => NotificationProps[];
};

interface GetNotificationProps {
	children: JSX.Element;
}

export const NotificationContext = createContext<NotificationContextProps>(
	{} as NotificationContextProps
);

export function GetNotification({ children }: GetNotificationProps) {
	const [notifications, setNotifications] = useState<NotificationProps[]>([]);

	function updateIsRead() {
		const isReadFalse = notifications.filter(
			(notIsRead) => notIsRead.isRead === false
		);

		return isReadFalse;
	}
	const [countIsRead, setCountIsRead] = useState<number>(
		notifications.length > 0 ? updateIsRead().length : 0
	);
	const [notRead, setNotRead] = useState<NotificationProps[]>([]);

	async function getNotifications() {
		const { data } = await api.get<NotificationContext>(
			"/api/notification/list"
		);
		setNotifications(data.data);
	}

	useEffect(() => {
		getNotifications();
	}, []);

	useEffect(() => {
		setNotRead(updateIsRead());
		setCountIsRead(notifications.length > 0 ? updateIsRead().length : 0);
	}, [notifications]);

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				countIsRead,
				notRead,
				setCountIsRead,
				updateIsRead,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
}
