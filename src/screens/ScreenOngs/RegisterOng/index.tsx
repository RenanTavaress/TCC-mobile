import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { InputForm } from "../../../components/Form/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
	Container,
	Title,
	MainForm,
	AdressForm,
	ContainerRigthForm,
	ContainerLeftForm,
	DescriptioInput,
	RegisterButton,
	ConditionsView,
	AdressInfo,
} from "./styles";
import api from "../../../services/api";
import { Header } from "../../../components/Header";
import { Checkbox, Props } from "react-native-paper";
import { Text } from "react-native";
import axios, { AxiosError } from "axios";

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
	confirmPassword: string;
}

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.required("O CNPJ/CPF é obrigatório")
		.min(11, "O Campo deve ter pelo menos 11 digitos")
		.trim(),
	email: yup
		.string()
		.email("Email Inválido")
		.required("O Email é obrigatório")
		.trim(),
	street: yup.string().required("A Rua é obrigatória").trim(),
	cep: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.min(8, "O cep tem quer 8 digitos")
		.required("O CEP é obrigatório")
		.trim(),
	city: yup.string().required("A cidade é obrigatória").trim(),
	country: yup.string().required("O País é obrigatória").trim(),
	numberAddress: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.required("O Número é obrigatório")
		.trim(),
	district: yup.string().required("O Bairro é obrigatório").trim(),
	uf: yup.string().required("O UF é obrigatório").trim(),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas números.")
		.required("O Telefone é obrigatório")
		.min(11, "O Campo deve ter 10 digitos contando com o DDD")
		.trim(),
	description: yup.string().required("A Descrição é obrigatória").trim(),
	password: yup.string().required("A Senha é obrigatória").trim(),
	confirmPassword: yup
		.string()
		.required("Informe a confirmação de senha")
		.oneOf([yup.ref("password"), null], "A confirmação de senha não é igual"),
});

export function RegisterOng() {
	const [checkBox, setCheckBox] = useState(false);
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
		resolver: yupResolver(schema),
	});

	async function getCep(values: string) {
		try {
			const { data, status } = await axios.get<DataAdress>(
				`https://viacep.com.br/ws/${values}/json/`
			);
			return { data, status };
		} catch (error) {
			throw new Error("Erro na requisição");
		}
	}

	async function handleCepOng() {
		const values = getValues();
		if (values && values.cep?.length === 8 && /^\d+$/.test(values.cep)) {
			const { data, status } = await getCep(values.cep);
			if (status === 200 && !data.erro) {
				setValue("street", data.logradouro);
				setValue("district", data.bairro);
				setValue("city", data.localidade);
				setValue("uf", data.uf);
				clearErrors("cep");
				clearErrors("city");
				clearErrors("district");
				clearErrors("numberAddress");
				clearErrors("uf");
				clearErrors("street");
			} else {
				setError("cep", {
					message: "Cep inválido",
				});
			}
		} else if (values && values.cep?.length < 8) {
			setError("cep", {
				message: "O cep tem quer 8 digitos",
			});
		}
	}
	function handleChecked() {
		setCheckBox(!checkBox);
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
						<AdressInfo>
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
									placeholder="Número"
									control={control}
									name="numberAddress"
									keyboardType="numeric"
									error={errors.numberAddress}
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
						</AdressInfo>
						<View>
							<InputForm
								placeholder="Rua"
								control={control}
								name="street"
								autoCapitalize="words"
								error={errors.street}
								editable={false}
							/>
							<InputForm
								placeholder="Bairro"
								control={control}
								name="district"
								autoCapitalize="words"
								error={errors.district}
								editable={false}
							/>
						</View>
					</AdressForm>
					<InputForm
						placeholder="Telefone"
						control={control}
						name="phone"
						keyboardType="numeric"
						maxLength={11}
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
						placeholder="Descrição da Ong"
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
					<InputForm
						placeholder="Confirme a senha"
						control={control}
						name="confirmPassword"
						autoCapitalize="none"
						secureTextEntry={true}
						error={errors.confirmPassword}
					/>

					<ConditionsView>
						<Checkbox.Item
							label=""
							status={checkBox ? "checked" : "unchecked"}
							onPress={() => handleChecked()}
						/>
						<Text>
							Aceito os Termos de Políticas e Privacidade sobre o
							compartilhamento de dados pessoas citados na LGPD -Lei 13.709 -
							Art. 5º.
						</Text>
					</ConditionsView>
					<RegisterButton
						title="Cadastrar"
						onPress={handleSubmit(handleOngRegister)}
						disabled={!checkBox}
					/>
				</MainForm>
			</KeyboardAvoidingView>
		</Container>
	);
}
