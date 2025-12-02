# RecicleAqui 2.0 - Frontend (Mobile)

Aplicativo mobile para a plataforma RecicleAqui 2.0 - facilitando o descarte responsável de resíduos eletrônicos através de uma interface intuitiva e moderna.

---

## 🎯 Sobre o Projeto

**RecicleAqui 2.0** é um aplicativo móvel desenvolvido com React Native/Expo que conecta usuários a pontos de coleta e serviços de descarte de lixo eletrônico.

### Para quem é este app?

- **Pessoas Físicas (PF)**: Descarte responsável de eletrônicos domésticos
- **Empresas (PJ)**: Gestão de resíduos eletrônicos corporativos
- **Coletores**: Gerenciamento de solicitações de coleta

### Características Principais

- ✅ **Autenticação Segura** com JWT e recuperação de senha via código de 6 dígitos
- ✅ **Cadastro Completo** de clientes (PF/PJ) com validação de CPF/CNPJ
- ✅ **Integração ViaCEP** para preenchimento automático de endereços
- ✅ **Sistema de Linhas de Coleta** (Verde, Marrom, Azul, Branca) para diferentes tipos de eletrônicos
- ✅ **Busca de Pontos de Coleta** por proximidade e materiais aceitos
- ✅ **Histórico de Descartes** com filtros e estatísticas
- ✅ **Modo Claro/Escuro** com persistência de preferências
- ✅ **Validações em Tempo Real** com feedback visual (toasts + erros inline)
- ✅ **Upload de Avatar** com preview e persistência

---

## 🚀 Tecnologias

### Core
- **[React Native](https://reactnative.dev/)** 0.81.5 - Framework mobile multiplataforma
- **[Expo](https://expo.dev/)** ~54.0.23 - Plataforma de desenvolvimento
- **[TypeScript](https://www.typescriptlang.org/)** ~5.9.2 - Tipagem estática

### Navegação & UI
- **[React Navigation](https://reactnavigation.org/)** 7.x - Navegação (Drawer + Stack)
- **[Styled Components](https://styled-components.com/)** 6.1.19 - Estilização
- **[@expo/vector-icons](https://icons.expo.fyi/)** 15.0.3 - Ícones (MaterialCommunityIcons)

### Estado & Storage
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** 2.2.0 - Persistência local
- **Context API** (React) - Gerenciamento de estado global (Auth, Theme)

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** 7.52.1 - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** 3.23.8 - Validação de schemas
- **Validators customizados** - Validação CPF/CNPJ/CEP/UF/Phone

### Integrações
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** 17.0.8 - Seleção de fotos
- **[Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)** 14.0.9 - Fontes customizadas (Montserrat)
- **ViaCEP API** - Preenchimento automático de endereços

---

## 📦 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente ou via npx)
- **Dispositivo físico** ou **emulador** (Android Studio / Xcode)
- **Backend RecicleAqui 2.0** rodando ([repositório aqui](https://github.com/caiocesardev/recicleaqui-20-back))

---

## 🚀 Início Rápido

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/caiocesardev/recicleaqui-20-client.git
cd recicleaqui-20-client

# Instale as dependências
npm install
```

### 2. Configuração

```bash
# Copie o arquivo de exemplo
cp .env.example .env.development.local

# Edite o .env.development.local com a URL do backend
EXPO_PUBLIC_API_URL=https://seu-backend.ngrok-free.dev/api/v1
```

**Variáveis de Ambiente:**

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `EXPO_PUBLIC_API_URL` | URL base da API backend | `https://api.recicleaqui.com/api/v1` |

### 3. Executar

```bash
# Inicia o servidor Expo
npm start

# Escanear QR Code com Expo Go (iOS/Android)
# OU pressionar 'a' (Android) ou 'i' (iOS) no terminal
```

**Atalhos do Terminal:**
- `a` - Abrir no emulador Android
- `i` - Abrir no simulador iOS
- `w` - Abrir no navegador (Expo Web)
- `r` - Recarregar app
- `m` - Alternar menu

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/         # Botão primário/secundário
│   ├── TextInput/      # Input com validação e ícones
│   ├── Toast/          # Sistema de notificações
│   ├── InfoCard/       # Card informativo
│   └── GamificationCard/ # Card de conquistas/XP
│
├── screens/            # Telas do aplicativo
│   ├── Auth/          # Fluxo de autenticação
│   │   ├── LoginScreen/
│   │   ├── RegisterScreen/
│   │   ├── ForgotPasswordScreen/
│   │   ├── ResetPasswordScreen/
│   │   └── ResetPasswordConfirmScreen/
│   │
│   └── App/           # Telas do app autenticado
│       ├── HomeScreen/
│       ├── ProfileScreen/
│       ├── DisposalScreen/
│       ├── HistoryScreen/
│       ├── SettingsScreen/
│       ├── HelpScreen/
│       ├── ChangePasswordScreen/
│       └── Legal/     # Termos e Privacidade
│
├── navigation/         # Navegação
│   ├── AuthNavigator.tsx   # Stack de autenticação
│   ├── MainNavigator.tsx   # Drawer principal
│   └── types.ts           # Tipos de navegação
│
├── context/           # Context API
│   ├── AuthContext.tsx    # Estado de autenticação
│   └── ThemeContext.tsx   # Modo claro/escuro
│
├── constants/         # Constantes
│   └── colors.ts         # Paleta de cores (light/dark)
│
├── utils/            # Utilitários
│   └── validators.ts    # Validações centralizadas
│
├── services/         # Serviços externos
│   └── notificationService.ts # Push notifications (futuro)
│
└── types/           # Tipos TypeScript
    ├── Client.ts       # Tipos de cliente
    └── styled.d.ts     # Extensão de tipos Styled Components
```

---

## 📱 Funcionalidades

### 🔐 Autenticação

#### Login
- Validação de e-mail e senha em tempo real
- Opção "Manter-me conectado" (persistência de token)
- Recuperação de senha via código de 6 dígitos

#### Cadastro (3 Etapas)
1. **Credenciais**: E-mail, senha (com medidor de força), confirmação
2. **Dados Pessoais**: Nome completo/Razão Social, CPF/CNPJ (validação), telefone
3. **Endereço**: CEP (auto-preenchimento via ViaCEP), rua, número, bairro, cidade, UF

#### Recuperação de Senha
1. **Solicitar Código**: Insere e-mail → recebe código de 6 dígitos
2. **Verificar Código**: Digita código recebido
3. **Nova Senha**: Define nova senha (mínimo força "Média")

---

### 🏠 Home

- **Cabeçalho Dinâmico**: Nome do usuário + avatar
- **Ações Rápidas**: Registrar descarte, histórico, perfil
- **Histórico Compacto**: Últimos 3 descartes com status visual
- **InfoCards**: Dicas de reciclagem e estatísticas

---

### ♻️ Registrar Descarte (3 Passos)

#### Passo 1: Selecionar Linhas
Escolha uma ou mais linhas de coleta:
- **🟢 Verde**: Computadores, notebooks, celulares
- **🟤 Marrom**: TVs, monitores, impressoras
- **🔵 Azul**: Geladeiras, micro-ondas, fogões
- **⚪ Branca**: Baterias, pilhas, lâmpadas, cabos

#### Passo 2: Modo de Descarte
- **🚚 Coleta em Casa**: Coletor vai até você
- **📍 Levar ao Ponto**: Encontra pontos próximos no mapa

#### Passo 3: Detalhes
- **Descrição dos Itens**: Mínimo 10 caracteres
- **Endereço**: Auto-preenchido do perfil (editável)
- **Pontos Elegíveis**: Busca automática por linhas selecionadas + localização

---

### 👤 Perfil

- **Avatar Editável**: Upload com preview instantâneo
- **Dados Pessoais**:
  - PF: Nome, sobrenome, CPF (não editável), telefone
  - PJ: Nome fantasia, razão social, CNPJ (não editável), telefone
- **Endereço Completo**:
  - CEP (auto-preenchimento via ViaCEP)
  - Validação de consistência: cidade/UF devem corresponder ao CEP
  - Tipo de endereço, rua, número, bairro, cidade, UF, complemento
- **Validações em Tempo Real**:
  - Telefone: (DDD) + 8/9 dígitos
  - CEP: 8 dígitos exatos
  - UF: 27 estados válidos (AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO)
  - Cidade: Apenas letras
  - Número: Apenas dígitos

---

### 📜 Histórico

- **Listagem Agrupada**: Por data (Hoje, Ontem, dd de mês)
- **Filtros**: Todos, Pendentes, Concluídos, Cancelados
- **Detalhes por Descarte**:
  - Horário exato
  - Status visual (badge colorido)
  - Tipo (Coleta em Casa / Entrega em Ponto)
  - Itens descartados
  - XP ganho (se concluído)

---

### ⚙️ Configurações

- **Notificações Push**: Toggle para ativar/desativar (com persistência)
- **Modo Escuro**: Alterna entre tema claro e escuro
- **Alterar Senha**: Redireciona para fluxo dedicado
- **Links Legais**:
  - Termos de Uso
  - Política de Privacidade

---

### 🆘 Ajuda & Suporte

- **FAQ**: Perguntas frequentes (em desenvolvimento)
- **Fale Conosco**: E-mail de suporte (suporte@recicleaqui.com)
- **WhatsApp**: Atendimento humano (em desenvolvimento)

---

## 🎨 Design System

### Paleta de Cores

#### Tema Claro
| Cor | Hex | Uso |
|-----|-----|-----|
| Primary | `#348e57` | Botões, links, destaques |
| Secondary | `#85c49e` | Elementos secundários |
| Background | `#f5f7fa` | Fundo da tela |
| Surface | `#ffffff` | Cards, modais |
| Text | `#333333` | Texto principal |
| Text Light | `#999999` | Texto secundário |
| Error | `#E74C3C` | Erros e alertas |

#### Tema Escuro
| Cor | Hex | Uso |
|-----|-----|-----|
| Primary | `#348e57` | Mantém consistência |
| Background | `#121212` | Fundo da tela |
| Surface | `#1e1e1e` | Cards, modais |
| Text | `#ffffff` | Texto principal |
| Text Light | `#cccccc` | Texto secundário |

### Linhas de Coleta
| Linha | Cor | Fundo | Uso |
|-------|-----|-------|-----|
| Verde | `#4CAF50` | `#E8F5E9` | Computadores, celulares |
| Marrom | `#8D6E63` | `#EFEBE9` | TVs, monitores |
| Azul | `#42A5F5` | `#E3F2FD` | Eletrodomésticos |
| Branca | `#9E9E9E` | `#F5F5F5` | Baterias, cabos |

### Tipografia

**Família:** Montserrat
- **Regular**: Textos comuns
- **Bold**: Títulos, botões, destaques

**Tamanhos:**
- Título: 24px
- Subtítulo: 16px
- Corpo: 14px
- Legenda: 12px

---

## 🔧 Validações Centralizadas

Todas as validações estão em `src/utils/validators.ts`:

### Formatadores
```typescript
onlyDigits(value: string)       // Remove tudo exceto dígitos
formatCPF(value: string)        // 000.000.000-00
formatCNPJ(value: string)       // 00.000.000/0000-00
formatPhone(value: string)      // (00) 00000-0000
formatCEP(value: string)        // 00000-000
```

### Validadores
```typescript
validateEmail(email: string): ValidationResult
validatePassword(password: string, minStrength?: number): ValidationResult
validateCPF(cpf: string): ValidationResult
validateCNPJ(cnpj: string): ValidationResult
validatePhone(phone: string): ValidationResult
validateCEP(cep: string): ValidationResult
validateUF(uf: string): ValidationResult
validateName(name: string, fieldName: string): ValidationResult
validateCity(city: string): ValidationResult
validateAddress(address: string): ValidationResult
validateAddressNumber(number: string): ValidationResult
validateDescription(description: string, fieldName: string, minLength: number): ValidationResult
```

### Helpers
```typescript
calculatePasswordStrength(password: string): number  // 0-4
getPasswordStrengthLabel(strength: number): string
validateCepConsistency(city: string, state: string, cepData: CepData | null): ValidationResult
mapBackendErrors(backendErrors: any): Record<string, string>
```

**Padrão de Retorno:**
```typescript
interface ValidationResult {
  isValid: boolean;
  error: string;
}
```

---

## 🌐 Integração com Backend

### Endpoints Consumidos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **POST** | `/auth/login` | Login com JWT |
| **POST** | `/auth/forgot-password` | Solicita código de recuperação |
| **POST** | `/auth/reset-password` | Verifica código de recuperação |
| **POST** | `/clients/individual` | Cadastro PF |
| **POST** | `/clients/company` | Cadastro PJ |
| **GET** | `/clients/me` | Dados do cliente logado |
| **PUT** | `/clients/individual/:id` | Atualiza PF |
| **PUT** | `/clients/company/:id` | Atualiza PJ |
| **POST** | `/clients/:id/avatar` | Upload de avatar |
| **POST** | `/discards` | Registra descarte |
| **POST** | `/discards/eligible-points` | Busca pontos elegíveis |

### Autenticação

Todas as requisições autenticadas incluem:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

Token armazenado no **AsyncStorage** com chave `authToken`.

---

## 🔔 Sistema de Feedback

### Toasts (Notificações Globais)
- **Sucesso** ✅: Verde
- **Erro** ❌: Vermelho
- **Info** ℹ️: Azul

**Quando usar:**
- Sucesso de operações (senha alterada, perfil salvo)
- Erros gerais (sem conexão, servidor indisponível)
- Informações importantes (código enviado)

### Erros Inline (Por Campo)
Exibidos diretamente abaixo do input com erro.

**Quando usar:**
- Validação de formulário (e-mail inválido, senha fraca)
- Erros específicos de campo (CPF inválido, CEP não encontrado)

### Regra de Ouro
**Nunca exibir toast + erro inline ao mesmo tempo para o mesmo erro.**

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm start                 # Inicia Expo Dev Server
npm run android           # Abre no emulador Android
npm run ios               # Abre no simulador iOS
npm run web               # Abre no navegador

# Limpeza
npm start -- --clear      # Limpa cache do Expo

# Build (EAS)
eas build --platform android
eas build --platform ios
```

---

## 📂 Assets

### Fontes
- **Montserrat Regular** (`assets/fonts/Montserrat-Regular.ttf`)
- **Montserrat Bold** (`assets/fonts/Montserrat-Bold.ttf`)

### Imagens
- **Logo RecicleAqui** (`assets/images/logo-recicle-aqui.png`)
- **Avatar Placeholder** (`assets/images/avatar.png`)

---

## 🔒 Segurança

- ✅ **JWT** armazenado com segurança no AsyncStorage
- ✅ **Senhas** nunca armazenadas localmente
- ✅ **Validação Server-Side** complementar às validações client-side
- ✅ **HTTPS** obrigatório para comunicação com backend

---

## 🚧 Roadmap

### Em Desenvolvimento
- [ ] **Notificações Push** (Expo Notifications)
  - Coleta confirmada
  - Coletor a caminho
  - Descarte concluído + XP ganho
- [ ] **Gamificação Expandida**
  - Badges/conquistas
  - Ranking de usuários
  - Níveis (Bronze, Prata, Ouro, Diamante)
- [ ] **Mapa Interativo**
  - Visualização de pontos de coleta
  - Rota até o ponto mais próximo
- [ ] **Chat de Suporte**
  - Atendimento em tempo real

### Futuro
- [ ] **Compartilhamento Social**
- [ ] **Modo Offline** (cache de pontos)
- [ ] **Tutoriais Interativos** (onboarding)
- [ ] **Acessibilidade** (modo alto contraste, suporte a leitores de tela)
- [ ] **Internacionalização** (i18n - Português, Inglês, Espanhol)

---

## 📖 Documentação Adicional

- **[MELHORIAS_E_NOTIFICACOES.md](./MELHORIAS_E_NOTIFICACOES.md)** - Análise de melhorias e guia de implementação de notificações
- **[DEBUG_AVATAR.md](./DEBUG_AVATAR.md)** - Troubleshooting de upload de avatar
- **[Backend API](https://github.com/caiocesardev/recicleaqui-20-back)** - Documentação da API REST

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código
- **ESLint**: Seguir configuração do projeto
- **TypeScript**: Tipagem estrita ativada
- **Commits**: Mensagens descritivas em português
- **Componentes**: Usar Styled Components
- **Validações**: Centralizar em `utils/validators.ts`

---

## 👥 Equipe

- **Caio César** - Desenvolvedor Full Stack - [@caiocesardev](https://github.com/caiocesardev)

---

## 📄 Licença

Este projeto é privado e proprietário.

---

## 📞 Suporte

- **E-mail**: suporte@recicleaqui.com
- **WhatsApp**: +55 11 99999-9999

---

**RecicleAqui 2.0 - Facilitando a reciclagem e preservando o meio ambiente 🌱♻️**
