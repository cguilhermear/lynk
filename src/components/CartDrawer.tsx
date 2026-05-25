import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'

import { useCartStore } from '../store/useCartStore'
import { getCartTotal } from '../utils/cart'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  const total = getCartTotal(items)
  const hasItems = items.length > 0

  return (
    <div
      className={[
        'fixed inset-0 z-[80] transition',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={onClose}
        className={[
          'absolute inset-0 bg-black/70 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      <aside
        className={[
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[var(--lynk-border)] bg-[#030605]/95 p-6 text-[var(--lynk-text)] shadow-2xl backdrop-blur-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-[var(--lynk-border)] bg-white/5 px-3 py-1 text-xs text-[var(--lynk-muted)]">
              Carrinho
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
              Conectores selecionados
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--lynk-border)] p-2 text-white transition hover:border-[var(--lynk-green)]"
            aria-label="Fechar carrinho"
          >
            <X size={18} />
          </button>
        </div>

        {!hasItems && (
          <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--lynk-border)] bg-white/[0.03] p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--lynk-green)]/10 text-[var(--lynk-green)]">
              <ShoppingCart size={24} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Nenhum conector selecionado
            </h3>

            <p className="mt-3 text-sm leading-6 text-[var(--lynk-muted)]">
              Adicione conectores do marketplace para montar uma solução de
              integração personalizada.
            </p>
          </div>
        )}

        {hasItems && (
          <>
            <div className="mt-8 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-[var(--lynk-border)] bg-white/[0.03] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs text-[var(--lynk-green)]">
                        {item.category}
                      </span>

                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-[var(--lynk-muted)]">
                        {item.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full border border-red-400/20 p-2 text-red-300 transition hover:border-red-400/60 hover:bg-red-400/10"
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-[var(--lynk-border)] bg-black/30 p-1">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-full p-2 text-white transition hover:bg-white/10"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-10 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-full p-2 text-white transition hover:bg-white/10"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <strong className="text-sm text-white">
                      {(item.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--lynk-border)] pt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[var(--lynk-muted)]">
                  Total estimado
                </span>

                <strong className="text-2xl text-white">
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-full bg-[var(--lynk-green)] px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Simular contratação
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-full border border-[var(--lynk-border)] px-5 py-3 text-sm font-semibold text-white transition hover:border-red-400/60 hover:text-red-200"
              >
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}