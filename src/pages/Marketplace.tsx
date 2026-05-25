import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

export function Marketplace() {
  return (
    <main className="min-h-screen bg-[var(--lynk-bg)] px-6 py-32 text-[var(--lynk-text)]">
      <section className="mx-auto max-w-7xl">
        <span className="rounded-full border border-[var(--lynk-border)] bg-white/5 px-4 py-2 text-sm text-[var(--lynk-muted)]">
          Marketplace de conectores
        </span>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
              Escolha integrações para automatizar sua operação.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--lynk-muted)]">
              Conectores mockados para simular produtos digitais da plataforma
              LYNK, preparando a etapa de carrinho e integração com API.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6">
            <p className="text-sm text-[var(--lynk-muted)]">Catálogo atual</p>
            <p className="mt-2 text-4xl font-semibold text-white">{products.length}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Conectores disponíveis para compor fluxos de integração,
              automação, análise e sincronização de dados.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}