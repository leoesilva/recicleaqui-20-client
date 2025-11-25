// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.tsx

import React, { useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity, View, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; 
// CORREÇÃO 1: Importar Path do react-native-svg
import { Path } from 'react-native-svg';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// CORREÇÃO 2: Importar os tipos do arquivo separado (quebra o ciclo)
import { AuthStackParamList } from '../../../navigation/types';

import * as S from './LoginScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { signIn } = useAuth();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // --- VALIDAÇÃO PROFISSIONAL ---
  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    
    // 1. Validação de E-mail (Regex padrão de mercado)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Por favor, digite seu e-mail.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Formato de e-mail inválido.');
      isValid = false;
    }
    
    // 2. Validação de Senha (Apenas presença)
    // NÃO validamos tamanho mínimo no Login para não bloquear usuários antigos
    // se a política mudar. O backend que decida se está certo.
    if (!password) {
      setPasswordError('Por favor, digite sua senha.');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleLogin = useCallback(async () => {
    Keyboard.dismiss();

    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // Delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Pega URL do .env
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      
      // Tratamento caso a URL não esteja definida
      if (!apiUrl) {
        throw new Error('URL da API não configurada');
      }

      // Monta a URL (evitando barra dupla se tiver)
      const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      const fullUrl = `${baseUrl}/auth/login`;

      console.log('Tentando login em:', fullUrl);

      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        const errorMessage = result?.message || 'Erro desconhecido';
        
        if (res.status === 404) {
          setEmailError('E-mail não encontrado.');
        } else if (res.status === 401) {
          setPasswordError('Senha incorreta.');
        } else {
          // Erro genérico exibe na senha
          setPasswordError(errorMessage);
        }
        return;
      }

      const token = result?.token;
      const user = result?.user;
      
      if (token) {
        if (user && user.id) {
          await AsyncStorage.setItem('userId', String(user.id));
        }
        // Contexto assume a navegação
        await signIn(token);
      } else {
        setIsLoading(false);
        setPasswordError('Erro: Token inválido.');
      }

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setPasswordError('Sem conexão com o servidor.'); 
    }
  }, [email, password, signIn]);

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={S.PRIMARY_COLOR} />
      
      <S.HeaderContainer>
        <S.HeaderTextContainer>
          <S.Title>Recicle Aqui</S.Title>
          <S.Subtitle>Descarte de lixo eletrônico inteligente</S.Subtitle>
        </S.HeaderTextContainer>
        <S.StyledSvg
          height="80"
          width={S.width}
          viewBox={`0 0 ${S.width} 80`}
        >
          <Path
            fill="#fff"
            d={`M0,80 Q${S.width / 2},0 ${S.width},80 Z`}
          />
        </S.StyledSvg>
      </S.HeaderContainer>

      <S.FormContainer>
        <S.LogoImage source={require('../../../../assets/images/logo-recicle-aqui.png')} />
        
        <View style={{ marginTop: 80, width: '100%' }}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setEmailError(''); }}
            error={emailError}
          >
            <S.InputIcon name="email-outline" size={22} color={emailError ? '#ff4444' : '#888'} />
          </TextInput>

          <TextInput
            placeholder="Senha"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
            error={passwordError}
          >
            <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
              <S.InputIcon 
                name={isPasswordVisible ? 'eye-off' : 'eye'} 
                size={24} 
                color={passwordError ? '#ff4444' : '#888'} 
              />
            </TouchableOpacity>
          </TextInput>
          
          <S.OptionsContainer>
            <S.CheckboxContainer onPress={() => setRememberMe(prev => !prev)}>
              <Icon 
                name={rememberMe ? 'toggle-switch' : 'toggle-switch-off-outline'} 
                size={30} 
                color={S.PRIMARY_COLOR} 
              />
              <S.CheckboxLabel>Manter-me conectado</S.CheckboxLabel>
            </S.CheckboxContainer>
            
            <S.ForgotPasswordButton onPress={() => navigation.navigate('ForgotPassword')}>
              <S.ForgotPasswordText>Esqueci a senha</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.OptionsContainer>

          <Button title="ENTRAR" onPress={handleLogin} isLoading={isLoading} />
        </View>
        
        <S.RegisterContainer>
          <S.RegisterText>Não tem uma conta?</S.RegisterText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <S.RegisterLink>Cadastre-se</S.RegisterLink>
          </TouchableOpacity>
        </S.RegisterContainer>
        
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default LoginScreen;