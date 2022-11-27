import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useState, useEffect } from "react";
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
	Modal,
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
	ImageContainer,
	ImageLeft,
	ImageButton,
	ImagePet,
	ButtonPickImage,
} from "./styles";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import {
	useFocusEffect,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { ButtonContainer } from "../AddPets/styles";
import { DataPetContext, DataPetProps } from "../../../contexts/DataPet";
import { CategoryCard } from "../../../components/CategoryCard";
import { CategorySelect } from "../../CategorySelect";
import { propsLoginOng } from "../DashboardOngs";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type FormData = {
	[name: string]: any;
	typePet: string;
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
		};
	};
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

	//console.log(photo)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			age: params.age,
			name: params.typePet,
			medication: params.medication,
			size: params.size,
			description: params.description,
			breed: params.breed,
			vaccines: params.vaccines,
		},
	});
	function handleOpenSelectCategoryModal() {
		setModalSelectCategory(true);
	}

	function handleCloseSelectCategoryModal() {
		setModalSelectCategory(false);
	}

	async function submitForm(data: FormData) {
		if (photo.length === 0) {
			Alert.alert(
				"Não foi possivel atualizar o pet",
				"Escolha uma foto do seu pet"
			);
			return;
		}
		const datas = {
			...data,
			size,
			typePet: category,
			gender,
			photo1: photo[0],
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

		if (result.cancelled) {
			return;
		}

		setPhoto(photo.concat(`data:image/jpg;base64,${result.base64}`));
	};

	useEffect(() => {
		if (photo[0] === undefined) {
			setPhoto([]);
		}
	}, []);

	return (
		<Container>
			<Header title="Edite o pet" icon="left" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.select({ ios: 0, android: -2000 })}
				style={{ flex: 1 }}
			>
				<ContainerAdd>
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
						{photo.length === 0 && (
							<ButtonPickImage title="Escolha uma imagem" onPress={pickImage} />
						)}
					</ImageContainer>
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
						<CategoryCard
							onPress={handleOpenSelectCategoryModal}
							title={category}
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
						</ContainerAge>
					</InfoRadioBtn>
					<TextInfo>Idade em meses:</TextInfo>
					<InputForm
						placeholder="Idade em meses"
						control={control}
						name="age"
						keyboardType="numeric"
						error={errors.age}
					/>

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
	);
}
