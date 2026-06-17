# Groceries Next Door — Mobile

Aplicativo mobile do **Groceries Next Door (GND)**, desenvolvido com [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) e [Expo Router](https://docs.expo.dev/router/introduction/). O app permite que o usuário se cadastre, faça login e navegue pelo fluxo de compras em supermercados — incluindo acesso como visitante, escaneamento de produtos e listagem.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Fluxo de navegação](#fluxo-de-navegação)
- [Stack tecnológica](#stack-tecnológica)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Integração com a API](#integração-com-a-api)
- [Formulários e validação](#formulários-e-validação)
- [Componentes reutilizáveis](#componentes-reutilizáveis)
- [Tema e estilização](#tema-e-estilização)
- [Scripts disponíveis](#scripts-disponíveis)
- [Convenções de commit](#convenções-de-commit)
- [Notas de desenvolvimento](#notas-de-desenvolvimento)

---

## Sobre o projeto

O **gnd-mobile** é o cliente mobile da plataforma Groceries Next Door. A interface segue uma identidade visual baseada em tons de verde (`GREEN_700` como cor principal de fundo), tipografia em negrito e botões com borda verde e fundo branco.

O roteamento é baseado em arquivos dentro de `src/app/`, utilizando o padrão do Expo Router. O código-fonte da aplicação fica em `src/`, com alias `@/` apontando para essa pasta.

---

## Funcionalidades

| Tela | Rota | Descrição |
|------|------|-----------|
| **Home** | `/` | Tela inicial com logo, botões de Sign in e Register, e link para continuar sem cadastro |
| **Sign in** | `/signin` | Login com e-mail e senha, opção "Remember me" e link Back |
| **Register** | `/register` | Cadastro com nome, sobrenome, senha e telefone |
| **Way to scan** | `/waytoscan` | Escolha entre QR Code ou digitação manual (fluxo de visitante) |
| **Lista de produtos** | `/list` | Listagem de produtos com header personalizado (localização e usuário) |

### Em desenvolvimento

- Integração da lista de produtos com a API
- Fluxos de QR Code e digitação manual na tela Way to scan
- Persistência de sessão após login (token)
- Dados dinâmicos de usuário e localização no header da lista

---

## Fluxo de navegação

```
Home (/)
├── Sign in (/signin) ──sucesso──► Lista de produtos (/list)
├── Register (/register) ──sucesso──► Sign in (/signin)
└── Continue without Registration ──► Way to scan (/waytoscan)
                                          ├── QR-Code (pendente)
                                          └── Enter with keyboard (pendente)
```

---

## Stack tecnológica

| Tecnologia | Uso |
|------------|-----|
| **Expo 56** | Framework e toolchain |
| **React Native 0.85** | UI nativa multiplataforma |
| **Expo Router 56** | Navegação file-based |
| **TypeScript 6** | Tipagem estática |
| **Axios** | Cliente HTTP para a API |
| **React Hook Form** | Gerenciamento de formulários |
| **Zod 4** | Validação de schemas |
| **@hookform/resolvers** | Integração Zod + React Hook Form |
| **react-native-safe-area-context** | Safe area em dispositivos com notch |
| **ESLint + eslint-config-expo** | Linting |
| **Commitizen** | Commits padronizados (Conventional Commits) |

---

## Estrutura do projeto

```
gnd-mobile/
├── assets/                    # Imagens e ícones (home-logo, header-logo, etc.)
├── src/
│   ├── app/                   # Rotas (Expo Router)
│   │   ├── _layout.tsx        # Layout raiz
│   │   ├── index.tsx          # Redireciona para home
│   │   ├── home/              # Tela inicial
│   │   ├── signin/            # Login (schema + estilos)
│   │   ├── register/          # Cadastro (schema + estilos)
│   │   ├── waytoscan/         # Modo de escaneamento
│   │   └── list/              # Lista de produtos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button/
│   │   ├── BackButton/
│   │   ├── Header/
│   │   ├── HeaderList/
│   │   ├── ProductItem/
│   │   └── CartEmpty/
│   ├── constants/
│   │   └── theme.ts           # Cores, fontes, espaçamentos
│   ├── hooks/
│   │   ├── use-color-scheme.ts
│   │   └── use-theme.ts
│   ├── lib/
│   │   └── axios.ts           # Instância configurada do Axios
│   └── global.css
├── app.json                   # Configuração Expo
├── package.json
└── tsconfig.json              # Alias @/* → src/*
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- npm
- [Expo Go](https://expo.dev/go) no dispositivo físico **ou** emulador Android / simulador iOS
- API backend rodando (padrão: `http://localhost:3333`)

---

## Instalação e execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm start
# ou
npx expo start
```

### 3. Abrir no dispositivo

| Plataforma | Comando |
|------------|---------|
| Android (emulador) | `npm run android` |
| iOS (simulador) | `npm run ios` |
| Web | `npm run web` |
| Expo Go | Escaneie o QR code exibido no terminal |

> **Expo Go:** use a versão compatível com SDK 56. O terminal pode solicitar a instalação da versão correta no emulador/dispositivo.

### 4. Lint

```bash
npm run lint
```

---

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `EXPO_PUBLIC_API_URL` | URL base da API backend | Ver tabela abaixo |

### URL da API por plataforma

Quando `EXPO_PUBLIC_API_URL` não está definida, o app usa:

| Plataforma | URL |
|------------|-----|
| Web / iOS Simulator | `http://localhost:3333` |
| Emulador Android | `http://10.0.2.2:3333` |
| Dispositivo físico | Defina `EXPO_PUBLIC_API_URL` com o IP da máquina na rede local |

**Exemplo (dispositivo físico na mesma rede Wi-Fi):**

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:3333 npx expo start
```

### React Native DevTools (Linux)

Em alguns ambientes Linux, o DevTools pode falhar por causa do sandbox do Chromium. Workaround:

```bash
export ELECTRON_DISABLE_SANDBOX=1
npx expo start
```

---

## Integração com a API

A instância HTTP está em `src/lib/axios.ts` e exporta `api` com `Content-Type: application/json`.

### Endpoints utilizados

| Método | Endpoint | Tela | Payload |
|--------|----------|------|---------|
| `POST` | `/users` | Register | `{ firstName, surname, password, phone }` |
| `POST` | `/auth/login` | Sign in | `{ email, password }` |

### Exemplo de uso

```typescript
import { api } from '@/lib/axios';

const { data } = await api.get('/products');
await api.post('/auth/login', { email, password });
```

---

## Formulários e validação

Os formulários de **Register** e **Sign in** usam **React Hook Form** + **Zod** + **zodResolver**.

### Register (`src/app/register/schema.ts`)

| Campo | Validação |
|-------|-----------|
| `firstName` | Obrigatório |
| `surname` | Obrigatório |
| `password` | Mínimo 6 caracteres |
| `phone` | Obrigatório |

### Sign in (`src/app/signin/schema.ts`)

| Campo | Validação |
|-------|-----------|
| `email` | E-mail válido |
| `password` | Obrigatório |

Erros de validação são exibidos abaixo de cada campo. Em caso de falha na API, um `Alert` nativo informa o usuário.

---

## Componentes reutilizáveis

| Componente | Descrição |
|------------|-----------|
| `Button` | Botão primário/secundário com variantes `PRIMARY` e `SECONDARY` |
| `BackButton` | Botão de voltar com navegação via `router.back()` |
| `Header` | Cabeçalho com logo, localização e nome do usuário |
| `HeaderList` | Cabeçalho da lista com safe area, logo compacto, localização centralizada e slot para ação |
| `ProductItem` | Card de produto com ícone, nome, subtítulo, preço e footer |
| `CartEmpty` | Estado vazio do carrinho com título, label e valor |

Cada componente possui seu próprio `styles.ts` usando `StyleSheet` do React Native.

---

## Tema e estilização

O design system está em `src/constants/theme.ts`:

- **Colors** — paleta de cinzas, verdes e vermelhos (`GREEN_700` é a cor principal de fundo)
- **FontSize** — escala tipográfica (`xs` a `xxxxxxxl`)
- **Spacing** — espaçamentos padronizados (`half: 2` até `six: 64`)
- **Fonts** — famílias por plataforma (iOS, Android, Web)

Os estilos das telas ficam colocalizados em `styles.ts` dentro de cada rota (`home/styles.ts`, `signin/styles.ts`, etc.), seguindo o padrão adotado na migração do styled-components.

### Assets

| Arquivo | Uso |
|---------|-----|
| `home-logo.png` | Logo completo nas telas de autenticação e home |
| `header-logo.png` | Ícone compacto no header da lista |
| `barcode.png` | Leitura de código de barras |
| `success.png` | Feedback de sucesso |

---

## Scripts disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `npm start` | Inicia o Metro Bundler |
| `android` | `npm run android` | Abre no emulador/dispositivo Android |
| `ios` | `npm run ios` | Abre no simulador iOS |
| `web` | `npm run web` | Abre no navegador |
| `lint` | `npm run lint` | Executa ESLint |
| `commit` | `npm run commit` | Commit interativo via Commitizen |
| `reset-project` | `npm run reset-project` | Reseta estrutura do template Expo (cuidado) |

---

## Convenções de commit

O projeto usa [Commitizen](https://github.com/commitizen/cz-cli) com [Conventional Commits](https://www.conventionalcommits.org/):

```bash
npm run commit
```

Exemplo de mensagens já usadas no repositório:

```
feat(gndm01-theme-base): create theme base for styles in app
```

---

## Notas de desenvolvimento

- **Expo SDK 56:** consulte a [documentação oficial](https://docs.expo.dev/versions/v56.0.0/) antes de adicionar dependências ou APIs nativas.
- **Rotas tipadas:** `experiments.typedRoutes` está habilitado em `app.json`.
- **React Compiler:** habilitado experimentalmente em `app.json`.
- **Alias de importação:** use `@/components/Button` em vez de caminhos relativos longos.
- **Safe area:** telas de autenticação usam `SafeAreaView`; `HeaderList` usa `useSafeAreaInsets()` para padding superior dinâmico.

---

## Licença

Projeto privado.
