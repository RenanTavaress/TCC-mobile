import { Alert } from "react-native";
import api from "./api";

interface Response {
	token: string;
	email: string;
	guid: string;
	type: string;
	permission: number;
}

interface SignInResponse {
	data: Response | null;
	code: number | null;
 }

interface SignInOptions {
	email: string;
	password: string;
}

export async function signIn2({
	email,
	password,
 }: SignInOptions): Promise<SignInResponse> {
	try {
	  const response = await api.post("/logon", {
		 email,
		 password,
	  });
 
	  if (response.data.code === 403) {
		 return { data: null, code: response.data.code };
	  }
 
	  return { data: response.data.data, code: response.data.code };
	} catch (error) {
	  throw error;
	}
 }