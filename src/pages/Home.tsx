import { Link } from 'react-router-dom'

const platformHighlights = [
  {
    title: 'Integrações inteligentes',
    description:
      'Conecte sistemas, APIs, dados e operações em uma experiência centralizada.',
  },
  {
    title: 'Operação organizada',
    description:
      'Transforme processos soltos em fluxos mais claros, rastreáveis e fáceis de acompanhar.',
  },
  {
    title: 'Base técnica escalável',
    description:
      'Frontend, backend, API REST e documentação preparados para evoluir com novos módulos.',
  },
]

const productCards = [
  {
    title: 'APIs REST',
    description: 'Comunicação estruturada entre serviços.',
  },
  {
    title: 'Banco de dados',
    description: 'Dados organizados para consulta e integração.',
  },
  {
    title: 'Pedidos',
    description: 'Fluxos comerciais simulados de ponta a ponta.',
  },
  {
    title: 'Estoque',
    description: 'Consulta de disponibilidade por produto.',
  },
  {
    title: 'Automação',
    description: 'Processos pensados para reduzir etapas manuais.',
  },
  {
    title: 'Monitoramento',
    description: 'Visão clara sobre fluxo, status e processamento.',
  },
]

export function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--lynk-bg)] text-[var(--lynk-text)]">
      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-6 py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,201,107,0.16),transparent_34rem)]" />
        <div className="absolute right-0 top-28 -z-10 h-72 w-72 rounded-full bg-[var(--lynk-green)]/10 blur-3xl" />
        <div className="absolute bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="grid min-h-[calc(100vh-8rem)] gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)] backdrop-blur">
              Plataforma inteligente para operações conectadas
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-white md:text-7xl">
              LYNK
            </h1>

            <p className="mt-6 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
              Tecnologia para conectar sistemas, dados e operações.
            </p>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--lynk-muted)] md:text-lg">
              Uma plataforma full stack criada para demonstrar qualidade
              técnica, experiência visual e uma arquitetura preparada para
              integrações modernas.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/marketplace"
                className="rounded-full bg-[var(--lynk-green)] px-6 py-3 text-center text-sm font-semibold text-black transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,201,107,0.22)]"
              >
                Explorar plataforma
              </Link>

              <Link
                to="/flow-preview"
                className="rounded-full border border-[var(--lynk-border)] bg-white/[0.02] px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-[var(--lynk-green)] hover:text-[var(--lynk-green)]"
              >
                Ver arquitetura técnica
              </Link>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {platformHighlights.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-[var(--lynk-green)] hover:bg-white/[0.05]"
                >
                  <div className="mb-5 h-2 w-10 rounded-full bg-[var(--lynk-green)] transition group-hover:w-16" />

                  <h2 className="text-sm font-semibold text-white">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--lynk-border)] bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center justify-between border-b border-[var(--lynk-border)] pb-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--lynk-green)]">
                  LYNK Console
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Plataforma operacional
                </h2>
              </div>

              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--lynk-green)]" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {productCards.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[var(--lynk-border)] bg-black/25 p-4 transition hover:-translate-y-1 hover:border-[var(--lynk-green)] hover:bg-[var(--lynk-green)]/10"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--lynk-border)] bg-white/[0.04] transition group-hover:border-[var(--lynk-green)] group-hover:bg-[var(--lynk-green)]/20">
                    <span className="h-2 w-2 rounded-full bg-[var(--lynk-green)]" />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[var(--lynk-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-[var(--lynk-border)] bg-black/25 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[var(--lynk-muted)]">
                    Qualidade técnica
                  </p>

                  <p className="mt-2 text-xl font-semibold text-white">
                    Interface, API, documentação e arquitetura em uma entrega só.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-[var(--lynk-green)]/15 px-4 py-2 text-sm font-semibold text-[var(--lynk-green)]">
                  pronto
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-[var(--lynk-green)]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}