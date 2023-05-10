import { yupResolver } from "@hookform/resolvers/yup";
import react, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { InputForm } from "../Form/InputForm";
import * as yup from "yup";
import { ContainerButton } from "../Button/ContainerLogin";
import api from "../../services/api";
import { Header } from "../Header";
import { Container, EmailContainer } from "./styles";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
	email: yup
		.string()
		.email("Email invalido")
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

export function SendEmail({endPoint, title}: sendEmailProps) {
	const navigate = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleResetPassWord(datas: FormData) {
		const { data } = await api.post(endPoint, datas);
		console.log(data);
		if (data.code === 200) {
			Alert.alert("Sucesso!", "Email enviado com sucesso");
			return navigate.goBack()
		} else {
			Alert.alert("Email invalido", "Email não encontrado");
		}
	}

	return (
		<Container>
			<Header title={title} icon="left" />
			<EmailContainer>
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
