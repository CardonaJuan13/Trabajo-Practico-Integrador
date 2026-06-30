let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(id, nombre, precio) {

    const producto = carrito.find(p => p.id === id);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    renderCarrito();
}

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito();
    renderCarrito();
}

function renderCarrito() {

    const tbody = document.getElementById("carrito");
    tbody.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        tbody.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio}</td>
                <td>$${subtotal}</td>
                <td>
                    <button onclick="eliminarProducto(${producto.id})">
                        X
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").textContent =
        `Total: $${total}`;
}

function vaciarCarrito() {

    carrito = [];

    guardarCarrito();

    renderCarrito();
}

renderCarrito();
