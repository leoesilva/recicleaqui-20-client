// Arquivo: src/screens/App/HomeScreen/HomeScreen.styles.ts

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { PRIMARY_COLOR } from '../Auth/LoginScreen/LoginScreen.styles';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #f2f4f8;
`;

// ============= HEADER =============
export const Header = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-top: 12px;
  padding-bottom: 40px; 
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  elevation: 0; 
  shadow-opacity: 0;
  z-index: 0; 
  position: relative;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; 
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 56px; 
  height: 56px; 
  border-radius: 28px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: rgba(255,255,255,0.3);
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const WelcomeContainer = styled.View`
  flex: 1;
  margin-left: 16px; 
`;

export const HeaderTitle = styled.Text`
  font-size: 22px; 
  font-family: 'Montserrat-Bold';
  color: white;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px; /* Aumentado levemente */
  color: rgba(255,255,255,0.9);
  font-family: 'Montserrat-Regular';
  margin-top: 2px;
`;

export const HeaderIconButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 14px;
  margin-left: 10px;
`;

export const ActionsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
  gap: 15px;
  margin-top: 10px;
`;

export const BigActionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${PRIMARY_COLOR};
  padding: 22px; /* Botão mais alto */
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  elevation: 8;
`;

export const BigActionText = styled.Text`
  font-family: 'Montserrat-Bold';
  color: white;
  font-size: 18px; /* Texto maior */
  margin-left: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SmallActionButton = styled.TouchableOpacity`
  width: ${(width - 55) / 2}px;
  background-color: white;
  padding: 20px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
`;

export const SmallActionText = styled.Text`
  font-family: 'Montserrat-Bold';
  color: #555;
  font-size: 14px;
  margin-top: 10px;
`;

export const TipsSection = styled.View`
  margin-top: 30px;
  padding-left: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  color: #333;
  margin-bottom: 15px;
`;

export const BottomNav = styled.View`
  background-color: white;
  flex-direction: row;
  padding-top: 15px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  
  shadow-color: #000;
  shadow-offset: 0px -10px;
  shadow-opacity: 0.05;
  shadow-radius: 20px;
  elevation: 25;
`;

export const BottomNavButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface BottomNavLabelProps {
  active?: boolean;
}

export const BottomNavLabel = styled.Text<BottomNavLabelProps>`
  font-size: 11px;
  font-family: 'Montserrat-Bold';
  color: ${(props: BottomNavLabelProps) => props.active ? PRIMARY_COLOR : '#ccc'};
  margin-top: 6px;
`;