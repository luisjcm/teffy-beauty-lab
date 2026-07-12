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
          className="fixed inset-0 z-50 bg-brand-text/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="ml-auto flex h-full w-full max-w-md flex-col border-l border-brand-muted/20 bg-brand-backgroundSoft p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Cabecera del Drawer */}
            <div className="flex items-center justify-between gap-4 border-b border-brand-text/20 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">Tu pedido</p>
                <h3 className="mt-1 text-2xl font-black text-brand-text">Resumen de Carrito</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-surface text-xl font-bold text-brand-text shadow-sm ring-1 ring-inset ring-brand-muted/20 transition hover:bg-brand-muted/10 hover:text-brand-primary"
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto py-5">
  {cartItems.length > 0 ? (
    <ul className="space-y-4">
      {cartItems.map((item) => (
       
         <li
  key={item.id}
  className="group flex items-center gap-3 rounded-2xl border border-brand-muted/10 bg-brand-surface p-3 shadow-sm transition-all sm:gap-4 sm:p-4"
>
  {/* Info central optimizada */}
  <div className="min-w-0 flex-1">
    <p className="font-bold leading-tight text-brand-text line-clamp-1 sm:text-base text-sm">
      {item.nombre}
    </p>
    <p className="mt-0.5 text-[10px] font-medium text-brand-muted sm:text-xs">
      ${item.precio.toFixed(2)} c/u
    </p>
    
    {/* Controles compactos */}
    <div className="mt-2 flex items-center rounded-lg border border-brand-muted/20 bg-brand-background w-max">
      <button
        type="button"
        onClick={() => onDecrease(item.id)}
        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center text-sm font-bold text-brand-text transition hover:text-brand-primary active:bg-brand-muted/10"
      >
        -
      </button>
      <span className="w-6 text-center text-xs font-bold text-brand-text sm:w-8">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => onIncrease(item.id)}
        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center text-sm font-bold text-brand-text transition hover:text-brand-primary active:bg-brand-muted/10"
      >
        +
      </button>
    </div>
  </div>

  {/* Totales y acción alineados a la derecha */}
  <div className="flex flex-col items-end justify-between self-stretch">
    <button
      type="button"
      onClick={() => onRemove(item.id)}
      className="text-[10px] font-bold text-brand-muted transition-colors hover:text-red-500 sm:text-xs"
      aria-label="Eliminar"
    >
      ✕
    </button>
    <p className="text-sm font-black text-brand-primary sm:text-base">
      ${(item.precio * item.quantity).toFixed(2)}
    </p>
  </div>
</li>
       
      ))}
    </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-dashed border-brand-muted/30 bg-brand-surface p-8 text-center">
                  <span className="text-4xl">🛍️</span>
                  <p className="font-semibold text-brand-text">Tu carrito está vacío</p>
                  <p className="text-sm text-brand-muted">
                    Agrega productos desde el catálogo para ver tu resumen aquí.
                  </p>
                </div>
              )}
            </div>

            {/* Footer de Totales y Checkouts */}
            <div className="border-t border-brand-text/20 pt-5 bg-brand-backgroundSoft">
              <div className="flex items-center justify-between text-sm text-brand-text">
                <span>Total de artículos</span>
                <span className="font-bold text-brand-text">{cartCount}</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text">Total a Pagar</span>
                <span className="text-3xl font-black text-brand-primary">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#128C7E] hover:shadow-xl hover:shadow-[#25D366]/30"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  Pedir por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onSendEmail}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-surface px-4 py-3 text-sm font-bold text-brand-text shadow-sm ring-1 ring-inset ring-brand-muted/30 transition-all hover:bg-brand-muted/10"
                >
                  ✉️ Enviar por Email
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}