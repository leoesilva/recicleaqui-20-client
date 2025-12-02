import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput, useToast } from '../../../components';
import { validatePassword, validatePasswordMatch } from '../../../utils/validators';
import * as S from '../ForgotPasswordScreen/ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPasswordConfirm'>;

const ResetPasswordConfirmScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const { showToast } = useToast();
  const { email, code } = route.params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFinalReset = async () => {
    Keyboard.dismiss();
    setNewPasswordError('');
    setConfirmPasswordError('');

    const passwordValidation = validatePassword(newPassword, 2);
    const matchValidation = validatePasswordMatch(newPassword, confirmPassword);
    
    if (!passwordValidation.isValid) {
      setNewPasswordError(passwordValidation.error);
      return;
    }
    if (!matchValidation.isValid) {
      setConfirmPasswordError(matchValidation.error);
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password: newPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = data.message || 'Código inválido ou expirado.';
        setNewPasswordError(errorMsg);
        return;
      }

      showToast('success', 'Senha redefinida com sucesso!');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err: any) {
      const errorMsg = err.message || 'Erro de conexão.';
      setNewPasswordError(errorMsg);
      showToast('error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          {/* back icon handled by Touchable in styles */}
        </S.BackButton>
        <S.HeaderTitle>Nova Senha</S.HeaderTitle>
        <S.HeaderSubtitle>Digite e confirme sua nova senha segura.</S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer showsVerticalScrollIndicator={false}>
        <S.Card>
          <S.DescriptionText>Defina sua nova senha de acesso.</S.DescriptionText>

          <S.RulesText>ℹ️ Requisitos: Mínimo 8 caracteres, 1 letra maiúscula e 1 número.</S.RulesText>

          <TextInput
            placeholder="Nova Senha"
            secureTextEntry={!showPass}
            value={newPassword}
            onChangeText={(t: string) => { setNewPassword(t); setNewPasswordError(''); }}
            error={newPasswordError}
            rightIcon={
              <S.InputIcon
                name={showPass ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.textLight}
                onPress={() => setShowPass(!showPass)}
              />
            }
          />

          <TextInput
            placeholder="Confirmar Senha"
            secureTextEntry={!showConfirmPass}
            value={confirmPassword}
            onChangeText={(t: string) => { setConfirmPassword(t); setConfirmPasswordError(''); }}
            error={confirmPasswordError}
            rightIcon={
              <S.InputIcon
                name={showConfirmPass ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.textLight}
                onPress={() => setShowConfirmPass(!showConfirmPass)}
              />
            }
          />

          <S.ButtonContainer>
            <Button title="REDEFINIR SENHA" onPress={handleFinalReset} isLoading={isLoading} />
          </S.ButtonContainer>

        </S.Card>
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ResetPasswordConfirmScreen;
