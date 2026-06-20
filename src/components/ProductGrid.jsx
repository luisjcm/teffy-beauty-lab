import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard.jsx';

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

export function ProductGrid({ products, onAddToCart, onViewDetails }) {
  return (
    <section id="catalogo-productos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-400">Catálogo</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Productos pensados para un look de alto impacto.
          </h2>
        </div>
        <p className="max-w-2xl  leading-7 text-zinc-400 sm:text-base">
          Una selección curada con tarjetas animadas, acciones directas y una experiencia visual más limpia que la versión vanilla.
        </p>
      </div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </section>
  );
}
