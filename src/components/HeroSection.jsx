import { motion } from 'framer-motion';

export function HeroSection({ onBrowseProducts, onOpenCart }) {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative flex w-full flex-col items-center"
        >
          {/* Etiqueta Superior (Badge) */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-muted/30 bg-brand-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-text shadow-sm">
            Skincare & Maquillaje
          </div>

          {/* Título Principal */}
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-brand-text sm:text-5xl lg:text-6xl">
            Realza tu belleza natural con rutinas de{' '}
            <span className="text-brand-primary">
              alta calidad
            </span>
          </h1>

          {/* Subtítulo */}
          <div className="mt-6 max-w-xl rounded-3xl bg-brand-surface/60 p-6 backdrop-blur-sm border border-brand-muted/10">
              <p className="text-base leading-8 text-brand-text sm:text-lg">
                Cuidamos de tu piel. Explora nuestra selección curada de cosméticos, mascarillas y tratamientos faciales diseñados para hacerte brillar todos los días.
              </p>
          </div>

          {/* Botones de Acción */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBrowseProducts}
              className="rounded-full bg-brand-primary px-6 py-3 font-bold text-white shadow-xl shadow-brand-primary/20 transition hover:scale-[1.02] hover:bg-brand-primary/90"
            >
              Ver productos
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              className="rounded-full border-2 border-brand-muted/30 bg-brand-surface px-6 py-3 font-bold text-brand-text shadow-sm transition hover:border-brand-primary hover:text-brand-primary"
            >
              Mi carrito
            </button>
          </div>

          {/* Grid de Atributos de la Tienda */}
          <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand-muted/20 bg-brand-surface p-4 shadow-sm">
              <p className="text-sm text-brand-text">Productos</p>
              <p className="mt-1 text-lg font-bold text-brand-text">100% Originales</p>
            </div>
            <div className="rounded-2xl border border-brand-muted/20 bg-brand-surface p-4 shadow-sm">
              <p className="text-sm text-brand-text">Envíos</p>
              <p className="mt-1 text-lg font-bold text-brand-text">Nacionales</p>
            </div>
            <div className="rounded-2xl border border-brand-muted/20 bg-brand-surface p-4 shadow-sm">
              <p className="text-sm text-brand-text">Asesoría</p>
              <p className="mt-1 text-lg font-bold text-brand-text">Personalizada</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}