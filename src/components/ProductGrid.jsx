import { ProductCard } from './ProductCard.jsx';

export function ProductGrid({ products, onAddToCart, onViewDetails, searchQuery, setSearchQuery }) {
  return (
    <section id="catalogo-productos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-brand-backgroundSoft">
      
      {/* Encabezado y Buscador */}
<div className="mb-10 rounded-[2rem] border border-brand-muted/10 bg-brand-surface p-8 shadow-sm md:flex md:items-center md:justify-between md:gap-8">        
        {/* Textos del Catálogo */}
        <div className="max-w-2xl bg-brand-surface">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-primary">Catálogo</p>
          <h2 className="mt-3 text-3xl font-black text-brand-text sm:text-4xl">
            Productos pensados para un look de alto impacto.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-text">
            Una selección curada con acciones directas y una experiencia visual más limpia para tu rutina de belleza.
          </p>
        </div>

        {/* Barra de Búsqueda */}
        <div className="mt-10 w-full md:mt-0 md:w-72">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-full border border-brand-text/30 bg-brand-backgroundSoft py-2.5 pl-10 pr-4 text-sm text-brand-text shadow-sm transition placeholder:text-brand-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>
      </div>

      {/* Renderizado de Productos o Estado Vacío */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-brand-muted/30 bg-brand-surface py-20 text-center shadow-sm">
          <p className="text-lg font-medium text-brand-text">No encontramos productos</p>
          <p className="mt-1 text-sm text-brand-text">Intenta con otra palabra clave en el buscador.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              onViewDetails={() => onViewDetails(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}