import { useForm } from "react-hook-form";
import { InputForm } from "../../../components/Form/InputForm";
import { Header } from "../../../components/Header";
import { RadioButton } from "react-native-paper";
import { CategoryCard } from "../../../components/CategoryCard";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { Alert, Modal } from "react-native";
import { CategorySelect } from "../../CategorySelect";
import { useTheme } from "styled-components";
import { useState } from "react";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import {
	Container,
	FormContainer,
	RadioContainer,
	TextInfo,
	TextSize,
	ViewSize,
	Footer,
} from "./styles";

type FormData = {
	[name: string]: any;
	breed: string;
	age: string;
	gender: string;
	size: string;
	typePet: string;
};

export function CreatePreferences() {
	const navigate = useNavigation();
	const { colors } = useTheme();
	const [gender, setGender] = useState("");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [size, setSize] = useState("");
	const [category, setCategory] = useState("");
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	function handleOpenSelectCategoryModal() {
		setModalSelectCategory(true);
	}

	function handleCloseSelectCategoryModal() {
		setModalSelectCategory(false);
	}

	async function submitForm(data: FormData) {
		if (category === "") {
			Alert.alert(
				"Não foi criar a preferencia",
				"Selecione uma categoria pro seu pet"
			);
			return;
		}
		const datas = {
			...data,
			size,
			gender,
			typePet: category,
		};

		try {
			const { data } = await api.post(`/api/preferences/add`, datas);
			console.log(data.data);

			navigate.goBack();
		} catch (error) {
			console.log(error);
			return "error";
		}
	}

	return (
		<Container>
			<Header title="Preferences" icon="left" />
			<FormContainer>
				<TextInfo>Idade em meses:</TextInfo>
				<InputForm
					placeholder="Idade em meses"
					control={control}
					name="age"
					keyboardType="numeric"
					error={errors.age}
				/>
				<InputForm
					placeholder="Raça"
					control={control}
					name="breed"
					autoCapitalize="sentences"
				/>
				<RadioContainer>
					<RadioButton.Group
						onValueChange={(check) => setSize(check)}
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
					<RadioButton.Group
						onValueChange={(gen) => setGender(gen)}
						value={gender}
					>
						<TextInfo>Sexo:</TextInfo>
						<ViewSize>
							<RadioButton value="M" color={colors.primary} />
							<TextSize>Masculino</TextSize>
						</ViewSize>

						<ViewSize>
							<RadioButton value="F" color={colors.primary} />
							<TextSize>Feminino</TextSize>
						</ViewSize>
					</RadioButton.Group>
				</RadioContainer>
				<CategoryCard
					onPress={handleOpenSelectCategoryModal}
					title={category === "" ? "Categoria" : category}
				/>
			</FormContainer>
			<Footer>
				<ContainerButton
					title="Criar Preferencia"
					onPress={handleSubmit(submitForm)}
				/>
			</Footer>

			<Modal visible={modalSelectCategory}>
				<CategorySelect
					category={category}
					setCategory={setCategory}
					closeSelectCategory={handleCloseSelectCategoryModal}
				/>
			</Modal>
		</Container>
	);
}
