# LYNK

Conecte sistemas. Simplifique operações.

O LYNK é um projeto full stack criado para simular uma plataforma de integração entre produtos, pedidos, estoque e APIs.

A ideia principal foi montar uma aplicação simples, mas completa o bastante para demonstrar frontend, backend, API REST, dados mockados, carrinho de compras, documentação técnica e um fluxo de integração visual no estilo Smartconnector.

O projeto foi desenvolvido seguindo o escopo da avaliação técnica, com foco maior na parte de integração de dados, SQL, transformação para API e documentação do fluxo.

---

## O que o projeto entrega

No frontend, o projeto possui uma landing page, uma área de conectores/produtos, carrinho lateral e uma tela para visualizar a arquitetura de integração.

No backend, existe uma API mockada em Node.js com rotas para produtos, estoque e pedidos.

Além da aplicação, também foram criados arquivos de documentação para explicar o banco, as queries SQL, a API, o fluxo de integração, os exemplos de entrada/saída e os caminhos de erro.

---

## Tecnologias usadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Zustand
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* CORS

### Documentação e integração

* SQL
* Draw.io
* Markdown
* Git/GitHub

---

## Como rodar o frontend

Na raiz do projeto:

```bash
npm install
npm run dev
```

Depois acesse:

```bash
http://localhost:5173
```

Principais páginas:

```bash
/
```

```bash
/marketplace
```

```bash
/flow-preview
```

---

## Como rodar o backend

Entre na pasta do backend:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Rode o servidor:

```bash
npm run dev
```

A API fica disponível em:

```bash
http://localhost:3333
```

Para testar se está online:

```bash
http://localhost:3333/health
```

---

## Rotas da API

| Método | Rota                   | Descrição                      |
| ------ | --------------------- | ------------------------------ |
| GET    | `/health`              | Verifica se a API está online  |
| GET    | `/produtos`            | Lista os produtos disponíveis  |
| GET    | `/estoque/:produto_id` | Busca o estoque de um produto  |
| POST   | `/pedidos`             | Cria um novo pedido            |
| GET    | `/pedidos/:pedido_id`  | Busca os detalhes de um pedido |
| PATCH  | `/pedidos/:pedido_id`  | Atualiza o status de um pedido |

Exemplo de body para criar pedido:

```json
{
  "cliente_id": 101,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 1
    },
    {
      "produto_id": 2,
      "quantidade": 1
    }
  ],
  "data_entrega": "2026-06-10"
}
```

---

## Estrutura principal

```bash
src/
```

Frontend em React.

```bash
server/
```

Backend em Node.js + Express.

```bash
integration-flow/
```

Documentação do fluxo de integração.

```bash
database-schema.md
```

Documentação das tabelas usadas no fluxo.

```bash
api-documentation.md
```

Documentação dos endpoints da API mockada.

```bash
README.md
```

Visão geral do projeto.

---

## Fluxo de integração

A parte de integração simula um fluxo parecido com o que seria montado em uma ferramenta visual como Smartconnector, N8N ou Zapier.

O fluxo foi separado em três partes para deixar claro o que existe no código e o que representa a simulação/documentação da integração:

### 1. Frontend implementado

```bash
Usuário
↓
Home
↓
Marketplace
↓
products.ts
↓
ProductCard
↓
useCartStore
↓
CartDrawer
↓
Carrinho atualizado
```

O marketplace usa dados mockados locais no frontend e o carrinho é controlado com Zustand.

### 2. API mockada implementada

```bash
server.ts
↓
productsRoutes
↓
stockRoutes
↓
ordersRoutes
↓
mockDatabase
```

O backend possui endpoints reais em Node.js/Express para produtos, estoque e pedidos.

### 3. Fluxo Smartconnector documentado

```bash
Banco SQL documentado
↓
SQL query com JOINs
↓
Filtro de pedidos confirmados
↓
Validação de cliente, itens, produtos e subtotal
↓
Transformação para payload JSON
↓
Enriquecimento com estoque
↓
Log de sucesso ou erro
↓
POST /pedidos
```

A consulta principal busca pedidos com status `confirmado`, junta dados de cliente, itens e produtos usando `INNER JOIN`, calcula total por item e transforma o resultado em um payload para a API.

O fluxo também considera caminhos de erro, como pedido sem itens, produto inválido, quantidade inválida, subtotal divergente, estoque não encontrado e erro no envio para a API.

---

## Diagrama Draw.io

O projeto possui um diagrama visual do fluxo em:

```bash
integration-flow/flow-diagram.drawio
```

Esse arquivo pode ser importado no Draw.io/diagrams.net.

A tela `/flow-preview` também possui um botão para abrir o diagrama diretamente no Draw.io, usando a versão publicada no GitHub.

---

## Arquivos importantes

* `database-schema.md`: explica as tabelas `produtos`, `clientes`, `pedidos` e `itens_pedido`.
* `integration-flow/queries.sql`: contém as queries SQL usadas na integração.
* `api-documentation.md`: documenta os endpoints da API.
* `integration-flow/flow-documentation.md`: explica cada etapa do fluxo.
* `integration-flow/flow-diagram.drawio`: diagrama visual importável no Draw.io.
* `src/pages/FlowPreview.tsx`: tela visual da arquitetura de integração dentro do frontend.

---

## Observações sobre os dados

O projeto usa dados mockados.

O frontend tem seus próprios dados simulados para exibir os conectores e o carrinho.

O backend também usa dados mockados para simular produtos, estoque e pedidos.

A conexão direta entre marketplace e backend não foi feita nesta etapa. Essa decisão foi mantida para priorizar o escopo principal da avaliação: frontend funcional, API mockada, SQL, documentação, diagrama e fluxo de integração.

---

## Status do projeto

O projeto já possui:

* aplicação React funcionando;
* landing page;
* marketplace de conectores;
* carrinho com Zustand;
* backend Node.js separado;
* API mockada testada;
* documentação do banco;
* queries SQL com JOINs;
* documentação da API;
* documentação do fluxo;
* diagrama visual em Draw.io;
* botão para abrir o diagrama no Draw.io;
* página `/flow-preview` com arquitetura de integração.

A base funcional e a parte de integração foram priorizadas antes de qualquer refinamento extra.
