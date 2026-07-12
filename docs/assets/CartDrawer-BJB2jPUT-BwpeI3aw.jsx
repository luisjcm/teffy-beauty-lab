import { AnimatePresence, motion } from 'framer-motion';

export function CartDrawer({
  open,
  cartItems,
  cartTotal,
  cartCount,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onSendWhatsApp,
  onSendEmail
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950/85 p-6 text-zinc-100 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-text">Carrito</p>
                <h3 className="mt-2 text-2xl font-black text-white">Tu Drawer</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl font-bold text-zinc-100 transition hover:bg-white/10"
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-5">
              {cartItems.length > 0 ? (
                <ul className="space-y-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">{item.nombre}</p>
                        <p className="mt-1 text-sm text-zinc-400">
                          ${item.precio.toFixed(2)} · Cantidad: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-bold text-rose-400">
                          ${ (item.precio * item.quantity).toFixed(2) }
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onDecrease(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-zinc-100 transition hover:bg-white/10"
                          aria-label={`Disminuir cantidad de ${item.nombre}`}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => onIncrease(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-zinc-100 transition hover:bg-white/10"
                          aria-label={`Aumentar cantidad de ${item.nombre}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-lg font-bold text-rose-400 transition-colors hover:bg-rose-500 hover:text-white"
                          aria-label={`Eliminar ${item.nombre}`}
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-zinc-400">
                  Tu carrito está vacío. Agrega productos desde el catálogo para ver el drawer en acción.
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <span>Productos</span>
                <span className="font-semibold text-zinc-100">{cartCount}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-text">Total</span>
                <span className="text-2xl font-black text-rose-400">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="flex-1 rounded-xl bg-green-500 px-4 py-3 font-bold text-white transition-colors hover:bg-green-600"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onSendEmail}
                  className="flex-1 rounded-xl bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600"
                >
                  Email
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
