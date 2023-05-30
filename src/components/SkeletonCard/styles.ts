import styled from "styled-components/native";
import { CardPet, ContainerImage } from "../PetCard/styles";
import { PetCard } from "../PetCard";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const CardSkeleton = styled(CardPet)`
	background-color: #fff;
	overflow: hidden;
`;

export const ImagineContainer = styled(ContainerImage)`
	background-color: #ECEFF1;
`;
