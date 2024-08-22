# Product Frontend

Este é um projeto frontend desenvolvido com React para gerenciar e visualizar produtos. 
O frontend consome a API do backend para realizar operações CRUD (Criar, Ler, Atualizar e Excluir) e exibir os produtos
em uma interface de usuário interativa.

## Requisitos

- **Node.js** (versão 14 ou superior)
- **Backend API**: É necessário ter a API do backend em funcionamento. 
   Siga as instruções no [README do backend](https://github.com/wsfloriano/product-api.git) para configurar e iniciar o servidor backend.

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/wsfloriano/product-frontend.git
   cd product-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o ambiente**

   Crie um arquivo `.env` na raiz do projeto e adicione a URL base da API backend:

   ```plaintext
   REACT_APP_API_URL=http://localhost:8001
   ```

   Certifique-se de que o `REACT_APP_API_URL` corresponde ao endereço onde o backend está sendo executado.

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   ```

   O frontend será iniciado em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- **Listagem de Produtos**: Visualize todos os produtos com opção de pesquisa, paginação e filtros.
- **Criação de Produtos**: Adicione novos produtos com nome, marca, preço e imagem.
- **Edição de Produtos**: Atualize informações de produtos existentes.
- **Exclusão de Produtos**: Remova produtos da lista.
- **Upload de Imagens**: Adicione imagens aos produtos durante a criação ou edição.

## Como funciona

O frontend se comunica com o backend para obter e manipular dados dos produtos. As seguintes rotas são usadas:

- **GET /products**: Obtém a lista de produtos.
- **GET /products/:id**: Obtém os detalhes de um produto específico.
- **POST /products**: Cria um novo produto.
- **PUT /products/:id**: Atualiza um produto existente.
- **DELETE /products/:id**: Exclui um produto específico.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Notas Adicionais

Certifique-se de que o backend esteja rodando antes de iniciar o frontend, para garantir que todas as funcionalidades dependentes da API funcionem corretamente.