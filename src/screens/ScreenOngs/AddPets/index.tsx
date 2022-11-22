import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Alert,
	Modal,
	View,
	KeyboardAvoidingView,
	Button,
	Image,
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
	ButtonContainer,
	FormContainer,
	ImageLeft,
	ImageRigh,
	ImageButton,
	ImagePet,
	ImageContainer,
} from "./styles";
import { useTheme } from "styled-components";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../../contexts/auth";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";
import { Platform } from "react-native";
import { ContainerButton } from "../../../components/Button/ContainerLogin";
import { CategoryCard } from "../../../components/CategoryCard";
import { CategorySelect } from "../../CategorySelect";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

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

interface ImagesProps {
	cancelled: boolean;
	height: number;
	type: string;
	uri: string;
	width: number;
}

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
	const [gender, setGender] = useState("M");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [category, setCategory] = useState("Categoria");
	const navigate = useNavigation();
	const { user } = useContext(AuthContext);
	const [photo, setPhoto] = useState([]);
	console.log(photo.length);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	function handleRemovePhoto(index: number) {
		const result = photo.splice(index, 1);

		setPhoto(result);
	}

	const pickImage = async () => {
		if (photo.length <= 3) {
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

			console.log(photo.length + " dentro da função");
		} else {
			Alert.alert(
				"Não foi possivel adicionar mais fotos",
				"So possivel adicionar ate 4 fotos"
			);
			return;
		}
	};

	function handleOpenSelectCategoryModal() {
		setModalSelectCategory(true);
	}

	function handleCloseSelectCategoryModal() {
		setModalSelectCategory(false);
	}

	async function submitForm(data: FormData) {
		if (category === "Categoria") {
			Alert.alert(
				"Não foi possivel cadastrar",
				"Selecione uma categoria pro seu pet"
			);
			return;
		}
		const datas = {
			...data,
			size,
			gender,
			typePet: category,
			photo1: photo[1] || null,
			photo2: photo[2] || null,
			photo3: photo[3] || null,
			photo4: photo[4] || null,
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

	useEffect(() => {
		pickImage()
	},[])
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
					<Header title="Cadastre pet para adoção" icon="left" />
					<FormContainer>
						<ImageContainer>
							{photo.length > 0 && (
								<ImageLeft>
									{/* <TouchableOpacity onPress={() => handleRemovePhoto(0)}>
										<AntDesign name="delete" size={14} color="red" />
									</TouchableOpacity> */}
									<ImageButton>
										<ImagePet source={{ uri: photo[0] }} />
									</ImageButton>
									{/* <TouchableOpacity onPress={() => handleRemovePhoto(1)}>
										<AntDesign name="delete" size={14} color="red" />
									</TouchableOpacity> */}
									<ImageButton>
										<ImagePet source={{ uri: photo[1] }} />
									</ImageButton>
									{/* <TextInfo>fdfdfdfdfds</TextInfo>
								<TextInfo>kkkkkkkkkkkkkk</TextInfo> */}
								</ImageLeft>
							)}
							{photo.length > 2 && (
								<ImageRigh>
									<ImageButton>
										<ImagePet source={{ uri: photo[2] }} />
									</ImageButton>
									<ImageButton>
										<ImagePet source={{ uri: photo[3] }} />
									</ImageButton>
									{/* <TextInfo>fdfdfdfdfds</TextInfo>
								<TextInfo>kkkkkkkkkkkkkk</TextInfo> */}
								</ImageRigh>
							)}
						</ImageContainer>
						<InfoDataPet>
							<Button
								title="Pick an image from camera roll"
								onPress={pickImage}
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
								title="enivar"
							/>
						</ButtonContainer>
					</FormContainer>

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

{
	/* <Image
										source={{ uri: photo[0] }}
										style={{ width: 200, height: 200 }}
									/> */
}
