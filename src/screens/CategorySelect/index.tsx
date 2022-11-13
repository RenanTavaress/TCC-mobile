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
import { categories } from "../../utils/categories";
import {Header} from '../../components/Header'

import { ContainerButton } from "../../components/Button/ContainerLogin";

interface Props {
	category: string;
	setCategory: (category: string) => void;
	closeSelectCategory: () => void;
}

export const CategorySelect = ({
	category,
	setCategory,
	closeSelectCategory,
}: Props) => {
	return (
		<>
			<Header title="Categoria do Animal" icon="left"/>
				{/* <Title>Categoria do Animal</Title>
			</Header> */}

			<FlatList
				data={categories}
				style={{ flex: 1, width: "100%" }}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Categorys
						onPress={() => setCategory(item.name)}
						isActive={category === item.name}
					>
						<Icon name={item.icon} />
						<CategoryName>{item.name}</CategoryName>
					</Categorys>
				)}
				ItemSeparatorComponent={() => <Separetor />}
			/>

			<Footer>
				<ContainerButton onPress={closeSelectCategory} title="Selecionar" />
			</Footer>
		</>
	);
};
