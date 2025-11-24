// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
import * as S from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar dados iniciais 
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // Aqui você faria o fetch da API igual na Home
    // Por enquanto, vou simular dados para vermos a tela preenchida
    setName("Caio");
    setEmail("caiocesar.vec@gmail.com");
    setPhone("(11) 99999-9999");
    // setAvatarUri("https://github.com/caiocesardev.png"); // Exemplo
  };

  // Função para escolher foto
  const handlePickImage = async () => {
    // Pede permissão e abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Força corte quadrado
      quality: 0.5,   // Comprime um pouco para não pesar
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));

      /* AQUI ENTRARIA O PUT/PATCH PARA A API:
         const formData = new FormData();
         formData.append('name', name);
         if (avatarUri) {
            // logica para envio de arquivo...
         }
         await api.put('/users', formData)...
      */

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: signOut, style: "destructive" }
    ]);
  };

  return (
    <S.Container>
      <S.BackButton onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </S.BackButton>

      <S.HeaderBackground>
        <S.HeaderTitle>Meu Perfil</S.HeaderTitle>
      </S.HeaderBackground>

      <S.ContentContainer showsVerticalScrollIndicator={false}>

        <S.AvatarWrapper>
          {/* LÓGICA DO AVATAR: */}
          <S.AvatarImage
            source={
              avatarUri
                ? { uri: avatarUri } 
                : require('../../../../assets/images/avatar.png') // 2. Se não, usa o padrão local
            }
          />
          <S.EditIconContainer onPress={handlePickImage}>
            <MaterialCommunityIcons name="camera" size={20} color="white" />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        <S.FormCard>
          <S.SectionTitle>Dados da Conta</S.SectionTitle>

          <TextInput
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            rightIcon={<MaterialCommunityIcons name="pencil" size={18} color="#ccc" />}
          />

          <TextInput
            placeholder="E-mail"
            value={email}
            editable={false}
            selectTextOnFocus={false}
            style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }}
            rightIcon={<MaterialCommunityIcons name="lock" size={18} color="#ccc" />}
          />

          <TextInput
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            rightIcon={<MaterialCommunityIcons name="pencil" size={18} color="#ccc" />}
          />

          <View style={{ marginTop: 10 }}>
            <Button title="SALVAR ALTERAÇÕES" onPress={handleSave} isLoading={isLoading} />
          </View>
        </S.FormCard>

        <S.LogoutButton onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#E74C3C" />
          <S.LogoutText>Sair da Conta</S.LogoutText>
        </S.LogoutButton>

        <View style={{ height: 40 }} />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;