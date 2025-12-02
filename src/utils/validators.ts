// Arquivo: src/utils/validators.ts
// Validadores centralizados e mensagens de erro padronizadas

// ========== HELPERS DE FORMATAÇÃO ==========
export const onlyDigits = (s: string): string => s.replace(/\D/g, '');

export const formatCPF = (v: string): string => {
  let d = v.replace(/\D/g, '');
  d = d.replace(/(\d{3})(\d)/, '$1.$2');
  d = d.replace(/(\d{3})(\d)/, '$1.$2');
  d = d.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return d;
};

export const formatCNPJ = (v: string): string => {
  let d = v.replace(/\D/g, '');
  d = d.replace(/^(\d{2})(\d)/, '$1.$2');
  d = d.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  d = d.replace(/\.(\d{3})(\d)/, '.$1/$2');
  d = d.replace(/(\d{4})(\d)/, '$1-$2');
  return d;
};

export const formatPhone = (v: string): string => {
  let d = v.replace(/\D/g, '');
  d = d.replace(/^(\d{2})(\d)/g, '($1) $2');
  d = d.replace(/(\d)(\d{4})$/, '$1-$2');
  return d;
};

export const formatCEP = (v: string): string => {
  let d = v.replace(/\D/g, '');
  d = d.replace(/^(\d{5})(\d)/, '$1-$2');
  return d;
};

// ========== VALIDADORES ==========

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

// Email
export const validateEmail = (email: string): ValidationResult => {
  if (!email) return { isValid: false, error: 'Por favor, digite seu e-mail.' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, error: 'Formato de e-mail inválido.' };
  return { isValid: true, error: '' };
};

// Senha
export const validatePassword = (password: string, minStrength: number = 2): ValidationResult => {
  if (!password) return { isValid: false, error: 'Por favor, digite sua senha.' };
  if (password.length < 8) return { isValid: false, error: 'Mínimo 8 caracteres.' };
  
  const strength = calculatePasswordStrength(password);
  if (strength < minStrength) {
    return { isValid: false, error: 'Adicione maiúsculas e números.' };
  }
  return { isValid: true, error: '' };
};

export const calculatePasswordStrength = (pass: string): number => {
  if (!pass) return 0;
  const hasLength = pass.length >= 8;
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);

  if (!hasLength || !hasUpper || !hasNumber) return 1;
  let score = 2;
  if (hasSpecial) score += 1;
  if (pass.length > 10 && hasSpecial) score += 1;
  return score;
};

export const getPasswordStrengthLabel = (strength: number): string => {
  if (strength === 0) return '';
  if (strength <= 1) return 'Fraca';
  if (strength === 2) return 'Média';
  if (strength === 3) return 'Forte';
  return 'Muito Forte';
};

// Confirmação de senha
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) return { isValid: false, error: 'Confirme sua senha.' };
  if (password !== confirmPassword) return { isValid: false, error: 'Senhas não conferem.' };
  return { isValid: true, error: '' };
};

// CPF
export const validateCPF = (cpf: string): ValidationResult => {
  const digits = onlyDigits(cpf);
  if (!digits) return { isValid: false, error: 'Informe o CPF.' };
  if (digits.length !== 11) return { isValid: false, error: 'CPF inválido (11 dígitos).' };
  return { isValid: true, error: '' };
};

// CNPJ
export const validateCNPJ = (cnpj: string): ValidationResult => {
  const digits = onlyDigits(cnpj);
  if (!digits) return { isValid: false, error: 'Informe o CNPJ.' };
  if (digits.length !== 14) return { isValid: false, error: 'CNPJ inválido (14 dígitos).' };
  return { isValid: true, error: '' };
};

// Telefone
export const validatePhone = (phone: string): ValidationResult => {
  const digits = onlyDigits(phone);
  if (!digits) return { isValid: false, error: 'Informe o telefone.' };
  if (digits.length < 10) return { isValid: false, error: 'Telefone inválido (DDD + número).' };
  return { isValid: true, error: '' };
};

// CEP
export const validateCEP = (cep: string): ValidationResult => {
  const digits = onlyDigits(cep);
  if (!digits) return { isValid: false, error: 'Informe o CEP.' };
  if (digits.length !== 8) return { isValid: false, error: 'CEP inválido (8 dígitos).' };
  return { isValid: true, error: '' };
};

// UF
const VALID_UF = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export const validateUF = (state: string): ValidationResult => {
  const uf = state.trim().toUpperCase();
  if (!uf) return { isValid: false, error: 'Informe a UF.' };
  if (!/^[A-Z]{2}$/.test(uf) || !VALID_UF.includes(uf)) {
    return { isValid: false, error: 'Informe uma UF válida (ex: SP, RJ).' };
  }
  return { isValid: true, error: '' };
};

// Nome
export const validateName = (name: string, fieldName: string = 'nome', minLength: number = 2): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) return { isValid: false, error: `Informe o ${fieldName}.` };
  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} muito curto (mín. ${minLength} caracteres).` };
  }
  return { isValid: true, error: '' };
};

// Cidade (apenas letras e espaços)
export const validateCity = (city: string): ValidationResult => {
  const trimmed = city.trim();
  if (!trimmed) return { isValid: false, error: 'Informe a cidade.' };
  if (trimmed.length < 2) return { isValid: false, error: 'Cidade inválida (mín. 2 caracteres).' };
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(trimmed)) {
    return { isValid: false, error: 'Cidade deve conter apenas letras.' };
  }
  return { isValid: true, error: '' };
};

// Endereço (logradouro)
export const validateAddress = (address: string, minLength: number = 3): ValidationResult => {
  const trimmed = address.trim();
  if (!trimmed) return { isValid: false, error: 'Informe o logradouro.' };
  if (trimmed.length < minLength) {
    return { isValid: false, error: `Logradouro muito curto (mín. ${minLength} caracteres).` };
  }
  return { isValid: true, error: '' };
};

// Número do endereço
export const validateAddressNumber = (number: string): ValidationResult => {
  const digits = onlyDigits(number);
  if (!digits) return { isValid: false, error: 'Informe o número do endereço.' };
  return { isValid: true, error: '' };
};

// Bairro
export const validateNeighborhood = (neighborhood: string): ValidationResult => {
  const trimmed = neighborhood.trim();
  if (!trimmed) return { isValid: false, error: 'Informe o bairro.' };
  if (trimmed.length < 2) return { isValid: false, error: 'Bairro muito curto (mín. 2 caracteres).' };
  return { isValid: true, error: '' };
};

// Código de verificação (6 dígitos)
export const validateVerificationCode = (code: string): ValidationResult => {
  if (!code) return { isValid: false, error: 'Informe o código.' };
  if (!/^\d{6}$/.test(code)) return { isValid: false, error: 'O código deve ter 6 números.' };
  return { isValid: true, error: '' };
};

// Descrição genérica (mínimo de caracteres)
export const validateDescription = (
  description: string,
  fieldName: string = 'descrição',
  minLength: number = 10
): ValidationResult => {
  const trimmed = description.trim();
  if (!trimmed) return { isValid: false, error: `Informe a ${fieldName}.` };
  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} muito curta (mín. ${minLength} caracteres).` };
  }
  return { isValid: true, error: '' };
};

// ========== VALIDAÇÃO DE CONSISTÊNCIA CEP ==========
export interface CepData {
  city: string;
  state: string;
  neighborhood?: string;
}

export const validateCepConsistency = (
  cepData: CepData | null,
  city: string,
  state: string
): { isValid: boolean; errors: { city?: string; state?: string } } => {
  if (!cepData) return { isValid: true, errors: {} };

  const errors: { city?: string; state?: string } = {};
  const cityMatch = city.toLowerCase().trim() === cepData.city.toLowerCase().trim();
  const stateMatch = state.toUpperCase().trim() === cepData.state.toUpperCase().trim();

  if (!cityMatch) {
    errors.city = `Cidade não corresponde ao CEP (esperado: ${cepData.city}).`;
  }
  if (!stateMatch) {
    errors.state = `UF não corresponde ao CEP (esperado: ${cepData.state}).`;
  }

  return { isValid: cityMatch && stateMatch, errors };
};

// ========== MAPEAMENTO DE ERROS DO BACKEND ==========
export const mapBackendErrors = (backendErrors: any): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};

  const map = (obj: any, prefix: string = '') => {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach((k) => {
      const key = prefix ? `${prefix}.${k}` : k;
      const val = obj[k];
      if (typeof val === 'string') fieldErrors[key] = val;
      else if (typeof val === 'object') map(val, key);
    });
  };

  map(backendErrors);
  return fieldErrors;
};
