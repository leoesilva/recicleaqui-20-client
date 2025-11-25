// Arquivo: src/components/Button/Button.tsx

import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../../constants/colors';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: ButtonVariant; 
}

interface ContainerProps extends TouchableOpacityProps {
  buttonVariant: ButtonVariant;
}

const ButtonContainer = styled.TouchableOpacity<ContainerProps>`
  background-color: ${(props: ContainerProps) => {
    if (props.disabled) return COLORS.secondary;
    if (props.buttonVariant === 'secondary') return COLORS.secondary;
    return COLORS.primary;
  }};
  
  padding: 15px 30px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;
  elevation: 3;
  
  shadow-color: #000;
  shadow-offset: 0px 2px; 
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  opacity: ${(props: ContainerProps) => (props.disabled ? 0.9 : 1)};
`;

const ButtonText = styled.Text`
  color: ${COLORS.white}; /* Usando a constante global */
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Montserrat-Bold';
`;

const Button = ({ title, isLoading = false, variant = 'primary', ...rest }: ButtonProps) => {
  const isDisabled = rest.disabled || isLoading;

  return (
    <ButtonContainer 
      activeOpacity={0.8} 
      buttonVariant={variant} 
      {...rest} 
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;