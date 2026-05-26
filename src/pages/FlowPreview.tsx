const flowSteps = [
  {
    number: '01',
    title: 'Banco de dados',
    description: 'Origem dos dados com produtos, clientes, pedidos e itens do pedido.',
  },
  {
    number: '02',
    title: 'SQL query',
    description: 'Busca pedidos confirmados usando JOIN entre as tabelas principais.',
  },
  {
    number: '03',
    title: 'Filtro',
    description: 'Mantém apenas pedidos com status confirmado para seguir no fluxo.',
  },
  {
    number: '04',
    title: 'Validação',
    description: 'Confere cliente, itens, produtos, quantidades e valores do pedido.',
  },
  {
    number: '05',
    title: 'Transformação',
    description: 'Agrupa as linhas SQL e monta o payload JSON esperado pela API.',
  },
  {
    number: '06',
    title: 'Estoque',
    description: 'Consulta o endpoint de estoque para enriquecer os dados do pedido.',
  },
  {
    number: '07',
    title: 'Log',
    description: 'Registra sucesso, bloqueios ou falhas durante o processamento.',
  },
  {
    number: '08',
    title: 'API',
    description: 'Envia o pedido processado para o endpoint POST /pedidos.',
  },
]

const validationRules = [
  'Pedido precisa estar confirmado',
  'Pedido precisa ter cliente',
  'Pedido precisa ter pelo menos um item',
  'Produto precisa existir',
  'Quantidade precisa ser maior que zero',
  'Subtotal calculado precisa bater com os itens',
]

export function FlowPreview() {
  return (
    <main className="min-h-screen bg-[var(--lynk-bg)] px-6 py-32 text-[var(--lynk-text)]">
      <section className="mx-auto max-w-7xl">
        <span className="rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)]">
          Smartconnector preview
        </span>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
              Fluxo visual de integração do LYNK.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--lynk-muted)]">
              Esta tela representa o caminho dos dados desde o banco, passando
              por validações e transformação, até o envio final para a API
              mockada.
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
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Etapas do fluxo
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--lynk-muted)]">
                O fluxo foi separado em nós para deixar claro o que acontece em
                cada parte da integração.
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
                className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-5 transition hover:border-[var(--lynk-green)] hover:bg-white/[0.05]"
              >
                <span className="text-sm font-semibold text-[var(--lynk-green)]">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Regras de validação
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Antes do envio para API, o fluxo precisa bloquear pedidos com
              dados incompletos ou inconsistentes.
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
              Exemplo de payload final
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Depois da transformação, os itens do mesmo pedido são agrupados
              em uma única estrutura para envio.
            </p>

            <pre className="mt-6 overflow-x-auto rounded-2xl border border-[var(--lynk-border)] bg-black/30 p-5 text-sm leading-7 text-[var(--lynk-muted)]">
{`{
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
}`}
            </pre>
          </div>
        </section>
      </section>
    </main>
  )
}