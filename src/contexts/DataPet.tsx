import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";

export interface DataPetProps {
	medication: string;
	breed: string;
	//size: string;
	age: string;
	description: string;
	vaccines: string;
	//category:string; 
}

interface Props {
	data: DataPetProps[];
}

export type PetProps = {
	datasPet: DataPetProps[];
	setDataPet: (datasPet: DataPetProps[]) => void;
};

export const DataPetContext = createContext<PetProps>({} as PetProps);

export const DataPet: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [datasPet, setDataPet] = useState<DataPetProps[]>([]);

	useEffect(() => {
		async function getDataPet() {
			try {
				const { data } = await api.get<Props>(
					`/api/pet/list/companyguid/${user!.guid}`
				);
				

				setDataPet(data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getDataPet();
	}, []);

	return (
		<DataPetContext.Provider value={{ datasPet, setDataPet }}>
			{children}
		</DataPetContext.Provider>
	);
};
