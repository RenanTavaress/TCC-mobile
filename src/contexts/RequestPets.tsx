import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";
import { DataPetsProps } from "../components/PetCard";
import { PetsFilterContext } from "./FilterPet";

interface DataOngProps {
	guid: string;
	cep: string;
	city: string;
	country: string;
	description: string;
	district: string;
	document: string;
	email: string;
	name: string;
	numberAddress: string;
	phone: string;
	street: string;
	uf: string;
}

interface Props {
	data: DataOngProps;
}

interface PropsChildren {
	children: React.ReactNode;
}

export type petRequested = {
	isReserved: DataPetsProps[];
	setIsReserved: (isReserved: DataPetsProps[]) => void;
	handleCancelCard: (guid: string) => void;
	setIsReservedLength: (param: number) => void;
	isReservedLength: number;
};

export const RequestPetContext = createContext<petRequested>(
	{} as petRequested
);

export const RequestPets = ({ children }: PropsChildren) => {
	const [isReserved, setIsReserved] = useState<DataPetsProps[]>([]);
	const [isReservedLength, setIsReservedLength] = useState(isReserved?.length)
	const { user } = useContext(AuthContext);

	function handleCancelCard(guid: string) {
		setIsReserved((prevReserved: DataPetsProps[]) =>
			prevReserved.filter((item) => item.guid !== guid)
		);
	}

	useEffect(() => {
		console.log(isReservedLength)
		async function getIsReserved() {
			try {
				const verifyTypeUser =
					user?.type == "USER"
						? `/api/pet/list/reserved`
						: `/api/pet/list/reserved/companyguid/${user!.guid}`;
				const { data } = await api.get(verifyTypeUser);
				setIsReserved(data.data);
			} catch (error) {
				console.log(error);
			}
		}

		getIsReserved();
		console.log(isReservedLength)
	}, [isReservedLength]);

	return (
		<RequestPetContext.Provider
			value={{ isReserved, setIsReserved, handleCancelCard, setIsReservedLength, isReservedLength }}
		>
			{children}
		</RequestPetContext.Provider>
	);
};
