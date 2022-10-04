import { DataOngsProps2 } from "./ScreenUser/DashboardUser";
export type RootStackParamList = {
	Welcome: undefined;
	LoginOng: undefined;
	User: undefined;
	RegisterOng: undefined;
	screenRegister: undefined;
	RegisterUser: undefined;
	EditingPerfil: undefined;
	ongScreen: {
		id: string;
		nameOng: string;
		descricao: string;
		city: string;
		district: string;
	};
};
