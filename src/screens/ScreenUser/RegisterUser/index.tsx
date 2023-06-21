import React from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { InputForm } from "../../../components/Form/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Container, MainForm, RegisterButton } from "./styles";
import { Header } from "../../../components/Header";
import api from "../../../services/api";

type FormData = {
	[name: string]: any;
	name: string;
	document: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.required("O CNPJ/CPF é obrigatório")
		.min(11, "O Campo deve ter pelo menos 11 digitos"),
	email: yup
		.string()
		.email("Email Inválido")
		.required("O Email é obrigatório")
		.trim(),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.required("O Telefone é obrigatório")
		.min(10, "O Campo deve ter 11 digitos contando com o DDD")
		.trim(),
	password: yup.string().required("A Senha é obrigatória").trim(),
	confirmPassword: yup
		.string()
		.required("Informe a confirmação de senha")
		.oneOf([yup.ref("password"), null], "A confirmação de senha não é igual"),
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
			console.log(datas);
			const { data } = await api.post("/user/add", datas);

			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Já existe usuario com esse nome ");
				return;
			} else {
				Alert.alert("Sucesso", "Usuário criado com sucesso!");
				return navigate.goBack();
			}
		} catch (error) {
			console.log(error);
			return "error";
		}
	}
	return (
		<Container>
			<Header title="Faça seu cadastro" icon="left" />

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
						maxLength={11}
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
					<InputForm
						placeholder="Confirme a senha"
						control={control}
						name="confirmPassword"
						autoCapitalize="none"
						secureTextEntry={true}
						error={errors.confirmPassword}
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
