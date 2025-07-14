
/*
document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];
    let precio = 0;
    let cards = document.querySelectorAll('.card');
    cards.forEach( card =>{

        let btnclick = card.querySelector('button');
        const productTitle= card.querySelector('h3').textContent;
        const productP= card.querySelector('p:last-child');
        const productPrice= productP ? productP.textContent.replace('Precio: $',''):'0';
        btnclick.addEventListener('click', () => {
            //console.log(card);
            const product = {
                title: productTitle,
                price: productPrice,//parseFloat(productPrice)
                cantidad: 1
            };
            carrito.push(product);
            precio += parseFloat(product.price);
            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('total',precio);

            document.querySelector('.count').innerText = carrito.length;
        });
    });
});
*/
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

    // Mostrar contador al recargar
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelector('.count').innerText = totalItems;
});
