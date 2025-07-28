
import { obtenerProductos } from '../js/productos.js';

document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('productos')) || [];
    let precioTotal = parseFloat(localStorage.getItem('total')) || 0;

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let btnclick = card.querySelector('button');
        const productTitle = card.querySelector('h3').textContent;
        const productPriceText = card.querySelector('p').textContent.replace('$', '');
        const productPrice = parseFloat(productPriceText);

        btnclick.addEventListener('click', () => {
            const index = carrito.findIndex(item => item.title === productTitle);

            if (index !== -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push({
                    title: productTitle,
                    price: productPrice,
                    cantidad: 1
                });
            }

            precioTotal += productPrice;
            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('total', precioTotal);

            const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            document.querySelector('.count').innerText = totalItems;
        });
    });
     // --- BOTONES "VER DESCRIPCIÓN" ---
    const productos = obtenerProductos();
    const btnsDescripcion = document.querySelectorAll('.btn-descripcion');

    btnsDescripcion.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) {
                localStorage.setItem('descripcionProducto', JSON.stringify(producto));
                window.location.href = './pages/productos.html';
            }
        });
    });

    // Mostrar contador al recargar
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelector('.count').innerText = totalItems;
});
