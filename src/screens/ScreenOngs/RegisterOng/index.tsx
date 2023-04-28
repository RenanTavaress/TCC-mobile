import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { InputForm } from "../../../components/Form/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
	Container,
	// Header,
	Title,
	MainForm,
	AdressForm,
	ContainerRigthForm,
	ContainerLeftForm,
	DescriptioInput,
	RegisterButton,
} from "./styles";
import api from "../../../services/api";
import { Header } from "../../../components/Header";

export interface DataAdress {
	bairro: string;
	cep: string;
	complemento: string;
	ddd: string;
	gia: string;
	ibge: string;
	localidade: string;
	logradouro: string;
	siafi: string;
	uf: string;
	erro: boolean;
}

interface FormData {
	[name: string]: any;
	name: string;
	document: string;
	email: string;
	street: string;
	cep: string;
	city: string;
	country: string;
	numberAddress: string;
	district: string;
	uf: string;
	phone: string;
	description: string;
	password: string;
}

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
		.required("O CNPJ/CPF é obrigatório")
		.min(11, "O Campo deve ter pelo menos 11 digitos")
		.trim(),
	email: yup
		.string()
		.email("Email invalido")
		.required("O Email é obrigatório")
		.trim(),
	street: yup.string().required("A Rua é obrigatória").trim(),
	cep: yup.string().required("O CEP é obrigatório").trim(),
	city: yup.string().required("A cidade é obrigatória").trim(),
	country: yup.string().required("O País é obrigatória").trim(),
	numberAddress: yup.string().required("O Numero é obrigatório").trim(),
	district: yup.string().required("O Bairro é obrigatório").trim(),
	uf: yup.string().required("O UF é obrigatório").trim(),
	phone: yup
		.string()
		.required("O Telefone é obrigatório")
		.min(10, "O Campo deve ter 10 digitos contando com o DDD")
		.trim(),
	description: yup.string().required("A Descrição é obrigatória").trim(),
	password: yup.string().required("A Senha é obrigatória").trim(),
});

export function RegisterOng() {
	const navigate = useNavigation();
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<FormData>({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	async function getCep(values: string) {
		const response = await api.get<DataAdress>(
			`https://viacep.com.br/ws/${values}/json/`
		);
		return response;
	}

	async function handleCepOng() {
		const values = getValues();
		if (values.cep?.length === 8) {
			const response = await getCep(values.cep);
			if (response.data?.erro !== true) {
				setValue("street", response.data.logradouro);
				setValue("district", response.data.bairro);
				setValue("city", response.data.localidade);
				setValue("uf", response.data.uf);
				clearErrors("cep");
			} else {
				setError("cep", {
					message: "Cep Não existe",
				});
			}
		}
	}

	function verifyLengthInputCep() {
		const values = getValues();
		if (values.cep?.length <= 8) {
			setValue("street", "");
			setValue("district", "");
			setValue("city", "");
			setValue("uf", "");
			clearErrors("cep");
		}
	}

	async function handleOngRegister(datas: FormData) {
		try {
			const { data } = await api.post("/company/add", datas);
			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Já existe usuario com esse nome ");
				return;
			} else {
				console.log(data);
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
			<Header title="Cadastre sua ONG" icon="left" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.select({ ios: 0, android: -2000 })}
				style={{ flex: 1 }}
			>
				<MainForm>
					<InputForm
						placeholder="Nome da ONG"
						control={control}
						name="name"
						autoCapitalize="words"
						error={errors.name}
					/>
					<InputForm
						placeholder="CNPJ/CPF"
						control={control}
						name="document"
						keyboardType="numeric"
						maxLength={14}
						error={errors.document}
					/>
					<InputForm
						placeholder="Email de acesso"
						control={control}
						name="email"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.email}
					/>
					<Title>Endereço</Title>

					<AdressForm>
						<ContainerLeftForm>
							<InputForm
								placeholder="CEP"
								control={control}
								name="cep"
								keyboardType="numeric"
								maxLength={8}
								onBlur={() => handleCepOng()}
								onChange={() => verifyLengthInputCep()}
								error={errors.cep}
							/>
							<InputForm
								placeholder="Rua"
								control={control}
								name="street"
								autoCapitalize="words"
								error={errors.street}
								editable={false}
							/>

							<InputForm
								placeholder="Cidade"
								control={control}
								name="city"
								autoCapitalize="words"
								error={errors.city}
								editable={false}
							/>
						</ContainerLeftForm>
						<ContainerRigthForm>
							<InputForm
								placeholder="Numero"
								control={control}
								name="numberAddress"
								keyboardType="numeric"
								error={errors.numberAddress}
							/>
							<InputForm
								placeholder="Bairro"
								control={control}
								name="district"
								autoCapitalize="words"
								error={errors.district}
								editable={false}
							/>
							<InputForm
								placeholder="UF"
								control={control}
								name="uf"
								autoCapitalize="characters"
								maxLength={2}
								error={errors.uf}
								editable={false}
							/>
						</ContainerRigthForm>
					</AdressForm>
					<InputForm
						placeholder="Telefone"
						control={control}
						name="phone"
						keyboardType="numeric"
						maxLength={10}
						error={errors.phone}
					/>
					<InputForm
						placeholder="País"
						control={control}
						name="country"
						autoCapitalize="words"
						error={errors.country}
					/>
					<DescriptioInput
						placeholder="Descrição"
						control={control}
						name="description"
						autoCapitalize="sentences"
						error={errors.description}
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
						onPress={handleSubmit(handleOngRegister)}
					/>
				</MainForm>
			</KeyboardAvoidingView>
		</Container>
	);
}
