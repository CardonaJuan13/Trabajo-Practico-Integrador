function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const yaExiste = carrito.some(producto => producto.id === idProducto);

    if (yaExiste) {
        alert("Este producto ya se encuentra en tu carrito de compras.");
        return;
    }

    fetch('../data/api.json')
        .then(response => response.json())
        .then(productos => {
            const productoEncontrado = productos.find(p => p.id === idProducto);

            if (productoEncontrado) {
                carrito.push(productoEncontrado);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                
                alert(`¡${productoEncontrado.title} ha sido agregado al carrito con éxito!`);
            }
        })
        .catch(error => {
            console.error("Error al conectarse a la API e intentar añadir el producto:", error);
            alert("No se pudo agregar el producto. Inténtalo de nuevo más tarde.");
        });
}