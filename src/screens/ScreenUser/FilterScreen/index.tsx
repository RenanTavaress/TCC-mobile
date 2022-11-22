import { useNavigation } from "@react-navigation/native";
import react, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Text } from "react-native";
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
	Footer
} from "./styles";

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

export function FilterScreen() {
	const navigate = useNavigation();
	const { setPetsFilter } = useContext(PetsFilterContext);
	const [size, setSize] = useState("");
	const [gender, setGender] = useState("");
	const [modalSelectCategory, setModalSelectCategory] = useState(false);
	const [category, setCategory] = useState("");
	const { colors } = useTheme();
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
		const datas = {
			...data,
			size,
			gender,
			typePet: category,
		};

		try {
			const { data } = await api.post(`/api/pet/list`, datas);
			setPetsFilter(data.data);

			navigate.goBack();

			// if (data!.code === 304) {
			// 	Alert.alert("Tente novamente", "Deu algo Problema ");
			// 	return;
			// } else {
			// 	Alert.alert("Sucesso", "Pet criado com sucesso!");
			// 	navigate.goBack();
			// 	return;
			// }
		} catch (error) {
			console.log(error);
			return "error";
		}
	}

	return (
		<Container>
			<Header title="Filtros" icon="left" />
			<FormContainer>
				<InputForm
					placeholder="Raça"
					control={control}
					name="breed"
					autoCapitalize="sentences"
				/>
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
					placeholder="Bairro"
					control={control}
					name="district"
					autoCapitalize="sentences"
				/>
				<InputForm
					placeholder="descrição"
					control={control}
					name="description"
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
				<ContainerButton title="Filtrar" onPress={handleSubmit(submitForm)} />
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
