import React, { useEffect } from "react";
import { Animated, View } from "react-native";

import { ImagineContainer, CardSkeleton } from "./styles";
import { CardPet } from "../PetCard/styles";

interface SkeletonCard {
	isLoading: boolean;
	children: React.ReactNode;
}

export function SkeletonCard() {
	const AnimetedView = new Animated.Value(0);
	const translateX = AnimetedView.interpolate({
		inputRange: [0, 1],
		outputRange: [-15, 350],
	});

	useEffect(() => {
		retangleAnimated();

		return () => retangleAnimated();
	});

	const retangleAnimated = () => {
		AnimetedView.setValue(0);
		Animated.timing(AnimetedView, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start(() => {
			setTimeout(() => {
				retangleAnimated();
			}, 2000);
		});
	};

	return (
		<CardSkeleton>
			<Animated.View
				style={{
					height: "100%",
					width: "100%",
					opacity: 0.5,
					backgroundColor: "red",
					transform: [{ translateX: translateX }],
				}}
			></Animated.View>
		</CardSkeleton>
	);
}
