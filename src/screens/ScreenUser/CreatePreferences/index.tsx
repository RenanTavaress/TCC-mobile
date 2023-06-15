import React from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { categories } from "../../../utils/categories";
import { breeds } from "../../../utils/breeds";
import { ContainerAge, ContainerLeftAge, ContainerRigthAge } from "../../ScreenOngs/AddPets/styles";
import { ListItem } from "../../../components/List";

type FormData = {
	[name: string]: any;
	breed: string;
	age: string;
	gender: string;
	size: string;
	typePet: string;
};

const schema = yup.object({
	age: yup.string().matches(/^[0-9]+$/, "Por favor, insira apenas numeros."),
	category: yup.boolean(),
	breed: yup
		.string()
		.when("category", {
			is: "Cachorro",
			then: yup.string().required("A raça é obrigatorio"),
		})
		.trim(),
});

export function CreatePreferences() {
	const navigate = useNavigation();
	const { colors } = useTheme();
	const [gender, setGender] = useState("M");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [modalSelectBreed, setModalSelectBreed] = useState(false);
	const [selectAge, setSelectAge] = useState("Ano(s)");
	const [size, setSize] = useState("pequeno");
	const [category, setCategory] = useState("Espécie");
	const [breed, setBreed] = useState("Raça");
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const concatenatingAge = `${watch("age")} ${selectAge}`;

	function handleOpenSelectCategoryModal() {
		setModalSelectCategory(true);
	}

	function handleCloseSelectCategoryModal() {
		setModalSelectCategory(false);
	}
	function handleOpenSelectBreedModal() {
		setModalSelectBreed(true);
	}

	function handleCloseSelectBreedModal() {
		setModalSelectBreed(false);
	}

	async function submitForm(data: FormData) {
		if (category === "Espécie") {
			Alert.alert(
				"Não foi criar a preferencia",
				"Selecione uma categoria pro seu pet"
			);
			return;
		}

		if (breed === "Raça" && category === "Cachorro") {
			Alert.alert(
				"Não foi possivel cadastrar",
				"Selecione uma Raça para o seu cachorro"
			);
			return;
		}
		let isDog = category === "Cachorro" ? breed : null;
		const datas = {
			...data,
			age: concatenatingAge,
			breed: isDog,
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
			<Header title="Minhas Preferências" icon="left" />
			<FormContainer>
				<CategoryCard
					onPress={handleOpenSelectCategoryModal}
					title={category}
				/>
				{category === "Cachorro" && (
					<CategoryCard onPress={handleOpenSelectBreedModal} title={breed} />
				)}

				{/* <ContainerAge>
					<ContainerRigthAge>
						<TextInfo>Idade do pet:</TextInfo>
						<InputForm
							placeholder="Idade"
							control={control}
							name="age"
							keyboardType="numeric"
							error={errors.age}
						/>
					</ContainerRigthAge>
					<ContainerLeftAge>
						<ListItem selectedItem={selectAge} setSelectedItem={setSelectAge} />
					</ContainerLeftAge>
				</ContainerAge> */}
				<RadioContainer>
					<RadioButton.Group
						onValueChange={(check) => setSize(check)}
						value={size}
					>
						<TextInfo>Porte:</TextInfo>
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
							<TextSize>Macho</TextSize>
						</ViewSize>

						<ViewSize>
							<RadioButton value="F" color={colors.primary} />
							<TextSize>Fêmea</TextSize>
						</ViewSize>
					</RadioButton.Group>
				</RadioContainer>
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
					categories={categories}
					titleAnimal="Espécie do animal"
				/>
			</Modal>
			<Modal visible={modalSelectBreed}>
				<CategorySelect
					category={breed}
					setCategory={setBreed}
					closeSelectCategory={handleCloseSelectBreedModal}
					titleAnimal="Escolha a raça"
					categories={breeds}
				/>
			</Modal>
		</Container>
	);
}
