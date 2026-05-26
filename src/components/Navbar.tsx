import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useCartStore } from '../store/useCartStore'
import { getCartQuantity } from '../utils/cart'

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Conectores', path: '/marketplace' },
  { label: 'Fluxo de integração', path: '/flow-preview' },
]

type NavbarProps = {
  onOpenCart: () => void
}

export function Navbar({ onOpenCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const totalItems = getCartQuantity(items)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--lynk-border)] bg-black/45 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-[-0.08em] text-white md:text-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          LYNK
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-[var(--lynk-border)] bg-white/[0.03] p-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm transition',
                  isActive
                    ? 'bg-[var(--lynk-green)] text-black'
                    : 'text-[var(--lynk-muted)] hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--lynk-border)] px-3 py-2 text-sm font-medium text-white transition hover:border-[var(--lynk-green)] md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--lynk-border)] px-3 py-2 text-sm font-medium text-white transition hover:border-[var(--lynk-green)] md:px-4"
          >
            <ShoppingCart size={16} />
            Carrinho
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--lynk-green)] px-1.5 text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-[var(--lynk-border)] px-4 pb-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 rounded-3xl border border-[var(--lynk-border)] bg-black/60 p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-2xl px-4 py-3 text-sm transition',
                    isActive
                      ? 'bg-[var(--lynk-green)] text-black'
                      : 'text-[var(--lynk-muted)] hover:bg-white/[0.04] hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}