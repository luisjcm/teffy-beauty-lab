import { AnimatePresence, motion } from 'framer-motion';

export function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-24 left-1/2 z-[100] flex w-max max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-2xl border border-brand-muted/20 bg-brand-surface px-4 py-3 shadow-2xl shadow-brand-muted/20 sm:bottom-10"
        >
          {/* Icono dinámico según el tipo de mensaje */}
          <div 
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
              toast.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
            }`}
          >
            {toast.type === 'error' ? (
              <span className="text-lg font-black">!</span>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          <p className="text-sm font-bold text-brand-text">{toast.message}</p>

          <button
            onClick={onClose}
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-muted/10 hover:text-brand-text"
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}