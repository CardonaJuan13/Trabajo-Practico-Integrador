const endpoint = "../data/api.json";
const contenedorAccesorios = document.querySelector("#section-accesorios");
const mensajeAccesorios = document.querySelector("#mensaje-accesorios");
const contenedorComponentes = document.querySelector("#section-componentes");
const mensajeComponentes = document.querySelector("#mensaje-componentes");
const contenedorNotebooks = document.querySelector("#section-notebooks");
const mensajeNotebooks = document.querySelector("#mensaje-notebooks");
const contenedorMultimedia = document.querySelector("#section-multimedia");
const mensajeMultimedia = document.querySelector("#mensaje-multimedia");

function crearCardProducto(producto) {
 const imagen = producto.pictures && producto.pictures.length > 0
        ? producto.pictures[0]
        : "./img/placeholder.jpg";
 return `
       <div class="card">
      <img src="${imagen}" alt="${producto.title}">
      <h2>${producto.title}</h2>
      <p>${producto.description}</p>
      <p class="precio">$${producto.price}</p>
      <a class="btn detalle" href="./${detalleMap[producto.id]}">Ver detalles</a>
      <button class="btn btn-primary btn-agregar-detalle mb-4" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>
 `;

}
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
function renderizarProductos(productos, contenedor, mensaje) {
 contenedor.innerHTML = "";
 mensaje.textContent = "";
if (productos.length === 0) {
        mensaje.textContent = "No se encontraron productos.";
        return;
 }
 productos.forEach(producto => {
        contenedorAccesorios.innerHTML += crearCardProducto(producto);
 });
}
const detalleMap = {
       1: "detalle-kumara.html",
       2: "detalle-g203.html",
       3: "detalle-HyperX.html",
       4: "detalle-AuriAsusRog.html",
};

function irADetalle(idProducto) {
  const url = detalleMap[idProducto];
  if (!url) return;
  window.location.href = url;
}

async function obtenerProductos() {
    try {
        mensajeAccesorios.textContent = "Cargando productos...";
        mensajeComponentes.textContent = "Cargando componentes...";
        mensajeNotebooks.textContent = "Cargando notebooks...";
        mensajeMultimedia.textContent = "Cargando multimedia...";
        const response = await fetch(endpoint, {
        headers: { "accept": "api.json" }
});
if (!response.ok) {
        throw new Error("No se pudo obtener la información.");
}
    const data = await response.json();
    console.log(response);
    console.log(data);

    const accesorios = data.filter(p => p.category === "Accesorios")
    const componentes = data.filter(p => p.category === "Componentes")
    const notebooks = data.filter(p=> p.category === "Notebooks")
    const multimedia = data.filter(p=> p.category === "Multimedia")

    renderizarProductos(accesorios, contenedorAccesorios, mensajeAccesorios);
    renderizarProductos(componentes,contenedorComponentes,mensajeComponentes);
    renderizarProductos(notebooks,contenedorNotebooks,mensajeNotebooks);
    renderizarProductos(multimedia, contenedorMultimedia,mensajeMultimedia);
} catch (error) {
       mensajeAccesorios.textContent = "No se pudieron cargar los accesorios.";
       mensajeComponentes.textContent = "No se pudieron cargar los componentes";
       mensajeNotebooks.textContent = "No se pudieorn cargar las notebooks";
       mensajeMultimedia.textContent = "No se pudo cargar el Multimedia";
    console.error(error);
 }
}
obtenerProductos();