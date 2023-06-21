import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, KeyboardAvoidingView } from "react-native";
import { Header } from "../../../components/Header";
import { RadioButton } from "react-native-paper";
import { InputForm } from "../../../components/Form/InputForm";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
	PickdateContainer,
	ButtonRemoveImage,
} from "./styles";
import theme from "../../../global/styles/theme";

type FormData = {
	[name: string]: any;
	medication: string;
	breed: string;
	size: string;
	birthDate: string;
	description: string;
	vaccines: string;
	gender: string;
	typePet: string;
	photo1: string;
	color: string;
};

const schema = yup.object({
	color: yup.string().required("A cor é obrigatorio").trim(),
	category: yup.boolean(),
	breed: yup
		.string()
		.when("category", {
			is: "Cachorro",
			then: yup.string().required("A raça é obrigatorio"),
		})
		.trim(),
	birthDate: yup
		.string()
		.min(10, "A data de nascimento tem quer 10 digitos")
		.required("A idade é obrigatório"),
	description: yup.string().required("A Descrição é obrigatória").trim(),
	vaccines: yup.string().required("As vacinas são obrigatórias").trim(),
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
	const { user } = useContext(AuthContext);
	const [photo, setPhoto] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const minimumDate = new Date(2007, 0, 1);
	const maximumDate = new Date();

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

	const formatSelectedDate = (date: Date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day.toString().padStart(2, "0")}/${month
			.toString()
			.padStart(2, "0")}/${year.toString()}`;
	};

	const showDatePicker = () => {
		setShowPicker(true);
	};

	const hideDatePicker = () => {
		setShowPicker(false);
	};

	const handleConfirm = (date: Date) => {
		setShowPicker(false);
		setSelectedDate(date);
		const getDateString = formatSelectedDate(date);
		setValue("birthDate", getDateString);
	};

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
			breed: isDog,
			size,
			gender,
			typePet: category,
			photo1: photo[0] || null,
		};

		console.log(datas);

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
					<Header title="Cadastrar Pet" icon="left" />
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
								<>
									<ImageLeft>
										<ImageButton>
											<ImagePet source={{ uri: photo[0] }} />
										</ImageButton>
									</ImageLeft>

									<ButtonRemoveImage
										title="Remover imagem"
										onPress={() => handleRemovePhoto(photo[0])}
										color={theme.colors.attention_light}
									/>
								</>
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
							<TextInfo>Ano de nascimento do pet:</TextInfo>
							<PickdateContainer>
								<ContainerLeftAge>
									<ContainerButton
										title="Selecionar Data"
										onPress={showDatePicker}
									/>
								</ContainerLeftAge>
								<ContainerRigthAge>
									<InputForm
										placeholder="Data"
										control={control}
										name="birthDate"
										error={errors.birthDate}
										editable={false}
									/>
								</ContainerRigthAge>
							</PickdateContainer>

							<DateTimePickerModal
								testID="dateTimePicker"
								date={selectedDate}
								mode="date"
								display={Platform.OS === "ios" ? "spinner" : "default"}
								minimumDate={minimumDate}
								maximumDate={maximumDate}
								isVisible={showPicker}
								onConfirm={handleConfirm}
								onCancel={hideDatePicker}
							/>
						</ContainerAge>

						<DescriptioInput
							placeholder="Descrição do Pet (Nome e suas características)"
							control={control}
							name="description"
							autoCapitalize="sentences"
							error={errors.description}
						/>

						<InputForm
							placeholder="Cor"
							control={control}
							name="color"
							autoCapitalize="sentences"
							error={errors.color}
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
							titleAnimal="Espécie do Animal"
							categories={categories}
						/>
					</Modal>
					<Modal visible={modalSelectBreed}>
						<CategorySelect
							category={breed}
							setCategory={setBreed}
							closeSelectCategory={handleCloseSelectBreedModal}
							titleAnimal="Escolha a Raça"
							categories={breeds}
						/>
					</Modal>
				</ContainerAdd>
			</KeyboardAvoidingView>
		</Container>
	);
}
