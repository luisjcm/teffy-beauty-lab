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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl">
            Cuidado personal premium
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Belleza cotidiana con una estética{' '}
            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
              elegante y moderna
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Descubre un e-commerce renovado con navegación fluida, tarjetas animadas y una experiencia de compra más limpia, visual y premium.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBrowseProducts}
              className="rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-6 py-3 font-bold text-zinc-950 shadow-2xl shadow-rose-500/20 transition hover:scale-[1.02]"
            >
              Explorar catálogo
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-zinc-100 backdrop-blur-xl transition hover:border-rose-400/30 hover:bg-white/10"
            >
              Ver carrito
            </button>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm text-zinc-400">Catálogo</p>
              <p className="mt-1 text-lg font-bold text-white">9 productos</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm text-zinc-400">Entrega</p>
              <p className="mt-1 text-lg font-bold text-white">Rápida</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm text-zinc-400">Estilo</p>
              <p className="mt-1 text-lg font-bold text-white">Premium</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
