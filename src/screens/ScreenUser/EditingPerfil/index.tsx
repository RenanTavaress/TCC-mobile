import React, { useContext } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { InputForm } from "../../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container, MainForm, RegisterButton } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";
import { Header } from "../../../components/Header";
import { UserProps, DataUserContext } from "../../../contexts/dataUsers";

type FormData = {
	[name: string]: any;
	name: string;
	document: string;
	email: string;
	phone: string;
	guid: string;
};

const schema = yup.object({
	name: yup.string().required("O nome é obrigatório").trim(),
	document: yup
		.string()
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
		.min(10, "O Campo deve ter 10 digitos contando com o DDD")
		.trim(),
});

export function EditingPerfil() {
	const navigate = useNavigation();
	const { datasUser, setDatasUser } = useContext(DataUserContext) as UserProps;
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: datasUser.name,
			document: datasUser.document,
			email: datasUser.email,
			phone: datasUser.phone,
		},
	});

	async function handleUpdateDataUser(datas: FormData) {
		try {
			const { data } = await api.put(
				`/api/user/update/guid/${datasUser.guid}`,
				datas
			);

			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Já existe usuario com esse nome ");
				return;
			} else {
				setDatasUser(data.data);
				Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
				return navigate.goBack();
			}
		} catch (error) {
			console.log(error);
			return "error";
		}
	}

	return (
		<Container>
			<Header title="Detalhes do Usuário" icon="left" />

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
						editable={false}
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
					<RegisterButton
						title="Atualizar"
						onPress={handleSubmit(handleUpdateDataUser)}
					/>
				</MainForm>
			</KeyboardAvoidingView>
		</Container>
	);
}
