import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
	View,
	Button,
	Text,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	KeyboardAvoidingView,
} from "react-native";
import { Header } from "../../../components/Header";
import { RadioButton } from "react-native-paper";
import { InputForm } from "../../../components/Form/InputForm";
import {
	Container,
	ContainerAdd,
	InfoDataPet,
	InfoRadioBtn,
	ViewSize,
	ContainerAge,
	DescriptioInput,
	TextInfo,
	TextSize,
} from "./styles";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { ButtonContainer } from "../AddPets/styles";

type FormData = {
	[name: string]: any;
	name: string;
	medication: string;
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
};

const schema = yup.object({
	medication: yup.string().required("A cor é obrigatorio").trim(),
	breed: yup.string().required("A raça é obrigatorio").trim(),
	age: yup
		.string()
		.required("A idade é obrigatório")
		.min(1, "O Campo deve ter pelo menos 1 digito"),
	description: yup.string().required("A Descrição é obrigatória").trim(),
});

export function EditingPet() {
	const { colors } = useTheme();
	const [size, setSize] = useState("pequeno");
	const navigate = useNavigation();
	const { user } = useContext(AuthContext);
	const { params } = useRoute() as {
		params: {
			guid: string;
		};
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function submitForm(data: FormData) {
		const datas = {
			...data,
			size,
		};
		try {
			const { data } = await api.put(
				`/api/pet/update/guid/${params.guid}`,
				datas
			);
			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Deu algo Problema ");
				return;
			} else {
				Alert.alert("Sucesso", "Pet criado com sucesso!");
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
			<Header title="Cadastre pet para adoção" icon="left" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.select({ ios: 0, android: -2000 })}
				style={{ flex: 1 }}
			>
				<ContainerAdd>
					<InfoDataPet>
						<InputForm
							placeholder="nome"
							control={control}
							name="name"
							autoCapitalize="sentences"
							error={errors.name}
						/>
						<InputForm
							placeholder="vacina"
							control={control}
							name="vaccines"
							autoCapitalize="sentences"
							error={errors.vaccines}
						/>
						<InputForm
							placeholder="Cor"
							control={control}
							name="medication"
							autoCapitalize="sentences"
							error={errors.medication}
						/>

						<InputForm
							placeholder="Raça"
							control={control}
							name="breed"
							autoCapitalize="sentences"
							error={errors.breed}
						/>
					</InfoDataPet>

					<InfoRadioBtn>
						<RadioButton.Group
							onValueChange={(checked) => setSize(checked)}
							value={size}
						>
							<TextInfo>Tamanho:</TextInfo>
							<ViewSize>
								<RadioButton value="pequeno" color={colors.primary} />
								<TextSize>Pequeno</TextSize>
							</ViewSize>

							<ViewSize>
								<RadioButton value="medio" color={colors.primary} />
								<TextSize>Médio</TextSize>
							</ViewSize>

							<ViewSize>
								<RadioButton value="grande" color={colors.primary} />
								<TextSize>Grande</TextSize>
							</ViewSize>
						</RadioButton.Group>
						<ContainerAge>
							<TextInfo>Idade em meses:</TextInfo>
							<InputForm
								placeholder="Idade em meses"
								control={control}
								name="age"
								keyboardType="numeric"
								error={errors.age}
							/>
						</ContainerAge>
					</InfoRadioBtn>

					<DescriptioInput
						placeholder="Descrição"
						control={control}
						name="description"
						autoCapitalize="sentences"
						error={errors.description}
					/>
					<ButtonContainer>
						<ContainerButton
							onPress={handleSubmit(submitForm)}
							title="Editar"
						/>
					</ButtonContainer>
				</ContainerAdd>
			</KeyboardAvoidingView>
		</Container>
	);
}
