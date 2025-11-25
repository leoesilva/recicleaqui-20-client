// Arquivo: src/types/Client.ts

// Define os dados do Usuário (Login)
export interface UserData {
  id: number;
  email: string;
  role: string;
}

// Define os dados da Pessoa Física
export interface IndividualData {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
}

// Define os dados do Endereço
export interface AddressData {
  id: number;
  addressType: string;
  addressName: string; // Rua
  number: string;
  additionalInfo?: string | null; // Complemento (pode ser nulo)
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
}

// A RESPOSTA COMPLETA DA API
// Junta todas as partes acima
export interface ClientProfileResponse {
  id: number;
  type: 'individual' | 'company';
  phone: string;
  avatarUrl?: string | null;
  userId: number;
  
  // Relacionamentos
  user: UserData;
  individual?: IndividualData | null; 
  company?: any | null;               // (Deixamos 'any' por enquanto para empresa)
  address?: AddressData | null;
}