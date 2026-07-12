import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { QuienesSomos } from './components/QuienesSomos.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { Footer } from './components/Footer.jsx';
import { Toast } from './components/Toast.jsx';
import { products } from './data/products.js';
import { FloatingCart } from './components/FloatingCart';

const storageKey = 'teffy-cart';
const whatsappNumber = '584126099909';

function getStoredCartEntries() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(storageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function buildMessage(cartItems) {
  let message = 'Hola, quiero realizar este pedido:\n\n';
  let total = 0;

  cartItems.forEach((item) => {
    message += `- ${item.nombre} x${item.quantity} - $${(item.precio * item.quantity).toFixed(2)}\n`;
    total += item.precio * item.quantity;
  });

  message += `\nTotal: $${total.toFixed(2)}`;
  return message;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartEntries, setCartEntries] = useState(() => getStoredCartEntries());
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  
  // 1. Nuevo Estado para el Buscador
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(cartEntries));
  }, [cartEntries]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  // 2. Nueva Lógica: Filtrado Dinámico de Productos
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter((product) => 
      product.nombre.toLowerCase().includes(query) ||
      (product.categoria && product.categoria.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const cartItems = useMemo(() => {
    return cartEntries
      .map((entry) => {
        const product = products.find((item) => item.id === entry.id);
        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: entry.quantity
        };
      })
      .filter(Boolean);
  }, [cartEntries]);

  const cartCount = useMemo(() => {
    return cartEntries.reduce((total, item) => total + item.quantity, 0);
  }, [cartEntries]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  }, [cartItems]);

  const navigateTo = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => !current);
  };

  const addToCart = (product) => {
    setToast({
      id: `${product.id}-${Date.now()}`,
      message: `¡${product.nombre} añadido al carrito!`,
      type: 'success'
    });

    setCartEntries((currentEntries) => {
      const existingEntry = currentEntries.find((entry) => entry.id === product.id);

      if (existingEntry) {
        return currentEntries.map((entry) => {
          if (entry.id === product.id) {
            return { ...entry, quantity: entry.quantity + 1 };
          }

          return entry;
        });
      }

      return [...currentEntries, { id: product.id, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartEntries((currentEntries) =>
      currentEntries.map((entry) => {
        if (entry.id === productId) {
          return { ...entry, quantity: entry.quantity + 1 };
        }

        return entry;
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartEntries((currentEntries) =>
      currentEntries
        .map((entry) => {
          if (entry.id === productId) {
            return { ...entry, quantity: entry.quantity - 1 };
          }

          return entry;
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== productId));
  };

  const sendWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      setToast({
        id: `empty-cart-${Date.now()}`,
        message: 'Tu carrito está vacío. Agrega productos primero.',
        type: 'error'
      });
      return;
    }

    const message = encodeURIComponent(buildMessage(cartItems));
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const sendEmailOrder = () => {
    if (cartItems.length === 0) {
      setToast({
        id: `empty-cart-${Date.now()}`,
        message: 'Tu carrito está vacío. Agrega productos primero.',
        type: 'error'
      });
      return;
    }

    const subject = encodeURIComponent("Pedido desde Teffy's");
    const body = encodeURIComponent(buildMessage(cartItems));
    window.open(`mailto:ventasteffy25@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    // 3. Limpieza de Clases del Contenedor Principal
<div className="relative flex min-h-screen flex-col overflow-x-hidden bg-brand-backgroundSoft text-brand-text transition-colors duration-300">      {/* 4. Eliminamos los Divs de manchas de luz (Glow) que ensucian el diseño claro */}

      <Header
        scrolled={scrolled}
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={navigateTo}
      />

      <main className="min-h-screen pb-24 lg:pb-10">
        <HeroSection
          onBrowseProducts={() => navigateTo('catalogo-productos')}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <QuienesSomos />

        {/* 5. Pasamos los productos filtrados y las funciones de búsqueda a la Grid */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={addToCart}
          onViewDetails={setSelectedProduct}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>

      <Footer />

      <Toast key={toast?.id} toast={toast} onClose={() => setToast(null)} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          addToCart(product);
          setSelectedProduct(null);
        }}
      />

      <CartDrawer
        open={isCartOpen}
        cartItems={cartItems}
        cartTotal={cartTotal}
        cartCount={cartCount}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onSendWhatsApp={sendWhatsAppOrder}
        onSendEmail={sendEmailOrder}
      />

      <FloatingCart 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
    </div>
  );
}