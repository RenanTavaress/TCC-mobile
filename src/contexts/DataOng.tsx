import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";

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

export type OngProps = {
	datasOngs: DataOngProps;
	setDatasOngs: (datasOngs: DataOngProps) => void;
};

export const DataOngContext = createContext<OngProps>({} as OngProps);

export const DataOng: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [datasOngs, setDatasOngs] = useState<DataOngProps>({} as DataOngProps);

	useEffect(() => {
		async function getDataOng() {
			try {
				const { data } = await api.get<Props>(
					`/api/company/detail/guid/${user!.guid}`
				);

				setDatasOngs(data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getDataOng();
	}, []);

	return (
		<DataOngContext.Provider value={{ datasOngs, setDatasOngs }}>
			{children}
		</DataOngContext.Provider>
	);
};
