// Arquivo: src/components/InfoCard/index.tsx

import React from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '../../screens/Auth/LoginScreen/LoginScreen.styles';

// --- Estilos Locais do Componente ---
const Container = styled.TouchableOpacity`
  width: 140px;
  height: 160px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin-right: 15px;
  justify-content: space-between;
  
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 3;
`;

const Title = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 14px;
  color: ${PRIMARY_COLOR};
  margin-top: 10px;
`;

const Description = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 11px;
  color: #888;
`;

// --- Interface ---
interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap; 
  iconColor: string;
  title: string;
  description: string;
  onPress?: () => void;
}

// --- Componente ---
export const InfoCard = ({ icon, iconColor, title, description, onPress }: Props) => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <MaterialCommunityIcons name={icon} size={32} color={iconColor} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};