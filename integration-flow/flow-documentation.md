# Flow Documentation

Este documento explica o fluxo de integração do LYNK.

A ideia do fluxo é simular como uma ferramenta visual, parecida com Smartconnector, buscaria pedidos em um banco de dados, validaria as informações, transformaria os dados e enviaria tudo pra uma API.

O fluxo foi pensado pra ser simples, mas completo o suficiente pra mostrar as etapas principais de uma integração real.

---

## Objetivo do fluxo

O objetivo é buscar pedidos com status `confirmado` no banco de dados e enviar esses pedidos pra API mockada do projeto.

O caminho geral fica assim:

``` 
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
Enriquecimento
↓
Log
↓
POST /pedidos
```

---

## 1. Nó de entrada: Banco de dados

O fluxo começa com uma consulta SQL.

A query principal busca pedidos confirmados e junta os dados das tabelas:

- `pedidos`
- `clientes`
- `itens_pedido`
- `produtos`

A consulta usa `INNER JOIN` pra trazer as informações relacionadas e filtra apenas:

```sql
WHERE p.status = 'confirmado'
```

Esse filtro é importante porque pedidos pendentes ou cancelados não devem seguir para a integração.

Arquivo relacionado:

``` 
integration-flow/queries.sql
```

---

## 2. Nó de filtro

Depois da consulta, o fluxo aplica um filtro pra garantir que só pedidos válidos continuem.

Neste caso, o critério principal é:

- o pedido precisa estar com status `confirmado`.

Mesmo que a query já faça esse filtro, manter essa etapa no fluxo ajuda a deixar a regra mais clara visualmente.

Exemplo:

``` 
pedido_status === "confirmado"
```

Pedidos com status diferente disso são ignorados.

---

## 3. Nó de validação

Nesta etapa, o fluxo confere se os dados mínimos estão corretos antes de montar o payload.

As validações principais são:

- o pedido precisa ter cliente;
- o pedido precisa ter pelo menos um item;
- cada item precisa ter produto;
- a quantidade precisa ser maior que zero;
- o preço unitário precisa ser maior que zero;
- a data de entrega precisa existir.

Também existe uma validação de valor, comparando o subtotal salvo no pedido com a soma dos itens.

Exemplo:

```sql
SUM(ip.quantidade * ip.preco_unitario)
```

Se algum dado estiver errado, o pedido não deve seguir para o envio da API.

---

## 4. Nó de transformação

A query retorna os dados em linhas, porque esse é o formato natural de uma consulta SQL.

Exemplo simplificado:

| pedido_id | cliente_id | produto_id | quantidade | data_entrega |
|---|---|---|---|---|
| 5001 | 101 | 1 | 1 | 2026-06-10 |
| 5001 | 101 | 2 | 1 | 2026-06-10 |

Mas a API espera um JSON agrupado por pedido.

Então o nó de transformação pega as linhas do mesmo `pedido_id` e monta um payload único.

Resultado esperado:

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

Esse é o formato usado no endpoint:

``` 
POST /pedidos
```

---

## 5. Nó de enriquecimento

Nesta etapa, o fluxo pode buscar informações extras antes de enviar o pedido.

No LYNK, o enriquecimento usa a rota de estoque:

``` 
GET /estoque/:produto_id
```

A ideia é conferir se existe estoque disponível para os produtos do pedido.

Exemplo de resposta esperada:

```json
{
  "sucesso": true,
  "dados": {
    "produto_id": 1,
    "quantidade_disponivel": 150,
    "quantidade_reservada": 10
  }
}
```

Se o produto não tiver estoque encontrado, o fluxo pode registrar erro e impedir o envio.

---

## 6. Nó de log

O nó de log registra o que aconteceu durante o processamento.

Exemplos de informações que podem ser registradas:

- pedido processado com sucesso;
- pedido ignorado por status inválido;
- pedido bloqueado por falta de item;
- item com quantidade inválida;
- produto sem estoque encontrado;
- erro ao enviar para API.

Exemplo simples de log:

```json
{
  "pedido_id": 5001,
  "status": "processado",
  "mensagem": "Pedido enviado para API com sucesso."
}
```

O log ajuda a entender o que aconteceu no fluxo e facilita a análise de problemas.

---

## 7. Nó de saída: API

Depois da validação, transformação e enriquecimento, o fluxo envia o pedido pra a API.

Endpoint usado:

``` 
POST /pedidos
```

Payload enviado:

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

Resposta esperada:

```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5004,
    "cliente_id": 101,
    "status": "pendente",
    "total": 494.78,
    "criado_em": "2026-05-26T10:30:00.000Z"
  }
}
```

---

## Tratamento de erros

O fluxo precisa prever alguns erros simples.

### Pedido sem itens

Se um pedido confirmado não tiver itens, ele não deve ser enviado pra a APi.

Ação esperada:

``` 
registrar no log e interromper o envio
```

### Produto não encontrado

Se algum item apontar pra um produto inexistente, o pedido fica inválido.

Ação esperada:

``` 
registrar erro de validação
```

### Quantidade inválida

Se algum item tiver quantidade menor ou igual a zero, o pedido não deve seguir.

Ação esperada:

``` 
bloquear pedido antes da transformação
```

### Estoque não encontrado

Se a consulta de estoque retornar erro, o fluxo deve registrar o problema.

Ação esperada:

``` 
registrar no log e não enviar o pedido
```

### Erro na API

Se o `POST /pedidos` retornar erro, o fluxo precisa registrar a falha.

Ação esperada:

``` 
salvar resposta de erro e permitir nova tentativa depois
```

---

## Exemplo resumido do fluxo

Entrada vinda do banco:

```json
[
  {
    "pedido_id": 5001,
    "pedido_status": "confirmado",
    "cliente_id": 101,
    "produto_id": 1,
    "quantidade": 1,
    "data_entrega": "2026-06-10"
  },
  {
    "pedido_id": 5001,
    "pedido_status": "confirmado",
    "cliente_id": 101,
    "produto_id": 2,
    "quantidade": 1,
    "data_entrega": "2026-06-10"
  }
]
```

Saída enviada pra a API:

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

## Resumo dos nós

| Ordem | Nó | Função |
|---|---|---|
| 1 | Banco de dados | Buscar pedidos confirmados com SQL |
| 2 | Filtro | Garantir que só pedidos confirmados continuem |
| 3 | Validação | Conferir dados obrigatórios e valores |
| 4 | Transformação | Agrupar linhas SQL em payload JSON |
| 5 | Enriquecimento | Consultar estoque dos produtos |
| 6 | Log | Registrar sucesso, bloqueios e erros |
| 7 | API | Enviar pedido para `POST /pedidos` |

---
