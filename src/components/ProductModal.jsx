import { AnimatePresence, motion } from 'framer-motion';

export function ProductModal({ product, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-brand-text/30 p-4 backdrop-blur-sm sm:p-6 lg:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative mx-auto flex max-h-[90vh] w-[90%] flex-col overflow-hidden rounded-[2rem] border border-brand-muted/20 bg-brand-surface shadow-2xl md:w-3/4 md:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-background text-2xl font-bold text-brand-text shadow-sm transition-all hover:bg-brand-muted/10 hover:text-brand-primary sm:h-12 sm:w-12 sm:text-3xl md:right-8 md:top-8"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            {/* Columna Izquierda: Imagen del Producto */}
            <div className="relative h-48 w-full flex-shrink-0 bg-brand-background/50 md:h-auto md:w-1/2">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="absolute inset-0 h-full w-full object-contain p-8 mix-blend-multiply"
              />
            </div>

            {/* Columna Derecha: Información del Producto */}
            <div className="flex min-h-0 flex-1 flex-col p-6 md:p-10">
              <div className="flex-shrink-0 space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-text md:text-sm">
                  {product.marca}
                </p>
                <h3 className="text-xl font-black leading-tight text-brand-text md:text-xl">
                  {product.nombre}
                </h3>
              </div>

              <div className="my-4 flex-1 overflow-y-auto pr-2 text-xs leading-relaxed text-brand-text md:text-base">
                {product.descripcion}
              </div>

              <div className="mt-2 flex-shrink-0">
                <div className="flex items-end justify-between border-t border-brand-muted/20 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-text md:text-sm">
                      Precio
                    </span>
                    <span className="text-xl font-black text-brand-primary md:text-4xl">
                      ${product.precio.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="mt-2 w-full rounded-2xl bg-brand-primary py-3.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-primary/20 transition-all hover:-translate-y-1 hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/40 active:translate-y-0 md:text-base"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}