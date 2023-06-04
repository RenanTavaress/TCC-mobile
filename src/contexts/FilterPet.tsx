import React, { createContext, useState, useEffect, useContext } from "react";
import { DataPetsProps } from "../components/PetCard";
import api from "../services/api";
import AuthContext from "./auth";

interface Props {
	data: DataPetsProps[];
}

type FormData = {
	[name: string]: any;
	breed: string | null;
	city: string | null;
	companyName: string | null;
	gender: string | null | undefined;
	size: string | null | undefined;
	typePet: string | null;
};

interface FilterPetProps {
	children: React.ReactNode;
}

export type PetProps = {
	petsFilter: DataPetsProps[];
	setPetsFilter: (datasPet: DataPetsProps[]) => void;
	submitForm: () => void;
	isFiltered: boolean;
	setIsFiltered: (param: boolean) => void;
	inputFilterd: FormData;
	setInputFilterd: (param: FormData) => void;
};

export const PetsFilterContext = createContext<PetProps>({} as PetProps);

export const FilterPet = ({ children }: FilterPetProps) => {
	const [petsFilter, setPetsFilter] = useState<DataPetsProps[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [inputFilterd, setInputFilterd] = useState<FormData>({
		breed: null,
		city: null,
		companyName: null,
		gender: undefined,
		size: undefined,
		typePet: null,
	});

	async function submitForm() {
		try {
			const { data } = await api.post(`/api/pet/list`, {
				breed: "",
				city: null,
				companyName: "",
				gender: "",
				size: "",
				typePet: "",
			});
			setPetsFilter(data.data);
			setIsFiltered(false);
			setInputFilterd({
				breed: null,
				city: null,
				companyName: null,
				gender: undefined,
				size: undefined,
				typePet: null,
			});
		} catch (error) {
			console.log(error);
			return "error";
		}
	}
	useEffect(() => {
		submitForm();
	}, []);

	return (
		<PetsFilterContext.Provider
			value={{
				petsFilter,
				setPetsFilter,
				submitForm,
				isFiltered,
				setIsFiltered,
				inputFilterd,
				setInputFilterd,
			}}
		>
			{children}
		</PetsFilterContext.Provider>
	);
};
