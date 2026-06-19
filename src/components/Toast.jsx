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
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-zinc-700 bg-zinc-800/95 p-4 text-zinc-100 shadow-2xl shadow-rose-500/10 backdrop-blur-md sm:right-8 sm:w-full"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
              <span className="text-lg font-black">✓</span>
            </div>
            <p className="text-sm font-semibold leading-6 text-zinc-100">{toast.message}</p>
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
