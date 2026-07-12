import { AnimatePresence, motion } from 'framer-motion';

export function Header({ cartCount, mobileMenuOpen, onToggleMobileMenu, onOpenCart, onNavigate }) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-muted/20 bg-brand-surface shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="group text-left"
        >
          <span className="block text-xs uppercase tracking-[0.35em] text-brand-text">Teffy's</span>
          <span className=" text-2xl font-extrabold text-brand-primary transition group-hover:text-brand-primary/90">
            Beauty Lab
          </span>
        </button>

        {/* Menú Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary" href="#hero">Inicio</a>
          <a className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary" href="#quienes-somos">Quiénes Somos</a>
          <a className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary" href="#catalogo-productos">Productos</a>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-full border border-brand-muted/20 bg-brand-background px-4 py-2 text-sm font-bold text-brand-text shadow-sm transition-all hover:border-brand-primary hover:text-brand-primary"
          >
            Carrito
            <motion.span
              key={cartCount}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex min-w-6 items-center justify-center rounded-full bg-brand-primary px-2 py-0.5 text-xs font-black text-white"
            >
              {cartCount}
            </motion.span>
          </button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-muted/20 bg-brand-background text-brand-text shadow-sm transition hover:text-brand-primary md:hidden"
            aria-label="Abrir menú"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-brand-muted/20 bg-brand-surface px-4 py-4 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-bold text-brand-text">
              <a className="rounded-xl px-4 py-3 transition hover:bg-brand-primary/10 hover:text-brand-primary" href="#hero" onClick={onToggleMobileMenu}>Inicio</a>
              <a className="rounded-xl px-4 py-3 transition hover:bg-brand-primary/10 hover:text-brand-primary" href="#quienes-somos" onClick={onToggleMobileMenu}>Quiénes Somos</a>
              <a className="rounded-xl px-4 py-3 transition hover:bg-brand-primary/10 hover:text-brand-primary" href="#catalogo-productos" onClick={onToggleMobileMenu}>Productos</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}