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
      className="group overflow-hidden rounded-[1.75rem] border border-brand-muted/20 bg-brand-surface shadow-sm transition-all hover:shadow-xl hover:shadow-brand-muted/10 transform-gpu flex flex-col"
    >
      <div className="relative overflow-hidden bg-brand-background/30">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 mix-blend-multiply"
        />
        {/* Etiqueta de Marca (Badge) */}
        <div className="absolute left-4 top-4 rounded-full border border-brand-muted/10 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand-text shadow-sm backdrop-blur-md">
          {product.marca}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-text">
            {product.categoria.replace('_', ' ')}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-tight text-brand-text line-clamp-2">
            {product.nombre}
          </h3>
        </div>

        <p className="flex-1 text-sm leading-6 text-brand-text">
          {truncateDescription(product.descripcion)}
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="text-2xl font-black text-brand-primary">
            ${product.precio.toFixed(2)}
          </p>
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
            Stock disponible
          </div>
        </div>

        {/* Botones de Acción - Nueva Jerarquía */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/30"
          >
            Al carrito
          </button>
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full rounded-xl border border-brand-muted/30 bg-transparent px-4 py-3 text-sm font-bold text-brand-text transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            Detalles
          </button>
        </div>
      </div>
    </motion.article>
  );
}