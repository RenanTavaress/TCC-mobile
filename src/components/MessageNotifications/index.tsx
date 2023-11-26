import React from "react";
import { Container, TextMenssage, StatusMenssage, TtileMenssage } from "./styles";

interface NotificationProps {
	companyName: string;
	content: string;
	title: string;
}

export function MessageComponents({companyName, content, title}: NotificationProps) {
	return (
		<Container>
			<StatusMenssage>{companyName}</StatusMenssage>
			<TtileMenssage>{title}</TtileMenssage>
			<TextMenssage>{content}</TextMenssage>
         
		</Container>
	);
}
