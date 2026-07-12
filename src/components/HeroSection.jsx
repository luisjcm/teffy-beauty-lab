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

        

          {/* Grid de Atributos de la Tienda */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-6">
            
            {/* Globo 1 */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-muted/10 bg-brand-surface px-5 py-2.5 shadow-sm transition-transform hover:scale-105 sm:rounded-2xl sm:px-6 sm:py-4">
                <p className="text-[10px] uppercase tracking-wider text-brand-muted sm:text-xs">Productos</p>
                <p className="text-sm font-bold text-brand-text sm:mt-1 sm:text-lg">100% Originales</p>
              </div>

              {/* Globo 2 */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-muted/10 bg-brand-surface px-5 py-2.5 shadow-sm transition-transform hover:scale-105 sm:rounded-2xl sm:px-6 sm:py-4">
                <p className="text-[10px] uppercase tracking-wider text-brand-muted sm:text-xs">Envíos</p>
                <p className="text-sm font-bold text-brand-text sm:mt-1 sm:text-lg">Nacionales</p>
              </div>

              {/* Globo 3 */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-muted/10 bg-brand-surface px-5 py-2.5 shadow-sm transition-transform hover:scale-105 sm:rounded-2xl sm:px-6 sm:py-4">
                <p className="text-[10px] uppercase tracking-wider text-brand-muted sm:text-xs">Asesoría</p>
                <p className="text-sm font-bold text-brand-text sm:mt-1 sm:text-lg">Personalizada</p>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}