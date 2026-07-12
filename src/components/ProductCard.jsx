import { motion } from 'framer-motion';

function truncateDescription(description) {
  if (description.length <= 120) {
    return description;
  }
  return `${description.slice(0, 117)}...`;
}

export function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-brand-muted/10 bg-brand-surface shadow-sm transition-all hover:border-brand-primary/20 hover:shadow-md">
      
      {/* Contenedor de imagen de altura fija */}
      <div 
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden sm:aspect-square"
        onClick={onViewDetails}
      >
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Badge flotante compacto */}
        <div className="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-green-600 backdrop-blur-md sm:text-[10px]">
          Stock
        </div>
      </div>

      {/* Información compacta */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted sm:text-[10px]">
          {product.categoria.replace('_', ' ')}
        </p>
        
        <h3 
          className="mt-1 line-clamp-2 cursor-pointer text-xs font-bold leading-tight text-brand-text sm:text-sm"
          onClick={onViewDetails}
        >
          {product.nombre}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-sm font-black text-brand-primary sm:text-lg">
            ${product.precio.toFixed(2)}
          </p>
          
          {/* Botón dinámico: Icono en móvil, Texto en Desktop */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }} 
            // Cambiamos transition-transform por transition-all y agregamos la elevación y la sombra brillante
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary text-white shadow-sm transition-all hover:-translate-y-1 hover:bg-brand-primary hover:text-white hover:shadow-md hover:shadow-brand-primary/30 sm:h-10 sm:w-auto sm:px-4"
            aria-label="Añadir al carrito"
          >
            <span className="hidden text-sm font-bold sm:inline">Agregar</span>
            <svg className="h-4 w-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}