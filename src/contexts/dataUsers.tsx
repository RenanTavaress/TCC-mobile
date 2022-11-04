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

interface Props {
	data: DataUserProps;
}

export type UserProps = {
	datasUser: DataUserProps;
	setDatasUser: (datasUser: DataUserProps) => void;
};

export const DataUserContext = createContext<UserProps>({} as UserProps);

export const DataUser: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [datasUser, setDatasUser] = useState<DataUserProps>(
		{} as DataUserProps
	);

	async function getDataUser() {
		try {
			const { data } = await api.get<Props>(
				`/api/user/detail/guid/${user!.guid}`
			);
			setDatasUser(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getDataUser();
	}, []);

	return (
		<DataUserContext.Provider value={{ datasUser, setDatasUser }}>
			{children}
		</DataUserContext.Provider>
	);
};
