import { motion } from 'framer-motion';

function truncateDescription(description) {
  if (description.length <= 120) {
    return description;
  }

  return `${description.slice(0, 117)}...`;
}

export function ProductCard({ product, onAddToCart, onViewDetails, variants }) {
  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-rose-500/20 backdrop-blur-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-zinc-950/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 backdrop-blur-xl">
          {product.marca}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">{product.categoria.replace('_', ' ')}</p>
          <h3 className="mt-2 text-xl font-bold text-white">{product.nombre}</h3>
        </div>

        <p className="text-sm leading-7 text-zinc-300">{truncateDescription(product.descripcion)}</p>

        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-bold text-rose-400">${product.precio.toFixed(2)}</p>
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
            Stock disponible
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-xl bg-rose-500/20 px-4 py-3 font-bold text-rose-300 transition-colors hover:bg-rose-500 hover:text-white"
          >
            Agregar al carrito
          </button>
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="rounded-xl bg-teal-500/20 px-4 py-3 font-bold text-teal-300 transition-colors hover:bg-teal-500 hover:text-white"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </motion.article>
  );
}
