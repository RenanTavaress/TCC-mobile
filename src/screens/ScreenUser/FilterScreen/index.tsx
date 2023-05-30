import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal } from "react-native";
import { RadioButton } from "react-native-paper";
import { useTheme } from "styled-components";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { CategoryCard } from "../../../components/CategoryCard";
import { InputForm } from "../../../components/Form/InputForm";
import { Header } from "../../../components/Header";
import { PetsFilterContext } from "../../../contexts/FilterPet";
import api from "../../../services/api";
import { CategorySelect } from "../../CategorySelect";
import {
	Container,
	FormContainer,
	RadioContainer,
	TextInfo,
	TextSize,
	ViewSize,
	Footer,
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { categories } from "../../../utils/categories";
import { breeds } from "../../../utils/breeds";

type FormData = {
	[name: string]: any;
	breed: string;
	city: string;
	companyName: string;
	description: string;
	district: string;
	gender: string;
	size: string;
	typePet: string;
};


const schema = yup.object({
	
	category: yup.boolean(),
	breed: yup
		.string()
		.when("category", {
			is: "Cachorro",
			then: yup.string().required("A raça é obrigatorio"),
		})
		.trim(),
	
});



export function FilterScreen() {
	const navigate = useNavigation();
	const { setPetsFilter, setIsFiltered } = useContext(PetsFilterContext);
	const [size, setSize] = useState("");
	const [gender, setGender] = useState("");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [modalSelectBreed, setModalSelectBreed] = useState(false);
	const [category, setCategory] = useState("Espécie");
	const [breed, setBreed] = useState("Raça");
	const [inputFilterd, setInputFilterd] = useState("");
	const { colors } = useTheme();
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			// breed:  "",
			city: inputFilterd ?? "",
			// companyName: ,
			// description: ,
			// district: ,
			// gender: ,
			// size: ,
			// typePet: ,
		},
		resolver: yupResolver(schema)
	});

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
		if (breed === "Raça" && category === "Cachorro") {
			Alert.alert(
				"Não foi possivel filtrar",
				"Selecione uma Raça para o seu cachorro"
			);
			return;
		}

		const typeCategory = category === "Espécie" ? "" : category;
		const isDog = category === "Cachorro" ? breed : null
		const datas = {
			...data,
			breed: isDog,
			size,
			gender,
			typePet: typeCategory,
		};

		console.log(datas);
		setInputFilterd("Campinas");
		try {
			const { data } = await api.post(`/api/pet/list`, datas);
			setPetsFilter(data.data);
			setIsFiltered(true);
			navigate.goBack();
		} catch (error) {
			console.log(error);
			return "error";
		}
	}

	return (
		<Container>
			<Header title="Filtros" icon="left" />
			<FormContainer>
				<CategoryCard
					onPress={handleOpenSelectCategoryModal}
					title={category}
				/>

				{category === "Cachorro" && (
					<CategoryCard onPress={handleOpenSelectBreedModal} title={breed} />
				)}
				<InputForm
					placeholder="Cidade"
					control={control}
					name="city"
					autoCapitalize="sentences"
				/>
				<InputForm
					placeholder="ONG"
					control={control}
					name="companyName"
					autoCapitalize="sentences"
				/>
				<InputForm
					placeholder="Descrição"
					control={control}
					name="description"
					autoCapitalize="sentences"
				/>
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
				<ContainerButton title="Filtrar" onPress={handleSubmit(submitForm)} />
			</Footer>

			<Modal visible={modalSelectCategory}>
				<CategorySelect
					category={category}
					setCategory={setCategory}
					closeSelectCategory={handleCloseSelectCategoryModal}
					titleAnimal="Espécie do animal"
					categories={categories}
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
