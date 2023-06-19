import React, { useState } from "react";
import {
	Container,
	MainInfo,
	Title,
	Linha,
	Span,
	VideoCover,
	PixKey,
	PixView,
} from "./styles";
import { Header } from "../../../components/Header";
import { ActivityIndicator } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useTheme } from "styled-components";

export function Donation() {
	const { colors } = useTheme();
	const [videoReady, setVideoReady] = useState(false);
	return (
		<Container>
			<Header title="Doação" />
			<MainInfo>
				<Title>Doação</Title>
				<Linha></Linha>
				<Span isActive={false}>
					Ajude a equipe 4pet a dar continuidade no projeto!
				</Span>
				<Span isActive>Saiba mais sobre o projeto...</Span>

				<VideoCover>
					<YoutubeIframe
						videoId="_uNjq4oKFOs"
						height={videoReady ? 180 : 0}
						onReady={() => setVideoReady(true)}
					/>
					{!videoReady && <ActivityIndicator color={colors.primary} />}
				</VideoCover>
				<PixView>
					<Span isActive={false}>Faça já sua doação!</Span>
					<Span isActive={false}>Os valores aqui doados serão para a manutenção do aplicativo.</Span>
					<PixKey>
						Chave Pix: <Span isActive={false}>4petsolution@gmail.com</Span>
					</PixKey>
					<Linha></Linha>
					<Span isActive={false}>Em caso de dúvidas ou problemas, contate a equipe de suporte no e-mail: 4petsolution@gmail.com.</Span>
				</PixView>
			</MainInfo>
		</Container>
	);
}
