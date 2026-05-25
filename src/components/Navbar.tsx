import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Conectores', path: '/marketplace' },
  { label: 'Fluxo de integração', path: '/flow-preview' },
]

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--lynk-border)] bg-black/45 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-semibold tracking-[-0.08em] text-white">
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

        <a
          href="/flow-preview"
          className="rounded-full border border-[var(--lynk-border)] px-4 py-2 text-sm font-medium text-white transition hover:border-[var(--lynk-green)]"
        >
          Ver fluxo
        </a>
      </nav>
    </header>
  )
}