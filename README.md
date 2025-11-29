<div align="center">
  <h1 align="center">Rapha Codes</h1>

  <p align="center">
    Um blog pessoal moderno e full-stack construído com as tecnologias mais recentes do ecossistema TypeScript.
    <br />
    <a href="https://rapha-codes.vercel.app"><strong>rapha.codes</strong></a>
    <br />
    <br />
  </p>
</div>

## 🚀 Sobre o Projeto

Este projeto é um blog pessoal completo, desenvolvido com uma arquitetura de monorepo utilizando **Turborepo**. O backend é uma API RESTful performática construída com **Hono** e **Node.js**, enquanto o frontend é uma aplicação **Next.js** moderna e responsiva, estilizada com **TailwindCSS** e **shadcn/ui**.

O objetivo é criar uma plataforma de blog robusta e escalável, demonstrando habilidades em desenvolvimento full-stack, boas práticas de código e o uso de ferramentas modernas de desenvolvimento.

### ✨ Principais Funcionalidades

- **Autenticação de Usuários:** Sistema seguro de login e registro utilizando **Better-Auth**.
- **Criação e Gerenciamento de Posts:** Editor de texto rico para criar e editar posts.
- **Dashboard de Administrador:** Interface para gerenciar todos os posts, incluindo publicações e rascunhos.
- **Documentação de API Automatizada:** A API gera documentação OpenAPI automaticamente, que pode ser visualizada com uma interface interativa do **Scalar**.
- **Segurança:** Implementação de `rate limiting` para proteção contra ataques de força bruta e `CORS` para controle de acesso.

## API

A API foi construída com Hono, um framework web para JavaScript rápido, leve e moderno. Ela segue os padrões RESTful e é totalmente documentada usando a especificação OpenAPI. A validação de dados é garantida pelo Zod, o que torna a API robusta e segura.

Você pode conferir a documentação oficial da API, gerada dinamicamente, no seguinte link:

[**Documentação da API - Rapha Codes**](https://api-raphacodes.vercel.app/docs)

## Preview

<p align="center">
  <img src="./public/website-preview.png" alt="website-preview" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">
  <em>Página inicial do blog</em>
</p>

<p align="center">
  <img src="./public/dashboard-preview.png" alt="dashboard-preview" style="width: 100%; border-radius: 8px;">
  <em>Dashboard de gerenciamento de posts</em>
</p>

<p align="center">
  <img src="./public/post-preview.png" alt="dashboard-preview" style="width: 100%; border-radius: 8px;">
  <em>Visualização e edição de posts</em>
</p>

## 🛠️ Tech Stack

O projeto utiliza uma stack moderna e performática, focada em TypeScript e ferramentas de alta produtividade.

### **Monorepo**
- Turborepo

### **Frontend**
- Next.js
- React
- TailwindCSS
- shadcn/ui

### **Backend**
- Hono
- Node.js
- Zod (para validação de schemas)
- Better-Auth (para autenticação)
- OpenAPI (para documentação de API com Scalar)
- Hono Rate Limiter (para segurança)
- CORS

### **Banco de Dados**
- PostgreSQL
- Drizzle ORM
- Neon (provedor de banco de dados serverless)

### **Ferramentas e Qualidade de Código**
- TypeScript
- Biome (para linting e formatação)
- Husky (para hooks de git)

## 🚀 Começando

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v20.x ou superior)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/raphaeleliass/rapha_codes.git
   cd rapha_codes
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

### Configuração do Banco de Dados

1.  Certifique-se de que você tem um banco de dados PostgreSQL em execução.
2.  Renomeie o arquivo `.env.example` em `apps/server` para `.env` e atualize com suas credenciais do PostgreSQL.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

3.  Aplique o schema ao seu banco de dados:
    ```bash
    pnpm db:push
    ```

### Executando a Aplicação

Para iniciar os servidores de desenvolvimento do frontend e backend, execute:

```bash
pnpm dev
```

- A aplicação web estará disponível em `http://localhost:3001`.
- A API estará disponível em `http://localhost:3000`.

## 📂 Estrutura do Projeto

O projeto é organizado como um monorepo com duas aplicações principais:

```
rapha_codes/
├── apps/
│   ├── web/         # Aplicação Frontend (Next.js)
│   └── server/      # API Backend (Hono)
└── packages/
    ├── ui/          # Componentes de UI compartilhados
    └── ts-config/   # Configurações de TypeScript
```

## 📜 Scripts Disponíveis

- `pnpm dev`: Inicia todas as aplicações em modo de desenvolvimento.
- `pnpm build`: Builda todas as aplicações para produção.
- `pnpm dev:web`: Inicia apenas a aplicação web.
- `pnpm dev:server`: Inicia apenas a API do servidor.
- `pnpm check-types`: Verifica os tipos do TypeScript em todo o monorepo.
- `pnpm db:push`: Aplica as alterações de schema ao banco de dados.
- `pnpm db:studio`: Abre a UI do Drizzle Studio.
- `pnpm check`: Executa o linting e a formatação com Biome.
