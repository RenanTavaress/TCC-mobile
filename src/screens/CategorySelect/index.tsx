import React from "react";
import { FlatList } from "react-native";

import {
	Container,
	//Header,
	Title,
	Categorys,
	Icon,
	CategoryName,
	Separetor,
	Footer,
} from "./styles";
//import { categories } from "../../utils/categories";
import { Header } from "../../components/Header";

import { ContainerButton } from "../../components/Button/ContainerLogin";

export interface CategoriesProps {
	key: string;
	type: string;
	icon?: string;
}
interface Props {
	category: string | null;
	setCategory: (category: string) => void;
	closeSelectCategory: () => void;
	categories: CategoriesProps[] | null;
	titleAnimal: string;
}

export const CategorySelect = ({
	category,
	setCategory,
	closeSelectCategory,
	categories,
	titleAnimal,
}: Props) => {
	const initialCategory: { [key: string]: string } = {
		"Espécie do Animal": "Espécie",
		"Escolha a Raça": "Raça",
		"Escolha a cidade": "Cidade",
		"Escolha a ONG": "ONGs",
		"Escolha a vacina": "Vacinas"
	};

	return (
		<Container>
			<Header title={titleAnimal} />
			<FlatList
				data={categories}
				style={{ flex: 1, width: "100%" }}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Categorys
						onPress={() => {
							setCategory(item.type);
						}}
						isActive={category === item.type}
					>
						{item.icon && <Icon name={item.icon} />}
						<CategoryName>{item.type}</CategoryName>
					</Categorys>
				)}
				ItemSeparatorComponent={() => <Separetor />}
			/>

			<Footer>
				<ContainerButton onPress={closeSelectCategory} title="Selecionar" />
				<ContainerButton
					onPress={() => {
						setCategory(initialCategory[titleAnimal]);

						closeSelectCategory();
					}}
					title="Cancelar"
				/>
			</Footer>
		</Container>
	);
};
