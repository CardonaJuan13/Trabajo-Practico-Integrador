const contenedorCarrito = document.getElementById('contenedor-carrito');
const totalPrecioElemento = document.getElementById('total-precio');

function formatearPrecio(numero) {
  return new Intl.NumberFormat('es-AR', { 
    style: 'currency', 
    currency: 'ARS', 
    minimumFractionDigits: 0 
  }).format(numero);
}

function renderizarCarrito() {
  const productos = JSON.parse(localStorage.getItem('carrito')) || [];
  if (productos.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="carrito-vacio">
        <p>Tu carrito está vacío.</p>
      </div>
    `;
    totalPrecioElemento.textContent = formatearPrecio(0);
    return;
  }

  contenedorCarrito.innerHTML = ''; 
  let subtotal = 0;

  productos.forEach(producto => {
    subtotal += producto.price;
    const filaProducto = `
      <article class="item-carrito" id="prod-${producto.id}">
        <div class="info-producto">
          <img src="${producto.pictures[0]}" class="mini-imagen" alt="${producto.title}">
          <div class="detalles-texto">
            <h3 class="nombre-producto">${producto.title}</h3>
            <p class="categoria-producto">${producto.category}</p>
          </div>
        </div>
        <div class="acciones-producto">
          <p class="precio">${formatearPrecio(producto.price)}</p>
          <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')" title="Eliminar producto">✕</button>
        </div>
      </article>
    `;
    
    contenedorCarrito.innerHTML += filaProducto;
  });
  totalPrecioElemento.textContent = formatearPrecio(subtotal);
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.id !== Number(id));
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
}
document.addEventListener('DOMContentLoaded', renderizarCarrito);