import { AnimatePresence, motion } from 'framer-motion';

export function ProductModal({ product, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 p-4 backdrop-blur-md sm:p-6 lg:p-12"
          onClick={onClose}
        >
          <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative mx-auto w-[90%] md:w-3/4 max-h-[90vh] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-100 text-zinc-900 shadow-2xl flex flex-col md:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
                  className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-2xl font-bold text-zinc-600 backdrop-blur-md transition-all hover:bg-white/90 hover:text-rose-600 sm:h-12 sm:w-12 sm:text-3xl md:right-8 md:top-8"
              aria-label="Cerrar modal"
            >
              ×
            </button>

                {/* Columna Izquierda: Imagen del Producto */}
                <div className="relative h-36 w-full flex-shrink-0 md:h-auto md:w-1/2">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>

                {/* Columna Derecha: Información del Producto */}
                <div className="flex flex-col flex-1 min-h-0 p-6 md:p-8">
                  <div className="flex-shrink-0 space-y-2">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-zinc-500">
                      {product.marca}
                    </p>
                    <h3 className="text-xl font-bold leading-tight text-zinc-950 md:text-3xl">
                      {product.nombre}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto my-3 pr-2 text-xs leading-snug text-zinc-600 md:text-sm md:leading-relaxed">
                    {product.descripcion}
                  </div>

                  <div className="flex-shrink-0 mt-4">
                    <div className="flex items-end justify-between border-t border-zinc-200 pt-6">
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
                          Precio
                        </span>
                        <span className="text-2xl md:text-4xl font-black text-rose-500">
                          ${product.precio.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="mt-6 w-full rounded-2xl bg-rose-500 py-2.5 text-sm md:py-3 md:text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-rose-500/25 transition-all hover:-translate-y-1 hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/40 active:translate-y-0"
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
