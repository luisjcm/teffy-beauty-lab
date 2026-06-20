import { AnimatePresence, motion } from 'framer-motion';

export function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          /* Se eliminó translate-x y se reemplazó con left-0 right-0 mx-auto w-max */
          className="fixed bottom-6 left-0 right-0 z-50 mx-auto flex w-max max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/90 p-4 text-zinc-100 shadow-xl backdrop-blur-sm sm:bottom-10 sm:min-w-[320px] sm:max-w-md"
          aria-live="polite"
        >
          <div className="flex w-full items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
              <span className="text-sm font-black">✓</span>
            </div>
            <p className="text-xs font-semibold leading-6 text-zinc-100">{toast.message}</p>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-full px-2 py-1 text-zinc-400 transition hover:text-white"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}