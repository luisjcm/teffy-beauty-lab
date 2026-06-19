import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { QuienesSomos } from './components/QuienesSomos.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { Footer } from './components/Footer.jsx';
import { products } from './data/products.js';

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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => !current);
  };

  const addToCart = (product) => {
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
      window.alert('El carrito está vacío');
      return;
    }

    const message = encodeURIComponent(buildMessage(cartItems));
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const sendEmailOrder = () => {
    if (cartItems.length === 0) {
      window.alert('El carrito está vacío');
      return;
    }

    const subject = encodeURIComponent("Pedido desde Teffy's");
    const body = encodeURIComponent(buildMessage(cartItems));
    window.open(`mailto:ventasteffy25@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-900 text-zinc-100">
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <Header
        scrolled={scrolled}
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={navigateTo}
      />

      <main>
        <HeroSection
          onBrowseProducts={() => navigateTo('catalogo-productos')}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <QuienesSomos />

        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          onViewDetails={setSelectedProduct}
        />
      </main>

      <Footer />

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
    </div>
  );
}
