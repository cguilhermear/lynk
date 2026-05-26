# LYNK

Conecte sistemas. Simplifique operações.

LYNK é um projeto full stack criado para simular uma plataforma de integração entre produtos, pedidos, estoque e APIs.

A proposta é mostrar uma aplicação React com carrinho de compras e um backend em Node.js com endpoints mockados, seguindo o escopo da avaliação técnica.

## Tecnologias usadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- CORS

## O que já foi feito

- Landing page inicial
- Marketplace de conectores
- Carrinho com drawer lateral
- Estado global do carrinho com Zustand
- Backend separado em Node.js
- API mockada com rotas de produtos, estoque e pedidos

## Rotas da API

GET    /health
GET    /produtos
GET    /estoque/:produto_id
POST   /pedidos
GET    /pedidos/:pedido_id
PATCH  /pedidos/:pedido_id
Estrutura principal
src/                  frontend React
server/               backend Node.js + Express
integration-flow/     documentação do fluxo de integração
api-documentation.md  documentação da API
database-schema.md    estrutura do banco

## Como rodar o frontend

Na raiz do projeto:

npm install
npm run dev

Frontend:

http://localhost:5173

## Como rodar o backend, dentro da pasta server:

npm install
npm run dev

## API:

http://localhost:3333/health

## Próximos passos

Documentar o banco de dados
Criar as queries SQL
Documentar o fluxo de integração
Criar o diagrama visual do fluxo
Melhorar a página de preview do fluxo
Observação

O projeto ainda está em desenvolvimento. A ideia é construir primeiro a base funcional e depois melhorar visual, documentação e refinamentos finais.
```