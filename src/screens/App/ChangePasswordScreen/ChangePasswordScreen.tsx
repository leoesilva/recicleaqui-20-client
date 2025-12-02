// Arquivo: src/screens/App/ChangePasswordScreen/ChangePasswordScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import { Button, TextInput, useToast } from '../../../components';
import { validatePassword, validatePasswordMatch, calculatePasswordStrength, getPasswordStrengthLabel } from '../../../utils/validators';
import * as S from './ChangePasswordScreen.styles';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Field-level errors
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return theme.colors.error;
    if (passwordStrength === 2) return '#ffbb33';
    if (passwordStrength === 3) return '#00C851';
    return '#007E33';
  };

  const handleChangePassword = async () => {
    // Clear previous errors
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    
    // Validations
    if (!currentPassword) {
      setCurrentPasswordError('Informe a senha atual.');
      return;
    }
    
    const passwordValidation = validatePassword(newPassword, 2);
    if (!passwordValidation.isValid) {
      setNewPasswordError(passwordValidation.error);
      return;
    }
    
    const matchValidation = validatePasswordMatch(newPassword, confirmNewPassword);
    if (!matchValidation.isValid) {
      setConfirmPasswordError(matchValidation.error);
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        showToast('error', 'Sessão expirada. Faça login novamente.');
        setIsLoading(false);
        return;
      }

      const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
      const apiUrl = (rawBase.replace(/\/$/, '') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1');

      const response = await fetch(`${apiUrl}/clients/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data: { message?: string } = await response.json().catch(() => ({} as any));

      if (!response.ok) {
        // Map error to appropriate field
        if (response.status === 400 || response.status === 401) {
          const errorMsg = data.message || 'Verifique a senha atual e tente novamente.';
          setCurrentPasswordError(errorMsg);
        } else if (response.status === 429) {
          showToast('error', 'Muitas tentativas. Tente novamente em alguns minutos.');
        } else {
          showToast('error', data.message || 'Não foi possível alterar a senha.');
        }
        setIsLoading(false);
        return;
      }
      
      // Success
      showToast('success', 'Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      showToast('error', error?.message || 'Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.navigate('Settings' as never)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.white} />
        </S.BackButton>
        <S.Title>Alterar Senha</S.Title>
      </S.Header>

      <S.Content>
        <S.Description>
            Para sua segurança, escolha uma senha forte e não a compartilhe com ninguém.
        </S.Description>

        <S.FormCard>
          <TextInput 
            placeholder="Senha Atual" 
            value={currentPassword} 
            onChangeText={(t) => { setCurrentPassword(t); setCurrentPasswordError(''); }} 
            secureTextEntry={!showCurrentPass}
            error={currentPasswordError}
            rightIcon={<MaterialCommunityIcons name={showCurrentPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowCurrentPass(!showCurrentPass)}
          />

          <S.HelperText>Mínimo 8 caracteres, 1 maiúscula e 1 número.</S.HelperText>
          
          <TextInput 
            placeholder="Nova Senha" 
            value={newPassword} 
            onChangeText={(t) => { setNewPassword(t); setNewPasswordError(''); }} 
            secureTextEntry={!showNewPass}
            error={newPasswordError}
            rightIcon={<MaterialCommunityIcons name={showNewPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowNewPass(!showNewPass)}
          />

          {newPassword.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill width={`${(passwordStrength / 4) * 100}%`} color={getStrengthColor()} />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>{getPasswordStrengthLabel(passwordStrength)}</S.StrengthLabel>
              </S.StrengthContainer>
          )}

          <TextInput 
            placeholder="Confirmar Nova" 
            value={confirmNewPassword} 
            onChangeText={(t) => { setConfirmNewPassword(t); setConfirmPasswordError(''); }} 
            secureTextEntry={!showConfirmPass}
            error={confirmPasswordError}
            rightIcon={<MaterialCommunityIcons name={showConfirmPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowConfirmPass(!showConfirmPass)}
          />

          <View style={{ marginTop: 20 }}>
            <Button title="ATUALIZAR SENHA" onPress={handleChangePassword} isLoading={isLoading} />
          </View>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
};

export default ChangePasswordScreen;