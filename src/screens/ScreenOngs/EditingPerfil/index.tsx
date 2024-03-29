import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
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
} from "./styles";
import api from "../../../services/api";
import { Header } from "../../../components/Header";
import { DataOngContext } from "../../../contexts/DataOng";
import { DataAdress } from "../RegisterOng";

type FormData = {
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
	street: yup.string().required("A Rua é obrigatória").trim(),
	cep: yup.string().required("O CEP é obrigatório"),
	city: yup.string().required("A cidade é obrigatória").trim(),
	country: yup.string().required("O País é obrigatória").trim(),
	numberAddress: yup.string().required("O Numero é obrigatório"),
	district: yup.string().required("O Bairro é obrigatório").trim(),
	uf: yup.string().required("O UF é obrigatório").trim(),
	phone: yup.string().required("O Telefone é obrigatório").min(10, "O Campo deve ter 10 digitos contando com o DDD").trim(),
	description: yup.string().required("A Descrição é obrigatória").trim(),
});

export function EditingOng() {
	const navigate = useNavigation();
	const { datasOngs, setDatasOngs } = useContext(DataOngContext);
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
		defaultValues: {
			name: datasOngs.name,
			document: datasOngs.document,
			email: datasOngs.email,
			street: datasOngs.street,
			cep: datasOngs.cep,
			city: datasOngs.city,
			country: datasOngs.country,
			numberAddress: datasOngs.numberAddress,
			district: datasOngs.district,
			uf: datasOngs.uf,
			phone: datasOngs.phone,
			description: datasOngs.description,
		},
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
				clearErrors("cep")
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
			clearErrors("cep")
		}
	}

	async function handleOngRegister(datas: FormData) {
		try {
			const { data } = await api.put(
				`/api/company/update/guid/${datasOngs.guid}`,
				datas
			);
			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Já existe usuario com esse nome ou email");
				return;
			} else {
				setDatasOngs(data.data);
				Alert.alert("Sucesso", "Usuário Atualizado com sucesso!");
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
			<Header title="Edite Detalhes do Usuário" icon="left" />

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
						editable={false}
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
					<RegisterButton
						title="Editar"
						onPress={handleSubmit(handleOngRegister)}
					/>
				</MainForm>
			</KeyboardAvoidingView>
		</Container>
	);
}
