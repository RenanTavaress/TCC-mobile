import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert, Platform, KeyboardAvoidingView, Modal } from "react-native";
import { Header } from "../../../components/Header";
import { RadioButton } from "react-native-paper";
import { InputForm } from "../../../components/Form/InputForm";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import {
	ButtonContainer,
	ButtonPickImage,
	Container,
	ContainerAdd,
	ContainerAge,
	ContainerLeftAge,
	ContainerRigthAge,
	ContainerSex,
	DescriptioInput,
	FormContainer,
	ImageButton,
	ImageContainer,
	ImageLeft,
	ImagePet,
	InfoDataPet,
	InfoRadioBtn,
	PickdateContainer,
	TextInfo,
	TextSize,
	ViewSize,
} from "../AddPets/styles";
import { DataPetContext, DataPetProps } from "../../../contexts/DataPet";
import { CategoryCard } from "../../../components/CategoryCard";
import { CategorySelect } from "../../CategorySelect";
import { propsLoginOng } from "../DashboardOngs";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { categories } from "../../../utils/categories";
import { breeds } from "../../../utils/breeds";
import { ListItem } from "../../../components/List";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type FormData = {
	[name: string]: any;
	typePet: string;
	medication: string;
	breed: string;
	size: string;
	birthDate: string;
	description: string;
	vaccines: string;
	color: string;
};

const schema = yup.object({
	color: yup.string().required("A cor é obrigatorio").trim(),
	breed: yup.string().required("A raça é obrigatorio").trim(),
	birthDate: yup
		.string()
		.required("A idade é obrigatório")
		.min(1, "O Campo deve ter pelo menos 1 digito"),
	description: yup.string().required("A Descrição é obrigatória").trim(),
	vaccines: yup.string().required("As vacinas são obrigatórias").trim(),
});

export function EditingPet() {
	const { params } = useRoute() as {
		params: {
			guid: string;
			age: string;
			medication: string;
			size: string;
			description: string;
			vaccines: string;
			typePet: string;
			breed: string;
			gender: string;
			photo1: string;
			color: string;
			birthDate: string;
		};
	};
	const birthDayString = params.birthDate;
	const [day, month, year] = birthDayString.split("/");
	const { colors } = useTheme();
	const navigate = useNavigation();
	const { user } = useContext(AuthContext);
	const [size, setSize] = useState(params.size);
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [category, setCategory] = useState(params.typePet);
	const [gender, setGender] = useState(params.gender);
	const { datasPet, getDataPet, setDataPet } = useContext(DataPetContext);
	const navigation = useNavigation<propsLoginOng["navigation"]>();
	const [photo, setPhoto] = useState([params?.photo1]);
	const [modalSelectBreed, setModalSelectBreed] = useState(false);
	const [breed, setBreed] = useState(params.breed ? params.breed : "Raça");
	const [selectedDate, setSelectedDate] = useState<Date>(
		new Date(Number(year), Number(month) - 1, Number(day))
	);
	const [showPicker, setShowPicker] = useState(false);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			birthDate: params.birthDate,
			name: params.typePet,
			medication: params.medication,
			size: params.size,
			description: params.description,
			breed: params.breed,
			vaccines: params.vaccines,
			color: params.color,
		},
	});

	const minimumDate = new Date(2007, 0, 1);
	const maximumDate = new Date();

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

	const handleDateChange = useCallback(
		(event: DateTimePickerEvent, date?: Date) => {
			if (date) {
				setSelectedDate(date);
				const getDateString = formatSelectedDate(date);
				setValue("birthDate", getDateString);
			}
			setShowPicker(false);
		},
		[showPicker]
	);

	const showDatePicker = () => setShowPicker(!showPicker);

	async function submitForm(data: FormData) {
		if (breed === "Raça" && category === "Cachorro") {
			Alert.alert(
				"Não foi possivel atualizar seu pet",
				"Selecione uma Raça para o seu cachorro"
			);
			return;
		}

		if (photo.length === 0) {
			Alert.alert(
				"Não foi possivel atualizar o pet",
				"Escolha uma foto do seu pet"
			);
			return;
		}

		let isDog = category === "Cachorro" ? breed : null;
		const datas = {
			...data,
			breed: isDog,
			size,
			typePet: category,
			gender,
			photo1: photo[0],
		};

		console.log(datas);
		try {
			const { data } = await api.put(
				`/api/pet/update/guid/${params.guid}`,
				datas
			);
			if (data!.code === 304) {
				Alert.alert("Tente novamente", "Deu algo Problema ");
				return;
			} else {
				setDataPet(data.data);
				Alert.alert("Sucesso", "Pet editado com sucesso!");
				navigation.navigate("petScreen", data.data);
				return;
			}
		} catch (error) {
			console.log(error);
			return "error";
		}
	}

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
	};

	useEffect(() => {
		if (photo[0] === undefined) {
			setPhoto([]);
		}
	}, []);

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

							{showPicker && (
								<DateTimePicker
									testID="dateTimePicker"
									value={selectedDate}
									mode="date"
									display={Platform.OS === "ios" ? "spinner" : "default"}
									minimumDate={minimumDate}
									maximumDate={maximumDate}
									onChange={handleDateChange}
								/>
							)}
						</ContainerAge>
						<DescriptioInput
							placeholder="Descrição do Pet"
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
