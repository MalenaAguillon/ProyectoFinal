
function handleCart(){
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    const total = localStorage.getItem('total') || 0;

    const carritoContainer = document.getElementById('item-products');

    if(carrito.length === 0){
        carritoContainer.innerHTML='<p>No hay productos en el carrito.</p>';
        return;
    }

    let tabla = document.createElement('table');
    tabla.classList.add('table');

    let encabezado =  `
    <thead>
        <tr>
            <th>Producto</th>

            <th>Cantidad</th>

            <th>Precio</th>
        </tr>
    </thead>
    `;
    let cuerpo= '<tbody>';
    carrito.forEach(producto =>{
        cuerpo += `
        <tr>
            <td>${producto.title}</td>

            <td>${producto.cantidad}</td>
            
            <td>${producto.price}</td>
        </tr>
        `;
    });
    cuerpo += '</tbody>';
    tabla.innerHTML = encabezado + cuerpo;
    carritoContainer.appendChild(tabla);
    let precioFinal = document.createElement('p')
    precioFinal.innerText = `Total a pagar : $${total}`;

    carritoContainer.appendChild(precioFinal);

    let finalizarCompra = document.createElement('button');
    

}
function limpiarCarrito(){
    if (confirm("¿Estas seguro de que deseas vaciar el carrito?")){
        localStorage.removeItem('productos');
        localStorage.removeItem('total');

        const carritoContainer = document.getElementById('item-products');
        carritoContainer.innerHTML = '';
        document.querySelector('.count').innerText = '0';
    }
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = totalItems;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    handleCart();
    actualizarContadorCarrito();
});

