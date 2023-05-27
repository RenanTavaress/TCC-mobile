import React from "react";

import {
	ContainerPetInfo,
	ContainerInfo,
	ContainerHeath,
	TextInfo,
	InfoPet,
	ContainerDescription,
	ImageContainer,
	ImageLeft,
	ImageButton,
	ImagePet,
} from "./styles";
import { DataPetProps } from "../../contexts/DataPet";
import { View } from "react-native";

interface PetProps {
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
	gender: string;
	photo1: string;
}

interface PetDetailProps {
	petDetail: PetProps;
}

export function PetDetail({ petDetail: { ...rest } }: PetDetailProps) {
	return (
		<>
			<ImageContainer>
				{rest?.photo1 && (
					<ImageLeft>
						<ImageButton>
							<ImagePet source={{ uri: rest?.photo1 }} />
						</ImageButton>
					</ImageLeft>
				)}
			</ImageContainer>
			<View>
				<ContainerPetInfo>
					<ContainerInfo>
						{rest?.breed && (
							<>
								<TextInfo>Raça:</TextInfo>
								<InfoPet>{rest?.breed}</InfoPet>
							</>
						)}
						<TextInfo>Idade:</TextInfo>
						<InfoPet>{rest?.age}</InfoPet>
						<TextInfo>Porte:</TextInfo>
						<InfoPet>{rest?.size}</InfoPet>
					</ContainerInfo>
					<ContainerHeath>
						<TextInfo>Vacinas:</TextInfo>
						<InfoPet>{rest?.vaccines}</InfoPet>
						<TextInfo>Sexo:</TextInfo>
						<InfoPet>{rest?.gender === "M" ? "Macho" : "Fêmea"}</InfoPet>
					</ContainerHeath>
				</ContainerPetInfo>
				<ContainerDescription>
					<TextInfo>Descrição:</TextInfo>
					<InfoPet>{rest?.description}</InfoPet>
				</ContainerDescription>
			</View>
		</>
	);
}
