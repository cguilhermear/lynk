# API Documentation

Esta é a documentação da API mockada usada no projeto LYNK.

A API foi criada em Node.js com Express e serve pra simular a parte de integração do projeto. Ela não usa banco real neste momento. Os dados estão mockados no backend, mas as rotas seguem uma estrutura parecida com uma API REST comum.

URL base local:

```
http://localhost:3333
```

---

## Health check

### GET /health

Rota simples pra conferir se o servidor está rodando.

### Exemplo de resposta

```json
{
  "success": true,
  "status": "online",
  "service": "LYNK API",
  "message": "Servidor Node.js em execução."
}
```

---

## Produtos

### GET /produtos

Retorna a lista de produtos cadastrados na base mockada.

No contexto do LYNK, esses produtos representam conectores ou soluções de integração disponíveis na plataforma.

### Exemplo de resposta

```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Conector ERP",
      "categoria": "Integração",
      "preco": 249.9,
      "sku": "LYNK-ERP-001"
    }
  ]
}
```

### Possíveis erros

Nesta versão mockada, essa rota não possui tratamento específico de erro. Ela apenas retorna a lista de produtos disponível em memória.

---

## Estoque

### GET /estoque/:produto_id

Retorna as informações de estoque de um produto específico.

O parâmetro `produto_id` é enviado pela URL.

### Exemplo de requisição

```
GET /estoque/1
```

### Exemplo de resposta

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

### Erro: estoque não encontrado

Quando não existe estoque para o produto informado, a API retorna `404`.

```json
{
  "sucesso": false,
  "erro": "Estoque não encontrado para o produto informado."
}
```

---

## Pedidos

### POST /pedidos

Cria um novo pedido na base mockada.

Essa rota é a principal saída do fluxo de integração. Depois que o fluxo busca os pedidos confirmados no banco e transforma os dados, o payload final é enviado pra esse endpoint.

### Body esperado

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

### Resposta de sucesso

Quando o pedido é criado, a API retorna `201 Created`.

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

Observação: o status inicial do pedido criado pela API é `pendente`.

### Erro: payload inválido

A API exige `cliente_id`, `data_entrega` e `itens`.

```json
{
  "sucesso": false,
  "erro": "Payload inválido. Informe cliente_id, data_entrega e itens."
}
```

### Erro: pedido sem itens

O array `itens` não pode estar vazio.

```json
{
  "sucesso": false,
  "erro": "O pedido deve conter pelo menos um item."
}
```

### Erro: quantidade inválida

Cada item precisa ter quantidade maior que zero.

```json
{
  "sucesso": false,
  "erro": "Todos os itens devem ter quantidade maior que zero."
}
```

---

## Buscar pedido por ID

### GET /pedidos/:pedido_id

Retorna os detalhes de um pedido específico.

O parâmetro `pedido_id` é enviado pela URL.

### Exemplo de requisição

```
GET /pedidos/5001
```

### Exemplo de resposta

```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5001,
    "cliente_id": 101,
    "status": "confirmado",
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 1,
        "preco_unitario": 249.9,
        "total": 249.9
      },
      {
        "produto_id": 2,
        "quantidade": 1,
        "preco_unitario": 199.9,
        "total": 199.9
      }
    ],
    "total": 494.78
  }
}
```

### Erro: pedido não encontrado

Quando o pedido não existe, a API retorna `404`.

```json
{
  "sucesso": false,
  "erro": "Pedido não encontrado."
}
```

---

## Atualizar status do pedido

### PATCH /pedidos/:pedido_id

Atualiza o status de um pedido.

Essa rota simula uma etapa posterior do fluxo, onde o pedido pode mudar de status depois de processado.

### Exemplo de requisição

```
PATCH /pedidos/5001
```

### Body esperado

```json
{
  "status": "enviado",
  "numero_rastreamento": "BR123456789"
}
```

O campo `numero_rastreamento` é opcional na implementação atual. O campo obrigatório é `status`.

### Resposta de sucesso

```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5001,
    "status": "enviado",
    "atualizado_em": "2026-05-26T10:40:00.000Z"
  }
}
```

### Erro: pedido não encontrado

```json
{
  "sucesso": false,
  "erro": "Pedido não encontrado."
}
```

### Erro: status não informado

```json
{
  "sucesso": false,
  "erro": "Informe o novo status do pedido."
}
```

---

## Resumo dos endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está online |
| GET | `/produtos` | Lista os produtos disponíveis |
| GET | `/estoque/:produto_id` | Busca o estoque de um produto |
| POST | `/pedidos` | Cria um novo pedido |
| GET | `/pedidos/:pedido_id` | Busca detalhes de um pedido |
| PATCH | `/pedidos/:pedido_id` | Atualiza o status de um pedido |

---

## Observações

A API está mockada para fins de avaliação técnica.

Ela ajuda a demonstrar o fluxo completo:

1. extrair dados via SQL;
2. transformar os dados no formato esperado;
3. validar regras básicas;
4. enviar pra uma API REST;
5. receber uma resposta de sucesso ou erro.

No fluxo de integração, o endpoint mais importante é:

```
POST /pedidos
```

Ele representa a saída final do processo.