import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import { PreferencePetProps } from "../../../components/PreferenceCard";


export const Container = styled.View`
   padding: ${RFValue(10)}px ${RFValue(15)}px;

`

export const ListPreferences = styled(
	FlatList as new (
		props: FlatListProps<PreferencePetProps>
	) => FlatList<PreferencePetProps>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	height: ${RFPercentage(50)}px;
`;