const architectureLayers = [
  {
    title: 'Frontend React',
    description: 'Landing page, marketplace, carrinho e visualização da arquitetura.',
  },
  {
    title: 'Backend Node.js',
    description: 'API mockada com rotas para produtos, estoque e pedidos.',
  },
  {
    title: 'Banco e SQL',
    description: 'Schema relacional documentado e queries com JOINs.',
  },
  {
    title: 'Pipeline de integração',
    description: 'Fluxo com filtro, validação, mapper, estoque, log e envio.',
  },
]

const flowNodes = [
  {
    number: '01',
    title: 'Banco de dados',
    input: 'Tabelas normalizadas',
    output: 'pedidos, clientes, itens e produtos',
    description: 'Origem dos dados usados no fluxo de integração.',
  },
  {
    number: '02',
    title: 'SQL query',
    input: 'dados relacionais',
    output: 'pedidos confirmados consolidados',
    description: 'Extrai pedidos confirmados usando JOIN entre as tabelas.',
  },
  {
    number: '03',
    title: 'Filtro',
    input: 'resultado da query',
    output: 'somente pedidos confirmados',
    description: 'Remove registros que não devem seguir para processamento.',
  },
  {
    number: '04',
    title: 'Validação',
    input: 'pedido filtrado',
    output: 'pedido válido ou erro',
    description: 'Confere cliente, itens, produto, quantidade e subtotal.',
  },
  {
    number: '05',
    title: 'Mapper',
    input: 'linhas SQL validadas',
    output: 'payload JSON',
    description: 'Agrupa os itens do pedido e monta o formato esperado pela API.',
  },
  {
    number: '06',
    title: 'Estoque',
    input: 'produto_id',
    output: 'dados de estoque',
    description: 'Consulta informações complementares no endpoint de estoque.',
  },
  {
    number: '07',
    title: 'Log',
    input: 'resultado do processamento',
    output: 'registro de sucesso ou erro',
    description: 'Registra o que aconteceu em cada tentativa de integração.',
  },
  {
    number: '08',
    title: 'API out',
    input: 'payload final',
    output: 'POST /pedidos',
    description: 'Envia o pedido processado para a API REST mockada.',
  },
]

const dataTables = [
  {
    name: 'produtos',
    fields: 'id, nome, categoria, preco, sku',
    role: 'Catálogo usado para identificar os itens do pedido.',
  },
  {
    name: 'clientes',
    fields: 'id, nome, email, cidade, estado',
    role: 'Dados básicos do cliente vinculado ao pedido.',
  },
  {
    name: 'pedidos',
    fields: 'id, cliente_id, status, subtotal, imposto, total, data_entrega',
    role: 'Tabela principal para filtrar pedidos confirmados.',
  },
  {
    name: 'itens_pedido',
    fields: 'id, pedido_id, produto_id, quantidade, preco_unitario',
    role: 'Detalha os produtos que fazem parte de cada pedido.',
  },
]

const validationRules = [
  'Pedido precisa estar confirmado',
  'Cliente precisa existir',
  'Pedido precisa ter pelo menos um item',
  'Produto precisa existir',
  'Quantidade precisa ser maior que zero',
  'Subtotal calculado precisa bater com os itens',
]

const sqlPreview = `SELECT
    p.id AS pedido_id,
    c.id AS cliente_id,
    ip.produto_id,
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
WHERE p.status = 'confirmado';`

const payloadPreview = `{
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
}`

export function FlowPreview() {
  return (
    <main className="min-h-screen bg-[var(--lynk-bg)] px-6 py-32 text-[var(--lynk-text)]">
      <section className="mx-auto max-w-7xl">
        <span className="rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)]">
          Smartconnector architecture
        </span>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
              Arquitetura de Integração do LYNK.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--lynk-muted)]">
              Esta tela mostra o fluxo real do sistema: de onde os dados saem,
              quais nós processam essas informações e para onde o pedido é
              enviado no final da integração.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--lynk-green)]">
              Saída principal
            </p>

            <div className="mt-4 rounded-2xl border border-[var(--lynk-border)] bg-black/20 p-5">
              <p className="text-sm text-[var(--lynk-muted)]">Endpoint</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                POST /pedidos
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--lynk-muted)]">
                O pedido só chega aqui depois de passar por extração SQL,
                filtro, validação, transformação, enriquecimento e log.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Visão geral da arquitetura
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--lynk-muted)]">
              A aplicação foi separada em camadas para mostrar frontend,
              backend, dados e integração trabalhando juntos.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {architectureLayers.map((layer) => (
              <article
                key={layer.title}
                className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                  {layer.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[var(--lynk-border)] bg-white/[0.03] p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Fluxo real da integração
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--lynk-muted)]">
                Abaixo está o caminho do dado dentro do sistema. Cada nó recebe
                uma entrada, faz um tratamento específico e envia o resultado
                para o próximo passo.
              </p>
            </div>

            <span className="rounded-full border border-[var(--lynk-border)] px-4 py-2 text-sm text-[var(--lynk-muted)]">
              Banco SQL → Nós → API REST
            </span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[1120px]">
              <div className="grid grid-cols-[1fr_48px_1fr_48px_1fr_48px_1fr] items-stretch gap-3">
                {flowNodes.slice(0, 4).map((node, index) => (
                  <>
                    <article
                      key={node.number}
                      className="rounded-3xl border border-[var(--lynk-border)] bg-black/20 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[var(--lynk-green)]">
                          {node.number}
                        </span>
                        <span className="rounded-full border border-[var(--lynk-border)] px-3 py-1 text-xs text-[var(--lynk-muted)]">
                          nó
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {node.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                        {node.description}
                      </p>

                      <div className="mt-5 space-y-2 border-t border-[var(--lynk-border)] pt-4">
                        <p className="text-xs text-[var(--lynk-muted)]">
                          Entrada: <span className="text-white">{node.input}</span>
                        </p>
                        <p className="text-xs text-[var(--lynk-muted)]">
                          Saída: <span className="text-white">{node.output}</span>
                        </p>
                      </div>
                    </article>

                    {index < 3 && (
                      <div
                        key={`${node.number}-arrow`}
                        className="flex items-center justify-center text-3xl text-[var(--lynk-green)]"
                      >
                        →
                      </div>
                    )}
                  </>
                ))}
              </div>

              <div className="mt-4 flex justify-end pr-[calc(25%+72px)] text-3xl text-[var(--lynk-green)]">
                ↓
              </div>

              <div className="mt-4 grid grid-cols-[1fr_48px_1fr_48px_1fr_48px_1fr] items-stretch gap-3">
                {flowNodes.slice(4).map((node, index) => (
                  <>
                    <article
                      key={node.number}
                      className="rounded-3xl border border-[var(--lynk-border)] bg-black/20 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[var(--lynk-green)]">
                          {node.number}
                        </span>
                        <span className="rounded-full border border-[var(--lynk-border)] px-3 py-1 text-xs text-[var(--lynk-muted)]">
                          nó
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {node.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                        {node.description}
                      </p>

                      <div className="mt-5 space-y-2 border-t border-[var(--lynk-border)] pt-4">
                        <p className="text-xs text-[var(--lynk-muted)]">
                          Entrada: <span className="text-white">{node.input}</span>
                        </p>
                        <p className="text-xs text-[var(--lynk-muted)]">
                          Saída: <span className="text-white">{node.output}</span>
                        </p>
                      </div>
                    </article>

                    {index < 3 && (
                      <div
                        key={`${node.number}-arrow`}
                        className="flex items-center justify-center text-3xl text-[var(--lynk-green)]"
                      >
                        →
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-[var(--lynk-border)] bg-black/20 p-5">
              <p className="text-sm font-semibold text-white">
                Caminho de sucesso
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--lynk-muted)]">
                Quando o pedido está confirmado, possui cliente, itens válidos,
                produto existente e valores coerentes, ele é transformado em
                payload JSON e enviado para <strong>POST /pedidos</strong>.
              </p>
            </div>

            <div className="rounded-3xl border border-dashed border-red-500/40 bg-red-500/5 p-5">
              <p className="text-sm font-semibold text-white">
                Caminho de erro
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--lynk-muted)]">
                Se a validação falhar ou o estoque não for encontrado, o pedido
                não segue para a API. O fluxo registra a falha no log e bloqueia
                o envio.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Modelo de dados usado
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              O schema foi mantido simples para focar na integração. As quatro
              tabelas abaixo são a base para a extração SQL.
            </p>

            <div className="mt-6 space-y-3">
              {dataTables.map((table) => (
                <div
                  key={table.name}
                  className="rounded-2xl border border-[var(--lynk-border)] bg-black/20 p-4"
                >
                  <h3 className="font-semibold text-white">{table.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--lynk-muted)]">
                    {table.fields}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                    {table.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Consulta SQL principal
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              A query principal busca pedidos confirmados e consolida os dados
              necessários para a etapa de transformação.
            </p>

            <pre className="mt-6 overflow-x-auto rounded-2xl border border-[var(--lynk-border)] bg-black/30 p-5 text-xs leading-6 text-[var(--lynk-muted)] md:text-sm">
              {sqlPreview}
            </pre>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Regras de validação
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Antes do envio, o fluxo bloqueia registros incompletos ou
              inconsistentes.
            </p>

            <div className="mt-6 space-y-3">
              {validationRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-2xl border border-[var(--lynk-border)] bg-black/20 px-4 py-3 text-sm text-[var(--lynk-muted)]"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Payload final formatado
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Depois da transformação, os itens do mesmo pedido são agrupados
              em uma única estrutura para envio.
            </p>

            <pre className="mt-6 overflow-x-auto rounded-2xl border border-[var(--lynk-border)] bg-black/30 p-5 text-sm leading-7 text-[var(--lynk-muted)]">
              {payloadPreview}
            </pre>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[var(--lynk-border)] bg-white/[0.03] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--lynk-green)]">
                Draw.io
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Diagrama documentado no repositório
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--lynk-muted)]">
                O mesmo fluxo também está documentado em Draw.io, permitindo
                visualizar a arquitetura como diagrama importável e editável.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--lynk-border)] bg-black/20 p-5">
              <p className="text-sm text-[var(--lynk-muted)]">Arquivo</p>
              <p className="mt-2 break-words text-lg font-semibold text-white">
                integration-flow/flow-diagram.drawio
              </p>

              <a
                href="https://app.diagrams.net/#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fcguilhermear%2Flynk%2Fmain%2Fintegration-flow%2Fflow-diagram.drawio"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-[var(--lynk-green)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Abrir Draw.io
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
