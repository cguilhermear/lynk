-- Queries usadas no fluxo de integração do LYNK.
--
-- A ideia deste arquivo é deixar separadas as consultas principais
-- que seriam usadas pra buscar os dados no banco antes do envio
-- pra a API.
--
-- O fluxo trabalha com pedidos confirmados. A partir desses pedidos,
-- a consulta junta cliente, itens e produtos pra montar o payload
-- que depois será enviado no POST /pedidos.

-- =======================================================
-- 1. Buscar pedidos confirmados
-- =================================================
--
-- Consulta principal do fluxo.
--
-- Começa em pedidos, filtra apenas os registros com status confirmado
-- e usa JOIN pra trazer as informações ligadas ao cliente, aos itens
-- e aos produtos.
--
-- O resultado vem com uma linha pra cada item do pedido. Depois, na
-- etapa de transformação, esses dados são agrupados pelo pedido_id.

SELECT
    p.id AS pedido_id,
    p.status AS pedido_status,
    p.subtotal,
    p.imposto,
    p.total AS pedido_total,
    p.data_entrega,

    c.id AS cliente_id,
    c.nome AS cliente_nome,
    c.email AS cliente_email,
    c.cidade AS cliente_cidade,
    c.estado AS cliente_estado,

    ip.id AS item_id,
    ip.produto_id,
    pr.nome AS produto_nome,
    pr.categoria AS produto_categoria,
    pr.sku AS produto_sku,
    ip.quantidade,
    ip.preco_unitario,

    (ip.quantidade * ip.preco_unitario) AS total_item
FROM pedidos p
INNER JOIN clientes c
    ON c.id = p.cliente_id
INNER JOIN itens_pedido ip
    ON ip.pedido_id = p.id
INNER JOIN produtos pr
    ON pr.id = ip.produto_id
WHERE p.status = 'confirmado'
ORDER BY
    p.id,
    ip.id;


-- =======================================================
-- 2. Conferir subtotal dos pedidos
-- ====================================================
--
-- Essa consulta é mais de apoio.
--
-- Ela soma os itens de cada pedido confirmado e compara com o subtotal
-- salvo na tabela pedidos. Isso ajuda a validar se o pedido está coerente
-- antes de montar o payload final.

SELECT
    p.id AS pedido_id,
    p.status,
    c.id AS cliente_id,
    c.nome AS cliente_nome,
    COUNT(ip.id) AS quantidade_itens,
    SUM(ip.quantidade * ip.preco_unitario) AS subtotal_calculado,
    p.subtotal AS subtotal_registrado,
    p.imposto,
    p.total AS total_registrado,
    p.data_entrega
FROM pedidos p
INNER JOIN clientes c
    ON c.id = p.cliente_id
INNER JOIN itens_pedido ip
    ON ip.pedido_id = p.id
WHERE p.status = 'confirmado'
GROUP BY
    p.id,
    p.status,
    c.id,
    c.nome,
    p.subtotal,
    p.imposto,
    p.total,
    p.data_entrega
ORDER BY
    p.id;


-- ========================================================
-- 3. Pedidos confirmados sem itens
-- =================================================
--
-- Pedido confirmado sem item é um problema para o fluxo.
--
-- Usei LEFT JOIN aqui porque a ideia é encontrar pedidos que existem,
-- mas que não possuem nenhum registro correspondente em itens_pedido.

SELECT
    p.id AS pedido_id,
    p.status,
    p.cliente_id,
    p.data_entrega
FROM pedidos p
LEFT JOIN itens_pedido ip
    ON ip.pedido_id = p.id
WHERE p.status = 'confirmado'
  AND ip.id IS NULL;


-- ========================================================
-- 4. Itens com dados inválidos
-- ===================================================
--
-- Antes de enviar os dados, também é importante verificar se os itens
-- estão válidos.
--
-- Aqui entram casos simples:
-- - produto não encontrado;
-- - quantidade zerada ou negativa;
-- - preço unitário zerado ou negativo.
--
-- Se essa consulta retornar dados, o ideal é tratar como erro no fluxo
-- e registrar no log.

SELECT
    ip.id AS item_id,
    ip.pedido_id,
    ip.produto_id,
    pr.nome AS produto_nome,
    ip.quantidade,
    ip.preco_unitario
FROM itens_pedido ip
LEFT JOIN produtos pr
    ON pr.id = ip.produto_id
WHERE pr.id IS NULL
   OR ip.quantidade <= 0
   OR ip.preco_unitario <= 0;


-- ====================================================
-- 5. Pedidos com diferença no subtotal
-- =========================================================
--
-- Esta consulta compara o subtotal do pedido com a soma dos itens.
--
-- Coloquei uma margem de 0.01 pra evitar falso erro por diferença
-- pequena de arredondamento.

SELECT
    p.id AS pedido_id,
    p.subtotal AS subtotal_registrado,
    SUM(ip.quantidade * ip.preco_unitario) AS subtotal_calculado,
    ABS(p.subtotal - SUM(ip.quantidade * ip.preco_unitario)) AS diferenca
FROM pedidos p
INNER JOIN itens_pedido ip
    ON ip.pedido_id = p.id
WHERE p.status = 'confirmado'
GROUP BY
    p.id,
    p.subtotal
HAVING ABS(p.subtotal - SUM(ip.quantidade * ip.preco_unitario)) > 0.01
ORDER BY
    p.id;


-- =====================================================
-- 6. Exemplo de transformação pra payload
-- ===================================================
--
-- A primeira consulta retorna os dados em linhas, que é o formato normal
-- de uma consulta SQL.
--
-- No fluxo de integração, essas linhas seriam agrupadas por pedido.
--
-- Exemplo:
--
-- pedido_id: 5001
-- cliente_id: 101
-- data_entrega: 2026-06-10
-- itens:
--   - produto_id: 1, quantidade: 1
--   - produto_id: 2, quantidade: 1
--
-- Depois da transformação, o payload fica assim:
--
-- {
--   "cliente_id": 101,
--   "itens": [
--     { "produto_id": 1, "quantidade": 1 },
--     { "produto_id": 2, "quantidade": 1 }
--   ],
--   "data_entrega": "2026-06-10"
-- }
--
-- Esse payload seria enviado para:
--
-- POST /pedidos