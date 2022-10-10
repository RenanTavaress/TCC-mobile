import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";
import api from "../services/api";
import AuthContext from "./auth";

interface DataUserProps {
	guid: string;
	name: string;
	email: string;
	document: string;
	phone: string;
}

interface Props{
	data: DataUserProps
}

export interface DataProps {
	datasUser: DataUserProps;
	setDatasUser: (datasUser: DataUserProps) => void;
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
