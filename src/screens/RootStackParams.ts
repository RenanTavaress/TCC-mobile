import { DataPetsProps } from "../components/PetCard";

export type RootStackParamList = {
	Welcome: undefined;
	LoginOng: undefined;
	User: undefined;
	RegisterOng: undefined;
	screenRegister: undefined;
	RegisterUser: undefined;
	EditingPerfil: undefined;
	AddPet: undefined;
	listPets: undefined;
	EditingPerfilOng: undefined;
	FilterScreen: undefined;
	ForgotPassword: undefined;
	SendRating: undefined;
	EditingPetScreen: {
		guid: string;
		age: string;
		breed: string;
		description: string;
		medication: string;
		gender: string;
		typePet: string;
		size: string;
		vaccines: string;
		photo1: string;
	};
	ongScreen: {
		name: string;
		description: string;
		city: string;
		district: string;
		country: string;
		street: string;
		numberAddress: string;
		cep: string;
		phone: string;
		email: string;
		//onPress: string;
	};
	petScreen: {
		age: string;
		breed: string;
		description: string;
		medication: string;
		typePet: string;
		size: string;
		vaccines: string;
		gender: string;
		name: string;
		email: string;
		phone: string;
		photo1: string;
	};
	favoritesPets: undefined;
	preferences: undefined;
	createPreferences: undefined;

};
