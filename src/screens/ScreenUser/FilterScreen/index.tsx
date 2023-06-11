import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
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
import { getCityAndOngName } from "../../../utils/cities";
import { getOngs } from "../../../utils/ongs";

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

type FormData = {
	[name: string]: any;
	breed: string | null;
	city: string | null;
	companyName: string | null;
	gender: string | null | undefined;
	size: string | null | undefined;
	typePet: string | null;
};

export function FilterScreen() {
	const navigate = useNavigation();
	const { setPetsFilter, setIsFiltered, inputFilterd, setInputFilterd } =
		useContext(PetsFilterContext);
	const [size, setSize] = useState(inputFilterd.size ? inputFilterd.size : "");
	const [gender, setGender] = useState(
		inputFilterd.gender ? inputFilterd.gender : ""
	);
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [modalSelectBreed, setModalSelectBreed] = useState(false);
	const [modalSelectCity, setModalSelectCity] = useState(false);
	const [modalSelectOng, setModalSelectOng] = useState(false);
	const [category, setCategory] = useState(
		inputFilterd.typePet ? inputFilterd.typePet : "Espécie"
	);
	const [breed, setBreed] = useState(
		inputFilterd.breed ? inputFilterd.breed : "Raça"
	);

	const [nameCity, setNameCity] = useState(
		inputFilterd.city ? inputFilterd.city : "Cidade"
	);
	const [city, setCity] = useState(null);
	const [companyName, setCompanyName] = useState(
		inputFilterd.companyName ? inputFilterd.companyName : "ONGs"
	);
	const [ong, setOng] = useState(null);
	const { colors } = useTheme();
	const { control, handleSubmit, setValue } = useForm<FormData>({
		defaultValues: {
			breed: inputFilterd.breed,
			city: inputFilterd.city,
			companyName: inputFilterd.companyName,
			gender: inputFilterd.gender,
			size: inputFilterd.size,
			typePet: inputFilterd.typePet,
		},
		resolver: yupResolver(schema),
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

	function handleOpenSelectCityModal() {
		setModalSelectCity(true);
	}

	function handleCloseSelectCityModal() {
		setModalSelectCity(false);
	}

	function handleOpenSelectOngModal() {
		setModalSelectOng(true);
	}

	function handleCloseSelectOngModal() {
		setModalSelectOng(false);
	}

	useEffect(() => {
		async function consumirCities() {
			const cities = await getCityAndOngName();
			setCity(cities);
		}

		consumirCities();
	}, [modalSelectCity]);

	// useEffect(() => {
	// 	// if (Object.keys(inputFilterd).length > 0) {
	// 	//   Object.entries(inputFilterd).forEach(([fieldName, value]) => {
	// 	// 	 setValue(fieldName, value);
	// 	//   });
	// 	// }
	// 	console.log(inputFilterd?.typePet)
	// 	setCategory(inputFilterd?.typePet);
	// }, [inputFilterd]);

	useEffect(() => {
		async function consumirOngs() {
			const ongs = await getOngs();
			setOng(ongs);
		}

		consumirOngs();
	}, [modalSelectOng]);

	async function submitForm() {
		const typeCategory = category === "Espécie" ? "" : category;
		const isDog = breed === "Raça" ? null : breed;
		const isCity = nameCity === "Cidade" ? null : nameCity;
		const isOng = companyName === "ONGs" ? null : companyName;
		const datas: FormData = {
			companyName: isOng,
			breed: isDog,
			city: isCity,
			size,
			gender,
			typePet: typeCategory,
		};
		console.log(datas);

		setInputFilterd(datas);

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
					originalTitle="Espécie"
					isFiltering
					setTitle={setCategory}
				/>

				{category === "Cachorro" && (
					<CategoryCard
						onPress={handleOpenSelectBreedModal}
						title={breed}
						originalTitle="Raça"
						isFiltering
						setTitle={setBreed}
					/>
				)}
				<CategoryCard
					onPress={handleOpenSelectCityModal}
					title={nameCity}
					originalTitle="Cidade"
					isFiltering
					setTitle={setNameCity}
				/>
				<CategoryCard
					onPress={handleOpenSelectOngModal}
					title={companyName}
					originalTitle="ONGs"
					isFiltering
					setTitle={setCompanyName}
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
				<ContainerButton title="Filtrar" onPress={submitForm} />
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
			<Modal visible={modalSelectCity}>
				<CategorySelect
					category={nameCity}
					setCategory={setNameCity}
					closeSelectCategory={handleCloseSelectCityModal}
					titleAnimal="Escolha a cidade"
					categories={city}
				/>
			</Modal>
			<Modal visible={modalSelectOng}>
				<CategorySelect
					category={companyName}
					setCategory={setCompanyName}
					closeSelectCategory={handleCloseSelectOngModal}
					titleAnimal="Escolha a ONG"
					categories={ong}
				/>
			</Modal>
		</Container>
	);
}
