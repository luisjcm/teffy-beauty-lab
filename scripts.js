document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agrega estos event listeners al final del DOMContentLoaded
document.getElementById('cart-fab-button').addEventListener('click', () => {
    document.getElementById('cart-fab-content').classList.add('show');
});

document.getElementById('close-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('cart-fab-content').classList.remove('show');
});



    // Función para actualizar el carrito en la UI
    function actualizarCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
        const carritoContador = document.getElementById('carrito-contador');
        
        // Limpiar items anteriores
        carritoItems.innerHTML = '';
        
        // Calcular total y agregar items
        let total = 0;
        let totalItems = 0; // Variable para contar todos los items

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            totalItems += item.cantidad; // Sumamos la cantidad de cada producto

            
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                <strong>${item.nombre}</strong><br>
                x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
            </div>
            <button class="eliminar-item" data-index="${index}">×</button>
            `;
            carritoItems.appendChild(li);
        });
        
        // Actualizar total y contador
        carritoTotal.textContent = total.toFixed(2);
        carritoContador.textContent = totalItems; // Mostrar la cantidad total
        
 // Mostrar/ocultar contador según haya items
    if (totalItems > 0) {
        carritoContador.style.display = 'flex';
    } else {
        carritoContador.style.display = 'none';
    }

        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para agregar producto al carrito
    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        actualizarCarrito();
        
        // Mostrar notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${producto.nombre} agregado al carrito`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

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
                        <button class="btn-add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
                        <button class="btn-view-details">Ver Detalles</button>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            // Agregar event listeners a los botones
            document.querySelectorAll('.btn-add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const producto = productos.find(p => p.id == productId);
                    agregarAlCarrito(producto);
                });
            });

        } catch (error) {
            console.error('Error al cargar productos:', error);
            productsContainer.innerHTML = '<p>No se pudieron cargar los productos. Intenta más tarde.</p>';
        }
    }

    // Event listener para el botón de WhatsApp
    document.getElementById('enviar-whatsapp').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        let mensaje = 'Hola, quiero realizar este pedido:%0A%0A';
        let total = 0;
        
        carrito.forEach(item => {
            mensaje += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
            total += item.precio * item.cantidad;
        });
        
        mensaje += `%0ATotal: $${total.toFixed(2)}`;
        
        window.open(`https://wa.me/?text=${mensaje}`, '_blank');
    });

    function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    
    // Mostrar notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${producto.nombre} agregado al carrito`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

    // Event delegation para eliminar items del carrito
    document.getElementById('carrito-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-item')) {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    // Mostrar notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Producto eliminado del carrito';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    // Cargar productos y carrito al iniciar
    loadProducts();
    actualizarCarrito();
});