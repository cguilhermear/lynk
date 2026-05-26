# LYNK

Conecte sistemas. Simplifique operações.

O LYNK é um projeto full stack feito pra simular uma plataforma de integração entre produtos, pedidos, estoque e APIs.

A ideia principal foi montar uma aplicação simples, mas completa o bastante pra mostrar frontend, backend, API REST, dados mockados, carrinho de compras e um fluxo de integração documentado.

O projeto foi feito seguindo o escopo da avaliação técnica, com foco maior na parte de integração de dados.

---

## O que o projeto entrega

No frontend, o projeto tem uma landing page, uma área de conectores/produtos, carrinho lateral e uma tela pra visualizar o fluxo de integração.

No backend, existe uma API mockada em Node.js com rotas pra produtos, estoque e pedidos.

Além da aplicação, também foram criados arquivos de documentação pra explicar o banco, as queries SQL, a API e o fluxo de integração.

---

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

### Documentação e integração

- SQL
- Draw.io
- Markdown
- Git/GitHub

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

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está online |
| GET | `/produtos` | Lista os produtos disponíveis |
| GET | `/estoque/:produto_id` | Busca o estoque de um produto |
| POST | `/pedidos` | Cria um novo pedido |
| GET | `/pedidos/:pedido_id` | Busca os detalhes de um pedido |
| PATCH | `/pedidos/:pedido_id` | Atualiza o status de um pedido |

Exemplo de body pra criar pedido:

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

O fluxo segue esta ideia:

```bash
Banco de dados
↓
SQL query
↓
Filtro
↓
Validação
↓
Transformação
↓
Enriquecimento com estoque
↓
Log
↓
POST /pedidos
```

A consulta principal busca pedidos com status `confirmado`, junta dados de cliente, itens e produtos, e depois transforma esse resultado em um payload para a API.

---

## Arquivos importantes

- `database-schema.md`: explica as tabelas `produtos`, `clientes`, `pedidos` e `itens_pedido`.
- `integration-flow/queries.sql`: contém as queries SQL usadas na integração.
- `api-documentation.md`: documenta os endpoints da API.
- `integration-flow/flow-documentation.md`: explica cada etapa do fluxo.
- `integration-flow/flow-diagram.drawio`: diagrama visual importável no Draw.io.
- `src/pages/FlowPreview.tsx`: tela visual do fluxo dentro do frontend.

---

## Observações sobre os dados

O projeto usa dados mockados.

O frontend tem seus próprios dados simulados pra exibir os conectores e o carrinho.

O backend também usa dados mockados pra simular produtos, estoque e pedidos.

A conexão direta entre frontend e backend não foi feita nesta etapa porque o foco principal da avaliação está no fluxo de integração, SQL, documentação e API REST.

---

## Status do projeto

O projeto já possui:

- aplicação React funcionando;
- marketplace de conectores;
- carrinho com Zustand;
- backend Node.js separado;
- API mockada testada;
- documentação do banco;
- queries SQL;
- documentação da API;
- documentação do fluxo;
- diagrama visual do fluxo;
- página `/flow-preview`.

A base funcional e a parte de integração foram priorizadas antes de qualquer refinamento visual extra.
