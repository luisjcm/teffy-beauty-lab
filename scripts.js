document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    // Función para cargar y mostrar productos
    async function loadProducts() {
        try {
            const response = await fetch('productos.json');
            const productos = await response.json();

            productsContainer.innerHTML = ''; // Limpiar contenedor

            productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="product-price">$${producto.precio.toFixed(2)}</p>
                        <button class="btn-view-details">Ver Detalles</button>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

        } catch (error) {
            console.error('Error al cargar productos:', error);
            productsContainer.innerHTML = '<p>No se pudieron cargar los productos. Intenta más tarde.</p>';
        }
    }

    // Cargar productos al iniciar
    loadProducts();
});