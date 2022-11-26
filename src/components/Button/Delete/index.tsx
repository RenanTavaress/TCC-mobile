import React from 'react';
import { ButtonDelete } from './styles';
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {

}


export function DeleteButton({...rest}: Props){
   return <ButtonDelete title='Deletar' {...rest} />
}