import { AnimatePresence, motion } from 'framer-motion';

export function Header({ scrolled, cartCount, mobileMenuOpen, onToggleMobileMenu, onOpenCart, onNavigate }) {
  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(9, 9, 11, 0.7)' : 'rgba(9, 9, 11, 0.2)',
        boxShadow: scrolled ? '0 24px 80px rgba(0, 0, 0, 0.35)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="group text-left"
        >
          <span className="block text-xs uppercase tracking-[0.35em] text-zinc-500">Teffy's</span>
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-amber-300 bg-clip-text text-2xl font-extrabold text-transparent">
            Beauty Lab
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium text-zinc-300 transition-colors hover:text-white" href="#hero">Inicio</a>
          <a className="text-sm font-medium text-zinc-300 transition-colors hover:text-white" href="#quienes-somos">Quiénes Somos</a>
          <a className="text-sm font-medium text-zinc-300 transition-colors hover:text-white" href="#catalogo-productos">Productos</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-rose-400/40 hover:bg-rose-500/10"
          >
            Carrito
            <motion.span
              key={cartCount}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white"
            >
              {cartCount}
            </motion.span>
          </button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 transition hover:bg-white/10 md:hidden"
            aria-label="Abrir menú"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-zinc-950/95 px-4 py-4 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-medium text-zinc-300">
              <a className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#hero" onClick={onToggleMobileMenu}>Inicio</a>
              <a className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#quienes-somos" onClick={onToggleMobileMenu}>Quiénes Somos</a>
              <a className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#catalogo-productos" onClick={onToggleMobileMenu}>Productos</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
