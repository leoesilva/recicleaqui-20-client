// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React from 'react';
import { TouchableOpacity, ScrollView, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useAuth } from '../../../context/AuthContext';
import * as S from './HomeScreen.styles';

import { GamificationCard } from '../../components/GamificationCard';
import { InfoCard } from '../../components/InfoCard';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  
  const userData = {
    name: "Caio",
    level: 7,
    xpCurrent: 700,
    xpNext: 1000,
    avatarUrl: "https://i.pravatar.cc/150?img=12" 
  };

  const handleNavigate = (screen: string) => console.log(`Navegar para ${screen}`);

  return (
    <S.Container>
      <S.Header style={{ paddingTop: insets.top + 10 }}>
        <S.HeaderTop>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <S.AvatarContainer onPress={() => handleNavigate('Profile')}>
               {userData.avatarUrl ? (
                 <S.AvatarImage source={{ uri: userData.avatarUrl }} />
               ) : (
                 <MaterialCommunityIcons name="account" size={32} color="#348e57" />
               )}
            </S.AvatarContainer>
            
            <S.WelcomeContainer>
              <S.HeaderTitle>Olá, {userData.name}!</S.HeaderTitle>
              <S.HeaderSubtitle>
                Vamos reciclar hoje?
              </S.HeaderSubtitle>
            </S.WelcomeContainer>
          </View>
          <S.HeaderIconButton onPress={() => console.log('Notificações')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
          </S.HeaderIconButton>

        </S.HeaderTop>
      </S.Header>

      <ScrollView 
        style={{ flex: 1, zIndex: 10 }} 
        contentContainerStyle={{ paddingBottom: 5 }} 
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        
        <GamificationCard 
          level={userData.level} 
          currentXp={userData.xpCurrent} 
          nextXp={userData.xpNext} 
        />

        <S.ActionsGrid>
          <S.BigActionButton onPress={() => handleNavigate('Registrar')}>
             <MaterialCommunityIcons name="plus-circle-outline" size={36} color="white" />
             <S.BigActionText>REGISTRAR DESCARTE</S.BigActionText>
          </S.BigActionButton>

          <S.SmallActionButton onPress={() => handleNavigate('Mapa')}>
             <MaterialCommunityIcons name="map-search-outline" size={32} color="#348e57" />
             <S.SmallActionText>Mapa Completo</S.SmallActionText>
          </S.SmallActionButton>

          <S.SmallActionButton onPress={() => handleNavigate('Denuncia')}>
             <MaterialCommunityIcons name="alert-octagon-outline" size={32} color="#E74C3C" />
             <S.SmallActionText>Denunciar</S.SmallActionText>
          </S.SmallActionButton>
        </S.ActionsGrid>


        <S.TipsSection>
          <S.SectionTitle>Dicas Rápidas</S.SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingBottom: 20 }}>
            <InfoCard icon="battery-alert" iconColor="#FF8A65" title="Baterias" description="Nunca jogue no lixo comum. Risco de fogo." />
            <InfoCard icon="monitor" iconColor="#4DB6AC" title="Monitores" description="Contêm metais pesados. Doe ou recicle." />
            <InfoCard icon="cellphone" iconColor="#9575CD" title="Celulares" description="Apague seus dados antes de descartar." />
             <View style={{ width: 20 }} />
          </ScrollView>
        </S.TipsSection>

      </ScrollView>

      {/* === BOTTOM NAV === */}
      <S.BottomNav style={{ paddingBottom: insets.bottom + 10 }}>
        <S.BottomNavButton onPress={() => console.log('Home')}>
          <MaterialCommunityIcons name="home" size={28} color="#348e57" />
          <S.BottomNavLabel active>Home</S.BottomNavLabel>
        </S.BottomNavButton>

        <S.BottomNavButton onPress={() => console.log('Pontos')}>
          <MaterialCommunityIcons name="map-marker-radius" size={28} color="#ccc" />
          <S.BottomNavLabel>Pontos</S.BottomNavLabel>
        </S.BottomNavButton>

        <S.BottomNavButton onPress={() => console.log('Perfil')}>
          <MaterialCommunityIcons name="account-circle" size={28} color="#ccc" />
          <S.BottomNavLabel>Perfil</S.BottomNavLabel>
        </S.BottomNavButton>
      </S.BottomNav>

    </S.Container>
  );
};

export default HomeScreen;