import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal } from "react-native";
import { Header } from "../../../components/Header";
import { Button, RadioButton } from "react-native-paper";
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
	ButtonContainer,
} from "./styles";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { CategoryCard } from "../../../components/CategoryCard";
import { CategorySelect } from "../../CategorySelect";

type FormData = {
	[name: string]: any;
	medication: string;
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
	name:string; 
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

export function AddPet() {
	const { colors } = useTheme();
	const [size, setSize] = useState("pequeno");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [category, setCategory] = useState('Categoria');
	const navigate = useNavigation();
	const { user } = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	function handleOpenSelectCategoryModal() {
		setModalSelectCategory(true);
	}

	function handleCloseSelectCategoryModal() {
		setModalSelectCategory(false);
	}

	async function submitForm(data: FormData) {
		const datas = {
			...data,
			size,
			name: category,
		};
		console.log(datas)
		try {
			const { data } = await api.post(
				`/api/pet/add/companyguid/${user?.guid}`,
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
		<>
			<Header title="Cadastre pet para adoção" icon="left" />
			<Container>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.select({
						ios: 0,
						android: -2000,
					})}
					// style={{ flex: 1 }}
				>
					<ContainerAdd>
						<InfoDataPet>
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

						<CategoryCard
								onPress={handleOpenSelectCategoryModal}
								title={category}
							/>
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
								title="enivar"
							/>
						</ButtonContainer>
						<Modal visible={modalSelectCategory}>
							<CategorySelect
								category={category}
								setCategory={setCategory}
								closeSelectCategory={handleCloseSelectCategoryModal}
							/>
						</Modal>
					</ContainerAdd>
				</KeyboardAvoidingView>
			</Container>
		</>
	);
}
