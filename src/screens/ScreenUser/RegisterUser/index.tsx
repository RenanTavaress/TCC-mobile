import React from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { InputForm } from "../../../components/Form/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
	Container,
	Header,
	Title,
	MainForm,
	RegisterButton,
} from "./styles";
import api from "../../../services/api";

type FormData = {
	[name: string]: any;
	name: string;
	document: string;
	email: string;
	phone: string;
	password: string;
};

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
		.required("O CNPJ/CPF é obrigatório")
		.min(11, "O Campo deve ter pelo menos 11 digitos"),
	email: yup
		.string()
		.email("Email invalido")
		.required("O Email é obrigatório")
		.trim(),
	phone: yup.string().required("O Telefone é obrigatório").trim(),
	password: yup.string().required("A Senha é obrigatória").trim(),
});

export function RegisterUser() {
	const navigate = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleUserRegister(datas: FormData) {
		try {
			const { data } = await api.post("/user/add", datas);

			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Já existe usuario com esse nome ");
				return;
			} else {
				Alert.alert("Sucesso", "Usuário criado com sucesso!");
				navigate.goBack();
				return;
			}
		} catch (error) {
			console.log(error);
			return "error";
		}
	}
	return (
		<Container>
			<Header>
				<Title>Cadastre sua ONG</Title>
			</Header>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.select({ ios: 0, android: -2000 })}
				style={{ flex: 1 }}
			>
				<MainForm>
					<InputForm
						placeholder="Seu Nome e Sobrenome"
						control={control}
						name="name"
						autoCapitalize="words"
						error={errors.name}
					/>
					<InputForm
						placeholder="CPF"
						control={control}
						name="document"
						keyboardType="numeric"
						maxLength={14}
						error={errors.document}
					/>
					<InputForm
						placeholder="Email"
						control={control}
						name="email"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.email}
					/>
					<InputForm
						placeholder="Telefone"
						control={control}
						name="phone"
						keyboardType="numeric"
						maxLength={11}
						error={errors.phone}
					/>
					<InputForm
						placeholder="Senha"
						control={control}
						name="password"
						autoCapitalize="none"
						secureTextEntry={true}
						error={errors.password}
					/>
					<RegisterButton
						title="Cadastrar"
						onPress={handleSubmit(handleUserRegister)}
					/>
				</MainForm>
			</KeyboardAvoidingView>
		</Container>
	);
}
