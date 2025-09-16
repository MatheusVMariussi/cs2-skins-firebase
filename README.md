# MinhasSkins - Marketplace de Skins de CS (Versão Firebase)

Este projeto é uma aplicação web completa para um marketplace de skins de Counter-Strike, construído com uma arquitetura moderna e sem servidor (serverless).

A aplicação foi desenvolvida com **React** no frontend e utiliza os serviços de **Firebase Authentication** para gerenciamento de usuários e **Firestore** como banco de dados em tempo real, hospedada estaticamente no GitHub Pages.

## Funcionalidades

-   **Listagem de Anúncios:** Visualize todos os anúncios de skins com paginação.
-   **Filtros Avançados:** Filtre skins por arma, raridade e faixa de preço.
-   **Visualização Detalhada:** Veja detalhes completos de cada skin, como float, vendedor e descrição.
-   **Autenticação de Usuários:** Crie uma conta e faça login com e-mail e senha.
-   **Gerenciamento de Perfil:** Edite seu nome de vendedor em uma página de perfil dedicada.
-   **CRUD Seguro de Anúncios:** Usuários logados podem criar, editar e excluir **apenas os seus próprios** anúncios.

## Tecnologias Utilizadas

-   **Frontend:** React, React Router, Tailwind CSS
-   **Backend & Banco de Dados:** Firebase (Authentication e Firestore)
-   **Hospedagem:** GitHub Pages

## Como Executar o Projeto Localmente

**1. Clone o repositório:**
```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO/frontend
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure as Variáveis de Ambiente:**
   - Crie um arquivo chamado `.env.local` dentro da pasta `frontend`.
   - Adicione suas chaves de configuração do Firebase. Você pode encontrá-las no Console do Firebase, nas configurações do seu projeto (`Project settings` > `General` > `Your apps` > `SDK setup and configuration`).
   
   **Importante:** Os nomes das variáveis precisam começar com `REACT_APP_`.
   
   ```env
   # frontend/.env.local

   REACT_APP_FIREBASE_API_KEY="SUA_API_KEY"
   REACT_APP_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
   REACT_APP_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
   REACT_APP_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
   REACT_APP_FIREBASE_APP_ID="SEU_APP_ID"
   ```

**4. Inicie a aplicação:**
```bash
npm start
```
A aplicação estará disponível em `http://localhost:3000`.

## Publicando no GitHub Pages

O projeto já está configurado para deploy. Após enviar suas alterações para o GitHub, basta rodar o comando:

```bash
# Dentro da pasta /frontend
npm run deploy
```

Isso irá criar uma build de produção e publicá-la na branch `gh-pages` do seu repositório.

## Autor

Matheus Vinicius Mariussi