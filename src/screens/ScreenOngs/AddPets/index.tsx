import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, KeyboardAvoidingView } from "react-native";
import { Header } from "../../../components/Header";
import { RadioButton } from "react-native-paper";
import { InputForm } from "../../../components/Form/InputForm";

import {
	Container,
	ContainerAdd,
	InfoDataPet,
	InfoRadioBtn,
	ViewSize,
	ContainerSex,
	ContainerAge,
	DescriptioInput,
	TextInfo,
	TextSize,
	ButtonContainer,
	FormContainer,
	ImageLeft,
	ImageButton,
	ImagePet,
	ImageContainer,
	ButtonPickImage,
	ContainerRigthAge,
	ContainerLeftAge,
} from "./styles";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { CategoryCard } from "../../../components/CategoryCard";
import { CategorySelect } from "../../CategorySelect";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { categories } from "../../../utils/categories";
import { breeds } from "../../../utils/breeds";
import { ListItem } from "../../../components/List";

type FormData = {
	[name: string]: any;
	medication: string;
	breed: string;
	size: string;
	age: string;
	description: string;
	vaccines: string;
	gender: string;
	typePet: string;
	photo1: string;
};

const schema = yup.object({
	medication: yup.string().required("A cor é obrigatorio").trim(),
	category: yup.boolean(),
	breed: yup
		.string()
		.when("category", {
			is: "Cachorro",
			then: yup.string().required("A raça é obrigatorio"),
		})
		.trim(),
	age: yup
		.string()
		.matches(/^[0-9]+$/, "Por favor, insira apenas numeros.")
		.required("A idade é obrigatório")
		.min(1, "O Campo deve ter pelo menos 1 digito"),
	description: yup.string().required("A Descrição é obrigatória").trim(),
});

export function AddPet() {
	const { colors } = useTheme();
	const [size, setSize] = useState("pequeno");
	const [gender, setGender] = useState("M");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [modalSelectBreed, setModalSelectBreed] = useState(false);
	const [category, setCategory] = useState("Espécie");
	const [breed, setBreed] = useState("Raça");
	const navigate = useNavigation();
	const [selectAge, setSelectAge] = useState("Ano(s)");
	const { user } = useContext(AuthContext);
	const [photo, setPhoto] = useState([]);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const concatenatingAge = `${watch("age")} ${selectAge}`;

	function handleRemovePhoto(index: string) {
		if (!index) {
			Alert.alert(
				"Não foi possivel deletar essa fotos",
				"Foto não disponivel nesse lugar"
			);
			return;
		}
		const result = photo.filter((ele) => ele !== index);

		setPhoto(result);
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			base64: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (result.canceled) {
			return;
		}

		setPhoto(photo.concat(`data:image/jpg;base64,${result.assets[0].base64}`));
		console.log(`tamanho do array dps que adicionou foto: ${photo.length}`);
	};

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
				"Não foi possivel cadastrar",
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

		if (photo.length === 0) {
			Alert.alert(
				"Não foi possivel cadastrar o pet",
				"Escolha uma foto do seu pet"
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
			photo1: photo[0] || null,
		};

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
		<Container>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.select({
					ios: 0,
					android: -2000,
				})}
			>
				<ContainerAdd>
					<Header title="Cadastro de Novo Pet" icon="left" />
					<FormContainer>
						<CategoryCard
							onPress={handleOpenSelectCategoryModal}
							title={category}
						/>
						{category === "Cachorro" && (
							<CategoryCard
								onPress={handleOpenSelectBreedModal}
								title={breed}
							/>
						)}

						<ImageContainer>
							{photo.length == 1 && (
								<ImageLeft>
									<TouchableOpacity onPress={() => handleRemovePhoto(photo[0])}>
										<AntDesign name="delete" size={14} color="red" />
									</TouchableOpacity>
									<ImageButton>
										<ImagePet source={{ uri: photo[0] }} />
									</ImageButton>
								</ImageLeft>
							)}
						</ImageContainer>
						<InfoDataPet>
							{photo.length == 0 && (
								<ButtonPickImage
									title="Escolha uma imagem"
									onPress={pickImage}
								/>
							)}
						</InfoDataPet>

						<InfoRadioBtn>
							<RadioButton.Group
								onValueChange={(checked) => setSize(checked)}
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
							<ContainerSex>
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
							</ContainerSex>
						</InfoRadioBtn>

						<ContainerAge>
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
								<ListItem
									selectedItem={selectAge}
									setSelectedItem={setSelectAge}
								/>
							</ContainerLeftAge>
						</ContainerAge>
						<DescriptioInput
							placeholder="Descrição"
							control={control}
							name="description"
							autoCapitalize="sentences"
							error={errors.description}
						/>

						<InputForm
							placeholder="Cor"
							control={control}
							name="medication"
							autoCapitalize="sentences"
							error={errors.medication}
						/>
						<InputForm
							placeholder="Vacinas Tomadas"
							control={control}
							name="vaccines"
							autoCapitalize="sentences"
							error={errors.vaccines}
						/>
						<ButtonContainer>
							<ContainerButton
								onPress={handleSubmit(submitForm)}
								title="Salvar"
							/>
						</ButtonContainer>
					</FormContainer>

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
				</ContainerAdd>
			</KeyboardAvoidingView>
		</Container>
	);
}
