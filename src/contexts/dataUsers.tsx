import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import AuthContext from "./auth";

interface DataUserProps {
	guid: string;
	name: string;
	email: string;
	document: string;
	phone: string;
}

interface dataOngProps {
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
	data: DataUserProps | dataOngProps;
}

export interface DataProps {
	datasTypeUser: DataUserProps | dataOngProps;
	setDatasTypeUser: (datasUser: DataUserProps | dataOngProps) => void;
}

interface User {
	token: string;
	email: string;
	guid: string;
	type: string;
}

export const DataUserContext = createContext<DataProps>({} as DataProps);

export const DataUser: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [datasTypeUser, setDatasTypeUser] = useState<DataUserProps | dataOngProps>(
		{} as DataUserProps | dataOngProps
	);

	async function getDataUser() {
		try {
			const { data } = await api.get<Props>(
				`/api/user/detail/guid/${user!.guid}`
			);
			setDatasTypeUser(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function getDataOng() {
		try {
			const { data } = await api.get<Props>(
				`/api/company/detail/guid/${user!.guid}`
			);
			setDatasTypeUser(data.data);
			console.log(data.data)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (user?.type === "USER") {
			getDataUser();
		} else {
			getDataOng();
		}
	}, []);

	return (
		<DataUserContext.Provider value={{ datasTypeUser, setDatasTypeUser }}>
			{children}
		</DataUserContext.Provider>
	);
};
