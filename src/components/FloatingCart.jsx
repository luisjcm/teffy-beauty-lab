import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCart({ cartCount, onOpenCart }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenCart}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/40 transition-colors hover:bg-brand-primary/90 sm:bottom-8 sm:right-8"
          aria-label="Abrir carrito"
        >
          {/* Icono de Carrito SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>

          {/* Burbuja con el número de productos */}
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-surface bg-brand-text text-xs font-bold text-brand-surface"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}