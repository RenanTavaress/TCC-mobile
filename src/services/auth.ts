import { Alert } from "react-native";
import api from "./api";

interface Response {
	token: string;
	email: string;
	guid: string;
	type: string;
	permission: number;
}

interface SignInOptions {
	email: string;
	password: string;
}

export async function signIn({email, password}: SignInOptions): Promise<Response> {
	try {
		 const response = await api.post('/logon', {
			email,
			password,
		});
		console.log(response)
		return response.data?.data;
	} catch (error) {
		// @ts-ignore
		return Promise.reject(error?.message)
	}
}
