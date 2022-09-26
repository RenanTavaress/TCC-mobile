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

interface DataProps {
	data: DataUserProps;
}

interface User {
	token: string;
	email: string;
	guid: string;
	type: string;
}

export const DataUserContext = createContext<DataUserProps>({} as DataUserProps);

export const DataUser: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [datasUser, setDatasUser] = useState({} as DataUserProps);
	useEffect(() => {
		async function getDataUser() {
			try {
				const { data } = await api.get<DataProps>(
					`/api/user/detail/guid/${user!.guid}`
				);
				setDatasUser(data.data);
			} catch (error) {
				console.log(error);
			}
		}

		getDataUser();
	}, []);

	return (
		<DataUserContext.Provider value={datasUser}>
			{children}
		</DataUserContext.Provider>
	);
};
