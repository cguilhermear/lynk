export function FlowPreview() {
  return (
    <main className="min-h-screen bg-[var(--lynk-bg)] px-6 py-32 text-[var(--lynk-text)]">
      <section className="mx-auto max-w-7xl">
        <span className="rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)]">
          Smartconnector preview
        </span>

        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
          Visualize o fluxo entre banco de dados, validações e API.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--lynk-muted)]">
          Esta página será usada para representar visualmente o fluxo de
          integração: SQL, transformação, validação, enriquecimento, logs e
          envio para API.
        </p>
      </section>
    </main>
  )
}