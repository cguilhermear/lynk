import { ShoppingCart } from 'lucide-react'

import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--lynk-green)]/60 hover:bg-white/[0.06]">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--lynk-green)]/10 blur-3xl transition group-hover:bg-[var(--lynk-cyan)]/20" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-[var(--lynk-border)] bg-black/30 px-3 py-1 text-xs text-[var(--lynk-muted)]">
            {product.category}
          </span>

          <span className="text-xs text-[var(--lynk-muted)]">{product.sku}</span>
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
          {product.name}
        </h2>

        <p className="mt-3 text-sm font-medium text-[var(--lynk-green)]">
          {product.highlight}
        </p>

        <p className="mt-4 min-h-20 text-sm leading-6 text-[var(--lynk-muted)]">
          {product.description}
        </p>

        <ul className="mt-6 space-y-3">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lynk-green)]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs text-[var(--lynk-muted)]">A partir de</span>
            <p className="text-2xl font-semibold text-white">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--lynk-green)] px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
          >
            <ShoppingCart size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}