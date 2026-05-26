# Database Schema

Este arquivo documenta a estrutura de banco de dados usada como base para o fluxo de integração do LYNK.

A proposta aqui não é criar um banco complexo, e sim representar de forma clara um cenário realista de pedidos. A partir dessas tabelas, o fluxo consegue buscar pedidos confirmados, juntar informações do cliente, dos itens e dos produtos, transformar os dados e enviar para uma API.

O modelo segue as 4 tabelas pedidas na avaliação:

- `produtos`
- `clientes`
- `pedidos`
- `itens_pedido`

---

## Visão geral

A estrutura foi pensada para simular um fluxo comum de e-commerce ou plataforma de serviços:

```txt
clientes 1---N pedidos
pedidos 1---N itens_pedido
produtos 1---N itens_pedido
```

Na prática:

- um cliente pode fazer vários pedidos;
- cada pedido pertence a um cliente;
- cada pedido pode ter um ou mais itens;
- cada item aponta para um produto específico;
- um produto pode aparecer em vários pedidos diferentes.

Essa estrutura ajuda a demonstrar normalização básica, uso de relacionamentos e consultas com JOINs.

---

## Tabela: produtos

A tabela `produtos` guarda os produtos ou conectores disponíveis na plataforma.

No contexto do LYNK, os produtos representam soluções de integração, como conectores ERP, CRM, estoque e relatórios.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INT | Identificador único do produto |
| `nome` | VARCHAR(255) | Nome do produto |
| `categoria` | VARCHAR(100) | Categoria do produto |
| `preco` | DECIMAL(10, 2) | Preço unitário |
| `sku` | VARCHAR(50) | Código único usado para identificar o produto |

### Chave primária

```sql
PRIMARY KEY (id)
```

### Exemplo de dados

```sql
INSERT INTO produtos (id, nome, categoria, preco, sku) VALUES
(1, 'Conector ERP', 'Integração', 249.90, 'LYNK-ERP-001'),
(2, 'Sincronização CRM', 'Automação', 199.90, 'LYNK-CRM-002'),
(3, 'Fluxo de Estoque', 'Operações', 149.90, 'LYNK-EST-003'),
(4, 'Relatórios Inteligentes', 'Dados', 299.90, 'LYNK-REL-004');
```

---

## Tabela: clientes

A tabela `clientes` guarda as informações básicas de quem realizou o pedido.

Mantive os campos simples de propósito, porque o foco da avaliação não é cadastro completo de cliente, e sim conseguir relacionar cliente, pedido e itens na integração.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INT | Identificador único do cliente |
| `nome` | VARCHAR(255) | Nome do cliente |
| `email` | VARCHAR(255) | Email do cliente |
| `cidade` | VARCHAR(100) | Cidade do cliente |
| `estado` | VARCHAR(2) | Estado do cliente no formato UF |

### Chave primária

```sql
PRIMARY KEY (id)
```

### Exemplo de dados

```sql
INSERT INTO clientes (id, nome, email, cidade, estado) VALUES
(101, 'Mariana Souza', 'mariana.souza@email.com', 'Niterói', 'RJ'),
(102, 'Rafael Lima', 'rafael.lima@email.com', 'São Paulo', 'SP'),
(103, 'Fernanda Alves', 'fernanda.alves@email.com', 'Belo Horizonte', 'MG');
```

---

## Tabela: pedidos

A tabela `pedidos` representa a compra ou contratação feita por um cliente.

Ela guarda o status do pedido, os valores principais e a data prevista de entrega. No fluxo de integração, o campo mais importante aqui é o `status`, porque vamos buscar apenas pedidos confirmados.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INT | Identificador único do pedido |
| `cliente_id` | INT | Cliente relacionado ao pedido |
| `status` | VARCHAR(50) | Situação atual do pedido |
| `subtotal` | DECIMAL(10, 2) | Valor antes dos impostos |
| `imposto` | DECIMAL(10, 2) | Valor de imposto aplicado |
| `total` | DECIMAL(10, 2) | Valor final do pedido |
| `data_entrega` | DATE | Data prevista de entrega |

### Chave primária

```sql
PRIMARY KEY (id)
```

### Chave estrangeira

```sql
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
```

Essa chave estrangeira garante que cada pedido esteja ligado a um cliente existente.

### Status usados

Os status considerados no exemplo são:

- `pendente`
- `confirmado`
- `enviado`
- `cancelado`

Para o fluxo de integração, vamos trabalhar principalmente com:

```txt
confirmado
```

Ou seja, pedidos ainda pendentes ou cancelados não entram no envio para a API.

### Exemplo de dados

```sql
INSERT INTO pedidos (id, cliente_id, status, subtotal, imposto, total, data_entrega) VALUES
(5001, 101, 'confirmado', 449.80, 44.98, 494.78, '2026-06-10'),
(5002, 102, 'pendente', 199.90, 19.99, 219.89, '2026-06-12'),
(5003, 103, 'confirmado', 149.90, 14.99, 164.89, '2026-06-15');
```

---

## Tabela: itens_pedido

A tabela `itens_pedido` detalha quais produtos fazem parte de cada pedido.

Ela existe para evitar que os produtos fiquem gravados diretamente dentro da tabela `pedidos`. Assim, um pedido pode ter vários itens, e cada item pode apontar para um produto diferente.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INT | Identificador único do item |
| `pedido_id` | INT | Pedido ao qual o item pertence |
| `produto_id` | INT | Produto relacionado ao item |
| `quantidade` | INT | Quantidade contratada/comprada |
| `preco_unitario` | DECIMAL(10, 2) | Preço do produto no momento do pedido |

### Chave primária

```sql
PRIMARY KEY (id)
```

### Chaves estrangeiras

```sql
FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
FOREIGN KEY (produto_id) REFERENCES produtos(id)
```

Essas chaves permitem ligar cada item ao seu pedido e ao produto correspondente.

### Exemplo de dados

```sql
INSERT INTO itens_pedido (id, pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 5001, 1, 1, 249.90),
(2, 5001, 2, 1, 199.90),
(3, 5002, 2, 1, 199.90),
(4, 5003, 3, 1, 149.90);
```

---

## Como as tabelas se conectam no fluxo

O fluxo começa pela tabela `pedidos`, porque é nela que está o status do pedido.

Depois, a integração usa os relacionamentos para buscar o restante das informações:

1. `pedidos.cliente_id` conecta com `clientes.id`;
2. `itens_pedido.pedido_id` conecta com `pedidos.id`;
3. `itens_pedido.produto_id` conecta com `produtos.id`.

Com isso, conseguimos montar uma visão completa do pedido:

- dados do pedido;
- dados do cliente;
- produtos comprados;
- quantidade de cada item;
- valor unitário;
- total por item;
- data de entrega.

---

## Regra principal da integração

A regra central do fluxo é simples:

> Buscar pedidos com status `confirmado`, montar o payload no formato esperado e enviar para a API mockada.

A consulta SQL principal deve fazer JOIN entre as 4 tabelas e retornar somente pedidos confirmados.

Também é importante calcular o total de cada item:

```sql
quantidade * preco_unitario
```

Esse cálculo ajuda a validar se os dados do item fazem sentido antes de montar o payload final.

---

## Formato esperado da extração

A query principal deve retornar uma estrutura parecida com esta:

| pedido_id | status | cliente_id | cliente_nome | cliente_email | produto_id | produto_nome | quantidade | preco_unitario | total_item | data_entrega |
|---|---|---|---|---|---|---|---|---|---|---|

Esse formato facilita a etapa seguinte do fluxo, que é transformar os dados do banco em um JSON para a API.

---

## Exemplo de payload para API

Depois que os dados forem extraídos e agrupados por pedido, o fluxo pode gerar um payload como este:

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

Esse é o formato usado para simular o envio ao endpoint:

```txt
POST /pedidos
```

---

## Observações finais

O banco usado neste projeto é mockado, mas a estrutura representa um cenário realista de integração entre banco de dados e API REST.

A modelagem foi mantida simples para não fugir do escopo da avaliação, mas ainda demonstra os pontos principais:

- tabelas normalizadas;
- chaves primárias;
- chaves estrangeiras;
- relacionamento entre pedidos, clientes, itens e produtos;
- preparação para queries SQL com JOINs;
- transformação dos dados para consumo de API.


