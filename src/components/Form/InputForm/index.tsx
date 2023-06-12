import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input, InputProps } from "../Input";
import { Container, Error, TextInputWithMask } from "./styles";
import { TextInputMask } from "react-native-masked-text";

type Props = InputProps & {
	control?: Control<any>;
	name: string;
	error?: FieldError;
	useMask?: boolean;
};

export const InputForm = ({
	control,
	name,
	error,
	useMask = false,
	...rest
}: Props) => {
	return (
		<Container>
			{error && <Error>{error?.message}</Error>}
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<>
						{useMask ? (
							<TextInputWithMask
								{...rest}
								onChangeText={onChange}
								value={value}
								type="datetime"
								options={{
									format: "DD/MM/YYYY",
								}}
								placeholderTextColor="black"
							/>
						) : (
							<Input {...rest} onChangeText={onChange} value={value} />
						)}
					</>
				)}
				name={name}
			/>
		</Container>
	);
};
