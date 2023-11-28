import { FlatList, FlatListProps } from "react-native";
import styled from "styled-components/native";
import { NotificationProps } from "../../../contexts/Notification";


export const Container = styled.View`
	flex: 1;
`;



export const ContainerNotificationsMenssage = styled(
	FlatList as new (
		props: FlatListProps<NotificationProps>
	) => FlatList<NotificationProps>
).attrs({
	showsVerticalScrollIndicator: false,
   
})`
   padding-left: 22px;
`;

export const ViewNotification = styled.View`
   padding-top: 10px;
   justify-content: flex-start;
   align-items: center;
   width: 100%;
   height: 100%;
`
