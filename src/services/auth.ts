import api from "./api";

interface Response {
	token: string;
	email: string;
	guid: string;
	type: string
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

		return response.data?.data;
	} catch (error) {
		// @ts-ignore
		return Promise.reject(error?.message)
	}
}
