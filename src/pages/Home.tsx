export function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--lynk-bg)] text-[var(--lynk-text)]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.16),transparent_32rem)]" />

        <div className="mb-6 inline-flex rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)] backdrop-blur">
          Plataforma inteligente de integração
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-white md:text-7xl">
          LYNK
        </h1>

        <p className="mt-5 text-xl text-[var(--lynk-green)] md:text-2xl">
          Conecte sistemas. Simplifique operações.
        </p>

        <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--lynk-muted)] md:text-lg">
          Uma plataforma moderna para conectar bancos de dados, APIs, pedidos e
          fluxos operacionais por meio de automações inteligentes.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/marketplace"
            className="rounded-full bg-[var(--lynk-green)] px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            Explorar plataforma
          </a>

          <a
            href="/flow-preview"
            className="rounded-full border border-[var(--lynk-border)] px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--lynk-green)]"
          >
            Ver fluxo de integração
          </a>
        </div>
      </section>
    </main>
  )
}