import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input, InputProps } from "../Input";
import { Container, Error } from "./styles";

type Props = InputProps & {
	control?: Control<any>;
	name: string;
	error?: FieldError;

};

export const InputForm = ({ control, name, error,  ...rest }: Props) => {
	return (
		<Container>
			{error && <Error>{error?.message}</Error>}
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input {...rest} onChangeText={onChange} value={value} />
				)}
				name={name}
			/>
		</Container>
	);
};
