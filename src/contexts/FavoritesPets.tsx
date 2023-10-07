import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";
import { useIsFocused } from "@react-navigation/native";
import { DataPetsProps } from "../components/PetCard";
import { DataUserContext, UserProps } from "./dataUsers";

export interface DataPetProps {
	medication: string;
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
	category: string;
	guid: string;
	companyGuid: string;
	typePet: string;
	onPress?(): void;
	gender: string;
	name: string;
	email: string;
	phone: string;
	photo1: string;
	color: string;
	identification: string;
	birthDate:string;
	isReserved: boolean;
	isAdopted: boolean;
}

interface ChildrenProps {
	children: JSX.Element;
}

export type PetFavoriteProps = {
	listFavoritePet: DataPetsProps[];
	setListFavoritePet: (data: DataPetProps[]) => void;
	getFavoritesPets: () => void;
};

export const FavoritePetContext = createContext<PetFavoriteProps>(
	{} as PetFavoriteProps
);

export const FavoritePet = ({ children }: ChildrenProps) => {
	const { datasUser } = useContext<UserProps>(DataUserContext) as UserProps;
	const [listFavoritePet, setListFavoritePet] = useState<DataPetProps[]>([]);
	
	async function getFavoritesPets() {
		try {
			const { data } = await api.get(`/api/favorite/list/${datasUser.guid}`);
			setListFavoritePet(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<FavoritePetContext.Provider
			value={{ listFavoritePet, setListFavoritePet, getFavoritesPets }}
		>
			{children}
		</FavoritePetContext.Provider>
	);
};
