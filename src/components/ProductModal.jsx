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
            className="relative mx-auto w-3/4 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-100 text-zinc-900 shadow-2xl md:flex md:min-h-[32rem]"
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
                <div className="relative h-72 w-full shrink-0 md:h-auto md:w-1/2 lg:w-[55%]">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Columna Derecha: Información del Producto */}
                <div className="flex w-full flex-col justify-center space-y-6 p-8 sm:p-10 md:w-1/2 md:p-12 lg:w-[45%]">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
                      {product.marca}
                    </p>
                    <h3 className="text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
                      {product.nombre}
                    </h3>
              </div>

                  <div className="prose prose-zinc max-w-none">
                    <p className="text-base leading-relaxed text-zinc-600">{product.descripcion}</p>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-end justify-between border-t border-zinc-200 pt-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                          Precio
                        </span>
                        <span className="text-3xl font-black text-rose-500">
                          ${product.precio.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="mt-8 w-full rounded-2xl bg-rose-500 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-rose-500/25 transition-all hover:-translate-y-1 hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/40 active:translate-y-0"
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
