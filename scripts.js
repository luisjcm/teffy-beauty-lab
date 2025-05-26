document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    document.getElementById('cart-fab-button').addEventListener('click', () => {
        document.getElementById('cart-fab-content').classList.add('show');
    });

    document.getElementById('close-cart').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('cart-fab-content').classList.remove('show');
    });

    function actualizarCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
        const carritoContador = document.getElementById('cart-fab-count');

        carritoItems.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            totalItems += item.cantidad;

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

        carritoTotal.textContent = total.toFixed(2);
        carritoContador.textContent = totalItems;
        carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);

        const fabButton = document.getElementById('cart-fab-button');
        fabButton.classList.add('shake');
        setTimeout(() => fabButton.classList.remove('shake'), 400);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarCarrito();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${producto.nombre} agregado al carrito`;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 2000);
    }

    async function loadProducts() {
        try {
            const response = await fetch('productos.json');
            const productos = await response.json();
            productsContainer.innerHTML = '';

            productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="product-price">$${producto.precio.toFixed(2)}</p>
                        <button class="btn-add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
                        <button class="btn-view-details"
                            data-id="${producto.id}"
                            data-nombre="${producto.nombre}"
                            data-imagen="${producto.imagen}"
                            data-descripcion="${producto.descripcion}"
                            data-precio="${producto.precio}">Ver Detalles</button>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            document.querySelectorAll('.btn-add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const producto = productos.find(p => p.id == productId);
                    agregarAlCarrito(producto);
                });
            });

            document.querySelectorAll('.btn-view-details').forEach(button => {
                button.addEventListener('click', () => {
                    const nombre = button.getAttribute('data-nombre');
                    const imagen = button.getAttribute('data-imagen');
                    const descripcion = button.getAttribute('data-descripcion');
                    const precio = button.getAttribute('data-precio');
                    const id = button.getAttribute('data-id');

                    document.getElementById('modal-title').textContent = nombre;
                    document.getElementById('modal-image').src = imagen;
                    document.getElementById('modal-description').textContent = descripcion;
                    document.getElementById('modal-price').textContent = parseFloat(precio).toFixed(2);
                    document.getElementById('modal-add-to-cart').setAttribute('data-id', id);

                    document.getElementById('product-modal').style.display = 'flex';
                });
            });

        } catch (error) {
            console.error('Error al cargar productos:', error);
            productsContainer.innerHTML = '<p>No se pudieron cargar los productos. Intenta más tarde.</p>';
        }
    }

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

        // Número de destino en formato internacional sin signos
    const numero = '584126099909';
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
    });

    document.getElementById('enviar-email').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        let mensaje = 'Hola, quisiera realizar este pedido:\n\n';
        let total = 0;

        carrito.forEach(item => {
            mensaje += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
            total += item.precio * item.cantidad;
        });

        mensaje += `\nTotal: $${total.toFixed(2)}`;
        const asunto = encodeURIComponent("Pedido desde Teffy's");
        const cuerpo = encodeURIComponent(mensaje);
        window.open(`mailto:ventasteffy25@gmail.com?subject=${asunto}&body=${cuerpo}`, '_blank');
    });

    document.getElementById('carrito-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-item')) {
            const index = e.target.getAttribute('data-index');
            const productoEliminado = carrito[index];
            carrito.splice(index, 1);
            actualizarCarrito();

            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${productoEliminado.nombre} eliminado del carrito`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 2000);
        }
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('product-modal').style.display = 'none';
    });

    document.getElementById('modal-add-to-cart').addEventListener('click', () => {
        const id = document.getElementById('modal-add-to-cart').getAttribute('data-id');
        fetch('productos.json')
            .then(res => res.json())
            .then(productos => {
                const producto = productos.find(p => p.id == id);
                if (producto) agregarAlCarrito(producto);
                document.getElementById('product-modal').style.display = 'none';
            });
    });

    // ✅ Botón "Enviar Pedido" con menú desplegable
    const enviarOpciones = document.getElementById('enviar-opciones');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (enviarOpciones && dropdownMenu) {
        enviarOpciones.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!enviarOpciones.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.add('dropdown-hidden');
            }
        });
    }

    loadProducts();
    actualizarCarrito();
});
