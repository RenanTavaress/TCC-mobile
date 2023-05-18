import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";

export interface DataPetProps {
	medication: string;
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
	category:string;
	guid: string;
	companyGuid: string;
	typePet: string;
	onPress?(): void;
	gender: string;
	name: string;
	email: string;
	phone: string;
	photo1: string;
}

export interface PropsContextDataPet {
	data: DataPetProps[];
}

export type PetProps = {
	datasPet: DataPetProps[];
	setDataPet: (datasPet: DataPetProps[]) => void;
	getDataPet: () => void;
};

interface IProps {
	children: React.ReactNode;
  }

export const DataPetContext = createContext<PetProps>({} as PetProps);

export const DataPet = ({ children }: IProps) => {
	const { user } = useContext(AuthContext);

	const [datasPet, setDataPet] = useState<DataPetProps[]>([]);
	async function getDataPet() {
		try {
			const { data } = await api.get<PropsContextDataPet>(
				`/api/pet/list/companyguid/${user!.guid}`
			);

			setDataPet(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getDataPet();
	}, []);

	return (
		<DataPetContext.Provider value={{ datasPet, setDataPet, getDataPet }}>
			{children}
		</DataPetContext.Provider>
	);
};
