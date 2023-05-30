import React, { useState } from "react";
import { List } from "react-native-paper";
import { useTheme } from "styled-components";

interface ListItem {
	selectedItem: string;
	setSelectedItem: (params: string) => void;
}

export function ListItem({ selectedItem, setSelectedItem }: ListItem) {
	const [expanded, setExpanded] = useState(false);
	const { colors, fonts } = useTheme();

	function handleSelectItem(value: string) {
		setSelectedItem(value);
		setExpanded(!expanded);
	}

	return (
		<>
			<List.Section>
				<List.Accordion
					title={selectedItem}
					expanded={expanded}
					onPress={() => setExpanded(!expanded)}
					titleStyle={{ fontFamily: fonts.medium, color: colors.primary }}
				>
					<List.Item
						title="Ano(s)"
						onPress={() => handleSelectItem("Ano(s)")}
						style={{
							backgroundColor:
								selectedItem === "Ano(s)" ? colors.primary_light : "white",
						}}
						titleStyle={{
							fontFamily: fonts.medium,
							color: selectedItem === "Ano(s)" ? colors.shape : colors.text_dark,
						}}
					/>
					<List.Item
						title="Mês(es)"
						onPress={() => handleSelectItem("Mês(es)")}
						style={{
							backgroundColor:
								selectedItem === "Mês(es)" ? colors.primary_light : "white",
							borderTopWidth: 1,
						}}
						titleStyle={{
							fontFamily: fonts.medium,
							color: selectedItem === "Mês(es)" ? colors.shape : colors.text_dark,
						}}
					/>
				</List.Accordion>
			</List.Section>
		</>
	);
}
