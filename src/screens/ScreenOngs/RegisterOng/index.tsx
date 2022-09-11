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
	AdressForm,
	ContainerRigthForm,
	ContainerLeftForm,
	DescriptioInput,
	RegisterButton,
} from "./styles";
import api from "../../../services/api";

type FormData = {
	[name: string]: any;
	name: string;
	document: string;
	emailAccess: string;
	emailContact: string;
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
};

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
		.required("O CNPJ/CPF é obrigatório")
		.min(11, "O Campo deve ter pelo menos 11 digitos"),
	emailAccess: yup
		.string()
		.email("Email invalido")
		.required("O Email é obrigatório")
		.trim(),
	emailContact: yup
		.string()
		.email("Email invalido")
		.required("O Email é obrigatório")
		.trim(),
	street: yup.string().required("A Rua é obrigatória").trim(),
	cep: yup.string().required("O CEP é obrigatório"),
	city: yup.string().required("A cidade é obrigatória").trim(),
	country: yup.string().required("O País é obrigatória").trim(),
	numberAddress: yup.string().required("O Numero é obrigatório"),
	district: yup.string().required("O Bairro é obrigatório").trim(),
	uf: yup.string().required("O UF é obrigatório").trim(),
	phone: yup.string().required("O Telefone é obrigatório").trim(),
	description: yup.string().required("A Descrição é obrigatória").trim(),
	password: yup.string().required("A Senha é obrigatória").trim(),
});

export function RegisterOng() {
	const navigate = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleOngRegister(datas: FormData) {
		try {
			const { data } = await api.post("/company/add", datas);

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
						name="emailAccess"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.emailAccess}
					/>
					<InputForm
						placeholder="Email de contato"
						control={control}
						name="emailContact"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.emailContact}
					/>
					<Title>Endereço</Title>

					<AdressForm>
						<ContainerLeftForm>
							<InputForm
								placeholder="Rua"
								control={control}
								name="street"
								autoCapitalize="sentences"
								error={errors.street}
							/>
							<InputForm
								placeholder="CEP"
								control={control}
								name="cep"
								keyboardType="numeric"
								maxLength={8}
								error={errors.cep}
							/>
							<InputForm
								placeholder="Cidade"
								control={control}
								name="city"
								autoCapitalize="words"
								error={errors.city}
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
							/>
							<InputForm
								placeholder="UF"
								control={control}
								name="uf"
								autoCapitalize="characters"
								maxLength={2}
								error={errors.uf}
							/>
						</ContainerRigthForm>
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
						placeholder="Descrição"
						control={control}
						name="description"
						autoCapitalize="characters"
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
