const architectureLayers = [
  {
    title: 'Frontend React',
    description: 'Landing page, marketplace, carrinho e tela de arquitetura do fluxo.',
  },
  {
    title: 'Backend Node.js',
    description: 'API mockada com rotas para produtos, estoque e pedidos.',
  },
  {
    title: 'Banco e SQL',
    description: 'Modelo relacional documentado e queries com JOINs entre as tabelas.',
  },
  {
    title: 'Pipeline de integração',
    description: 'Fluxo com filtro, validação, transformação, enriquecimento, log e envio.',
  },
]

const flowSteps = [
  {
    number: '01',
    title: 'Banco de dados',
    description: 'Origem dos dados: produtos, clientes, pedidos e itens_pedido.',
    detail: 'As tabelas foram modeladas para simular um cenário real de pedidos.',
  },
  {
    number: '02',
    title: 'SQL query',
    description: 'Extrai pedidos confirmados usando JOIN entre as tabelas principais.',
    detail: 'A query consolida os dados antes da etapa de processamento.',
  },
  {
    number: '03',
    title: 'Filtro',
    description: 'Mantém no fluxo apenas pedidos com status confirmado.',
    detail: 'Pedidos pendentes ou cancelados não seguem para envio.',
  },
  {
    number: '04',
    title: 'Validação',
    description: 'Confere cliente, itens, produtos, quantidades e subtotal.',
    detail: 'Dados inconsistentes são bloqueados antes da transformação.',
  },
  {
    number: '05',
    title: 'Mapper',
    description: 'Agrupa as linhas retornadas pelo SQL e monta o JSON final.',
    detail: 'Aqui os dados relacionais viram payload para API REST.',
  },
  {
    number: '06',
    title: 'Estoque',
    description: 'Consulta informações complementares pelo endpoint de estoque.',
    detail: 'Essa etapa simula enriquecimento antes do envio final.',
  },
  {
    number: '07',
    title: 'Log',
    description: 'Registra sucesso, bloqueios e erros encontrados no fluxo.',
    detail: 'Ajuda a rastrear o que aconteceu durante o processamento.',
  },
  {
    number: '08',
    title: 'API out',
    description: 'Envia o pedido processado para o endpoint POST /pedidos.',
    detail: 'Representa a saída final da integração.',
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

const processingNodes = [
  {
    title: 'Nó filtro',
    description: 'Verifica se o pedido está confirmado antes de continuar.',
  },
  {
    title: 'Nó de validação',
    description: 'Confere se cliente, produto, quantidade e valores estão corretos.',
  },
  {
    title: 'Nó mapper',
    description: 'Transforma o retorno tabular do SQL em um payload JSON agrupado.',
  },
  {
    title: 'Nó de envio',
    description: 'Dispara a requisição HTTP para o endpoint POST /pedidos.',
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
              Esta tela mostra como os dados saem de um modelo relacional,
              passam por etapas de processamento e chegam ao backend por uma
              API REST mockada.
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
                O payload final é montado a partir dos pedidos confirmados e
                enviado para a API REST do projeto.
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
              A entrega foi separada em camadas para mostrar frontend, backend,
              dados e integração trabalhando juntos.
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
                Pipeline visual da integração
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--lynk-muted)]">
                O fluxo abaixo representa a lógica que depois também será
                refletida no arquivo Draw.io do repositório.
              </p>
            </div>

            <span className="rounded-full border border-[var(--lynk-border)] px-4 py-2 text-sm text-[var(--lynk-muted)]">
              Banco SQL → API REST
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-[var(--lynk-border)] bg-black/20 p-5 transition hover:border-[var(--lynk-green)] hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--lynk-green)]">
                    {step.number}
                  </span>
                  <span className="text-xs text-[var(--lynk-muted)]">
                    nó do fluxo
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                  {step.description}
                </p>

                <p className="mt-4 border-t border-[var(--lynk-border)] pt-4 text-xs leading-5 text-[var(--lynk-muted)]">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-[var(--lynk-border)] bg-black/20 p-5">
            <p className="text-sm font-semibold text-white">
              Ramificação de erro
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--lynk-muted)]">
              Se a validação falhar ou o estoque não for encontrado, o fluxo
              não envia o pedido para a API. O erro é registrado no log para
              análise posterior.
            </p>
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

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Nós de processamento
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--lynk-muted)]">
              Estes são os principais tratamentos que acontecem entre a
              extração SQL e o envio final para a API.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processingNodes.map((node) => (
              <article
                key={node.title}
                className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {node.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                  {node.description}
                </p>
              </article>
            ))}
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
                O fluxo também possui um arquivo importável no Draw.io. A
                próxima evolução é deixar esse diagrama ainda mais próximo da
                arquitetura exibida nesta tela.
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