
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


function limpiarCarrito() {
    localStorage.removeItem('productos');
    localStorage.removeItem('total');

    const contador = document.getElementById('cart-count');
    if (contador) contador.innerText = '0';

    const carritoContainer = document.getElementById('item-products');
    if (carritoContainer) carritoContainer.innerHTML = '<p>Carrito vacío.</p>';
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

    const btnVaciar = document.getElementById('vaciarCarritoBtn');

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esto vaciará todo el carrito',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#A3685F',
                confirmButtonText: 'Sí, vaciar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    popup: 'rounded shadow-lg'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    limpiarCarrito();
                    Swal.fire({
                        title: '¡Carrito vacío!',
                        icon: 'success',
                        confirmButtonColor: '#A3685F',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        });
    }
});

function FinalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    const total = localStorage.getItem('total') || 0;

    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Tu carrito está vacío',
            confirmButtonColor: '#A3685F'
        });
        return;
    }

    let resumenHTML = '<ul style="text-align:left;">';
    carrito.forEach(producto => {
        resumenHTML += `<li><strong>${producto.title}</strong> x${producto.cantidad} - $${(producto.price * producto.cantidad).toLocaleString()}</li>`;
    });
    resumenHTML += `</ul><hr><p><strong>Total:</strong> $${parseFloat(total).toLocaleString()}</p>`;

    Swal.fire({
        title: '¿Confirmás tu compra?',
        html: resumenHTML,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#BC633E',
        cancelButtonColor: '#A3685F',
        customClass: {
            popup: 'rounded shadow-lg'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Gracias por tu compra!',
                html: resumenHTML,
                icon: 'success',
                confirmButtonColor: '#A3685F'
            });
            limpiarCarrito();
        }
    });
}
