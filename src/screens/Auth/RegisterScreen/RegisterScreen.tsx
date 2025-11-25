// Arquivo: src/screens/Auth/RegisterScreen/RegisterScreen.tsx

import React, { useState, useEffect } from 'react';
import { StatusBar, View, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as S from './RegisterScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from '../../../components';
import { PRIMARY_COLOR } from '../LoginScreen/LoginScreen.styles';

type Props = NativeStackScreenProps<any, 'Register'>;

// --- HELPERS DE MÁSCARA ---
const onlyDigits = (s: string) => s.replace(/\D/g, '');
const formatCPF = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return d;
};
const formatCNPJ = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/, "$1.$2");
  d = d.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  d = d.replace(/\.(\d{3})(\d)/, ".$1/$2");
  d = d.replace(/(\d{4})(\d)/, "$1-$2");
  return d;
};
const formatPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/g, "($1) $2");
  d = d.replace(/(\d)(\d{4})$/, "$1-$2");
  return d;
};
const formatCEP = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{5})(\d)/, "$1-$2");
  return d;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Step 2
  const [clientType, setClientType] = useState<'individual' | 'company'>('individual');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [cnpjError, setCnpjError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Step 3
  const [postalCode, setPostalCode] = useState('');
  const [addressName, setAddressName] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  
  const [postalCodeError, setPostalCodeError] = useState('');
  const [addressNameError, setAddressNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkPasswordStrength = (pass: string) => {
    if (!pass) return 0;

    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass); 

    if (!hasLength || !hasUpper || !hasNumber) {
      return 1; // Vermelho
    }

    // Se passou da Regra 1, ela já é "Aceitável" (Nível 2)
    let score = 2; 

    // BÔNUS: Tem caractere especial?
    if (hasSpecial) score += 1; // Nível 3 (Forte)

    // BÔNUS: É bem longa? (> 10 chars)
    if (pass.length > 10 && hasSpecial) score += 1; // Nível 4 (Muito Forte)

    return score;
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const handleClientTypeChange = (type: 'individual' | 'company') => {
    setClientType(type);
    if (type === 'individual') {
      setCompanyName(''); setTradeName(''); setCnpj('');
      setCompanyNameError(''); setCnpjError('');
    } else {
      setFirstName(''); setLastName(''); setCpf('');
      setFirstNameError(''); setLastNameError(''); setCpfError('');
    }
  };

  // --- VALIDAÇÕES ---
  const validateStep1 = () => {
    let isValid = true;
    if (!email.includes('@') || email.length < 5) { 
      setEmailError('Email inválido'); isValid = false; 
    } else setEmailError('');
    
    // Validação baseada na força calculada
    if (passwordStrength < 2) { 
      setPasswordError('Mínimo 8 caracteres, 1 letra maiúscula e 1 número.'); 
      isValid = false; 
    } else { 
      setPasswordError(''); 
    }
    
    if (password !== confirmPassword) { 
      setConfirmPasswordError('Senhas não conferem'); isValid = false; 
    } else setConfirmPasswordError('');
    
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    if (clientType === 'individual') {
      if (!firstName) { setFirstNameError('Informe o nome'); isValid = false; } else setFirstNameError('');
      if (!lastName) { setLastNameError('Informe o sobrenome'); isValid = false; } else setLastNameError('');
      if (onlyDigits(cpf).length < 11) { setCpfError('CPF inválido'); isValid = false; } else setCpfError('');
    } else {
      if (!companyName) { setCompanyNameError('Razão Social obrigatória'); isValid = false; } else setCompanyNameError('');
      if (onlyDigits(cnpj).length < 14) { setCnpjError('CNPJ inválido'); isValid = false; } else setCnpjError('');
    }
    if (onlyDigits(phone).length < 10) { setPhoneError('Telefone inválido'); isValid = false; } else setPhoneError('');
    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;
    if (onlyDigits(postalCode).length !== 8) { setPostalCodeError('CEP inválido'); isValid = false; } else setPostalCodeError('');
    if (!addressName) { setAddressNameError('Endereço obrigatório'); isValid = false; } else setAddressNameError('');
    if (!number) { setNumberError('Nº obrigatório'); isValid = false; } else setNumberError('');
    if (!city) { setCityError('Cidade obrigatória'); isValid = false; } else setCityError('');
    if (!state) { setStateError('UF obrigatório'); isValid = false; } else setStateError('');
    return isValid;
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#ff4444'; // Vermelho (Incompleta)
    if (passwordStrength === 2) return '#ffbb33'; // Amarelo (Aceitável)
    if (passwordStrength === 3) return '#00C851'; // Verde (Forte)
    return '#007E33'; // Verde Escuro (Muito Forte)
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Fraca (Requisitos não atendidos)';
    if (passwordStrength === 2) return 'Média (Aceitável)';
    if (passwordStrength === 3) return 'Forte';
    return 'Muito Forte';
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const handleCepChange = async (text: string) => {
    const formatted = formatCEP(text);
    setPostalCode(formatted);
    const cleanCep = onlyDigits(text);
    if (cleanCep.length === 8) {
      setIsCepLoading(true);
      Keyboard.dismiss();
      try {
        const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAddressName(data.street || '');
        setNeighborhood(data.neighborhood || '');
        setCity(data.city || '');
        setState(data.state || '');
        setPostalCodeError('');
      } catch {
        setPostalCodeError('CEP não encontrado');
      } finally {
        setIsCepLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsLoading(true);

    try {
      const payload: any = {
        email,
        password,
        phone: onlyDigits(phone),
        address: {
          addressType: 'Rua',
          addressName,
          number,
          additionalInfo: complement,
          neighborhood,
          postalCode: onlyDigits(postalCode),
          city,
          state,
        },
      };

      let endpoint = '';
      if (clientType === 'individual') {
        endpoint = '/clients/individual';
        payload.firstName = firstName;
        payload.lastName = lastName;
        payload.cpf = onlyDigits(cpf);
      } else {
        endpoint = '/clients/company';
        payload.companyName = companyName;
        payload.tradeName = tradeName;
        payload.cnpj = onlyDigits(cnpj);
      }
      
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';
      const fullUrl = apiUrl.includes('/api/v1') ? `${apiUrl}${endpoint}` : `${apiUrl}/api/v1${endpoint}`;

      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        Alert.alert('Erro', data?.message || `Erro ${res.status}`);
        return;
      }

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'Ir para Login', onPress: () => navigation.navigate('Login') }
      ]);

    } catch (err) {
      Alert.alert('Erro', 'Falha de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.SafeContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S.Header>
        <S.BackButton onPress={handleBack}>
          <Icon name="arrow-left" size={30} color="#333" />
        </S.BackButton>
        <S.HeaderTitle>Criar Conta</S.HeaderTitle>
      </S.Header>

      <S.FormContainer>
        
        <S.StepsContainer>
          <S.ProgressBackground>
            <S.ProgressFill style={{ width: `${(step / 3) * 100}%` }} />
          </S.ProgressBackground>
          <S.StepLabel>Passo {step} de 3</S.StepLabel>
        </S.StepsContainer>

        {step === 1 && (
          <View>
            <S.StepTitle>Suas Credenciais</S.StepTitle>
            
            <TextInput 
              placeholder="Seu melhor e-mail" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email} 
              onChangeText={(t) => { setEmail(t); setEmailError(''); }} 
              error={emailError} 
            />
            
            <TextInput 
              placeholder="Crie uma senha forte" 
              secureTextEntry={!showPassword} 
              value={password} 
              onChangeText={(t) => { setPassword(t); setPasswordError(''); }} 
              error={passwordError} 
              rightIcon={<Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#ccc" />}
              onRightPress={() => setShowPassword(!showPassword)}
            />

            <S.HelperText>
              A senha deve no mínimo conter de 8 caracteres, contendo letra maiúscula e número.
            </S.HelperText>

            {password.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill 
                    width={`${(passwordStrength / 4) * 100}%`} 
                    color={getStrengthColor()} 
                  />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>
                  {getStrengthLabel()}
                </S.StrengthLabel>
              </S.StrengthContainer>
            )}
            
            <TextInput 
              placeholder="Confirme sua senha" 
              secureTextEntry={!showPassword} 
              value={confirmPassword} 
              onChangeText={(t) => { setConfirmPassword(t); setConfirmPasswordError(''); }} 
              error={confirmPasswordError} 
            />

            <View style={{ marginTop: 20 }}>
              <Button title="Próximo" onPress={handleNext} />
            </View>
          </View>
        )}
        
        {step === 2 && (
          <View>
            <S.StepTitle>Dados Pessoais</S.StepTitle>
            <View style={{ flexDirection: 'row', marginBottom: 20, gap: 10 }}>
              <View style={{ flex: 1 }}>
                 <Button 
                   title={clientType === 'individual' ? '✔ Pessoal' : 'Pessoal'} 
                   onPress={() => handleClientTypeChange('individual')}
                   disabled={clientType === 'individual'} 
                 />
              </View>
              <View style={{ flex: 1 }}>
                 <Button 
                   title={clientType === 'company' ? '✔ Empresa' : 'Empresa'} 
                   onPress={() => handleClientTypeChange('company')}
                   disabled={clientType === 'company'}
                 />
              </View>
            </View>
            
            {clientType === 'individual' ? (
              <>
                <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} error={firstNameError} />
                <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} error={lastNameError} />
                <TextInput placeholder="CPF" keyboardType="number-pad" value={cpf} onChangeText={(t) => { const m = formatCPF(t); setCpf(m); if(onlyDigits(m).length===11) setCpfError(''); }} maxLength={14} error={cpfError} />
              </>
            ) : (
              <>
                <TextInput placeholder="Razão Social" value={companyName} onChangeText={setCompanyName} error={companyNameError} />
                <TextInput placeholder="Nome Fantasia" value={tradeName} onChangeText={setTradeName} />
                <TextInput placeholder="CNPJ" keyboardType="number-pad" value={cnpj} onChangeText={(t) => setCnpj(formatCNPJ(t))} maxLength={18} error={cnpjError} />
              </>
            )}
            
            <TextInput placeholder="Telefone / Celular" keyboardType="phone-pad" value={phone} onChangeText={(t) => setPhone(formatPhone(t))} maxLength={15} error={phoneError} />

            <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
              <View style={{ flex: 1 }}><Button title="Voltar" onPress={handleBack} style={{ backgroundColor: '#999' }} /></View>
              <View style={{ flex: 1 }}><Button title="Próximo" onPress={handleNext} /></View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <S.StepTitle>Endereço</S.StepTitle>
            <TextInput 
              placeholder="CEP" 
              keyboardType="number-pad" 
              value={postalCode} 
              onChangeText={handleCepChange} 
              maxLength={9} 
              error={postalCodeError} 
              rightIcon={isCepLoading ? <ActivityIndicator color="#348e57" /> : null} 
            />
            <TextInput placeholder="Logradouro" value={addressName} onChangeText={setAddressName} error={addressNameError} />
            
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <TextInput 
                      placeholder="Nº" 
                      value={number} 
                      onChangeText={(t) => { setNumber(t); setNumberError(''); }} 
                      error={numberError} 
                      keyboardType="number-pad" 
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <TextInput 
                      placeholder="Complemento" 
                      value={complement} 
                      onChangeText={setComplement} 
                    />
                </View>
            </View>
            
            <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
            
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 2 }}><TextInput placeholder="Cidade" value={city} onChangeText={setCity} error={cityError} /></View>
                <View style={{ flex: 1 }}>
                   <TextInput 
                      placeholder="UF" 
                      value={state} 
                      onChangeText={setState} 
                      maxLength={2} 
                      autoCapitalize="characters" 
                      error={stateError} 
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
              <View style={{ flex: 1 }}><Button title="Voltar" onPress={handleBack} style={{ backgroundColor: '#999' }} /></View>
              <View style={{ flex: 1 }}><Button title={isLoading ? 'Criando...' : 'Finalizar'} onPress={handleSubmit} isLoading={isLoading} /></View>
            </View>
          </View>
        )}

      </S.FormContainer>
    </S.SafeContainer>
  );
};

export default RegisterScreen;