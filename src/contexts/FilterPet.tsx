import React, { createContext, useState, useEffect, useContext } from "react";
import { DataPetsProps } from "../components/PetCard";
import api from "../services/api";
import AuthContext from "./auth";


interface Props {
	data: DataPetsProps[];
}

export type PetProps = {
	petsFilter: DataPetsProps[];
	setPetsFilter: (datasPet: DataPetsProps[]) => void;
   submitForm: () => void;
	isFiltered: boolean;
	setIsFiltered: (param: boolean) => void;
};

export const PetsFilterContext = createContext<PetProps>({} as PetProps);

export const FilterPet: React.FC = ({ children }) => {

   const [petsFilter, setPetsFilter] = useState<DataPetsProps[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);

   async function submitForm() {
		try {
			const { data } = await api.post(`/api/pet/list`, {
				breed: "",
				city: "",
				companyName: "",
				description: "",
				district: "",
				gender: "",
				size: "",
				typePet: "",
			});
			setPetsFilter(data.data);
			setIsFiltered(false)
		} catch (error) {
			console.log(error);
			return "error";
		}
	}
	useEffect(() => {
		submitForm();
	}, []);


	return (
		<PetsFilterContext.Provider value={{ petsFilter, setPetsFilter, submitForm, isFiltered, setIsFiltered }}>
			{children}
		</PetsFilterContext.Provider>
	);
};
