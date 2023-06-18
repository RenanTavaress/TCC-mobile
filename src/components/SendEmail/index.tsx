import { yupResolver } from "@hookform/resolvers/yup";
import React, { ReactNode, useContext } from "react";
import { useForm } from "react-hook-form";
import { InputForm } from "../Form/InputForm";
import * as yup from "yup";
import { ContainerButton } from "../Button/ContainerLogin";
import api from "../../services/api";
import { Header } from "../Header";
import { Container, EmailContainer } from "./styles";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../contexts/auth";
import { TextInfo } from "../PetDetail/styles";

const schema = yup.object({
	email: yup
		.string()
		.email("Email inválido")
		.required("O Email é obrigatório")
		.trim(),
});

interface FormData {
	[name: string]: any;
	email: string;
}

interface sendEmailProps {
	endPoint: string;
	title: string;
}

export function SendEmail({ endPoint, title }: sendEmailProps) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleResetPassWord(datas: FormData) {
		const { data } = await api.post(endPoint, {
			...datas,
			companyGuid: user?.guid,
		});
		console.log({ ...datas, companyGuid: user?.guid });
		console.log(data);
		if (data.code === 200) {
			Alert.alert("Sucesso!", "Email enviado com sucesso");
			return navigate.goBack();
		} else {
			Alert.alert("Email inválido", "Email não encontrado");
		}
	}

	return (
		<Container>
			<Header title={title} icon="left" />

			<EmailContainer>
				<TextInfo>Caso queira enviar uma solicitação de avaliação. Insira o e-mail do usuário adotante.</TextInfo>
				<InputForm
					placeholder="Email"
					control={control}
					name="email"
					keyboardType="email-address"
					autoCapitalize="none"
					error={errors.email}
				/>

				<ContainerButton
					title="Enviar"
					onPress={handleSubmit(handleResetPassWord)}
				/>
			</EmailContainer>
		</Container>
	);
}
