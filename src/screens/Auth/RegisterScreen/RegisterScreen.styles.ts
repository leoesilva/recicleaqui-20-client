// Arquivo: src/screens/Auth/RegisterScreen/RegisterScreen.styles.ts

import styled from 'styled-components/native';
// Importamos a cor primária para manter o padrão
import { PRIMARY_COLOR } from '../LoginScreen/LoginScreen.styles';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${PRIMARY_COLOR};
  font-family: 'Montserrat-Bold';
`;

// --- CORREÇÃO AQUI: Exportando FormContainer explicitamente ---
export const FormContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const StepTitle = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: #333;
  margin-bottom: 20px;
`;

// --- ESTILOS DA BARRA DE PROGRESSO (STEPS) ---
export const StepsContainer = styled.View`
  margin-bottom: 25px;
`;

export const ProgressBackground = styled.View`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.View`
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  border-radius: 3px;
`;

export const StepLabel = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  text-align: right;
  font-family: 'Montserrat-Regular';
`;

// --- ESTILOS DA FORÇA DE SENHA ---
export const StrengthContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const StrengthBarContainer = styled.View`
  flex-direction: row;
  height: 4px;
  width: 100%;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
`;

interface StrengthBarProps {
  width: string;
  color: string;
}

export const StrengthBarFill = styled.View<StrengthBarProps>`
  height: 100%;
  width: ${(props: StrengthBarProps) => props.width};
  background-color: ${(props: StrengthBarProps) => props.color};
`;

interface StrengthLabelProps {
  color: string;
}

export const StrengthLabel = styled.Text<StrengthLabelProps>`
  font-size: 11px;
  color: ${(props: StrengthLabelProps) => props.color};
  margin-top: 4px;
  font-family: 'Montserrat-Bold';
  text-align: right;
`;

export const HelperText = styled.Text`
  font-size: 12px;
  color: #777;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  font-family: 'Montserrat-Regular';
`;