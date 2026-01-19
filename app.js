let clientes = [];
let productos = [];
let ventas = [];
let gastos = [];

// CLIENTES
function agregarCliente() {
  const nombre = clienteNombre.value.trim();
  if (!nombre || clientes.includes(nombre)) return;
  clientes.push(nombre);
  clienteNombre.value = "";
  actualizarClientes();
}

function actualizarClientes() {
  listaClientes.innerHTML = "";
  ventaCliente.innerHTML = "";
  clientes.forEach(c => {
    listaClientes.innerHTML += `<li>${c}</li>`;
    ventaCliente.innerHTML += `<option>${c}</option>`;
  });
}

// PRODUCTOS
function agregarProducto() {
  const nombre = productoNombre.value.trim();
  const precio = Number(productoPrecio.value);
  if (!nombre || precio <= 0) return;

  let producto = productos.find(p => p.nombre === nombre);
  if (producto) {
    producto.precio = precio;
  } else {
    productos.push({ nombre, precio });
  }

  productoNombre.value = "";
  productoPrecio.value = "";
  actualizarProductos();
}

function actualizarProductos() {
  listaProductos.innerHTML = "";
  ventaProducto.innerHTML = "";
  productos.forEach(p => {
    listaProductos.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
    ventaProducto.innerHTML += `<option>${p.nombre}</option>`;
  });
}

// VENTAS
function registrarVenta() {
  ventas.push({
    cliente: ventaCliente.value,
    producto: ventaProducto.value,
    cantidad: Number(ventaCantidad.value),
    fecha: ventaFecha.value
  });
  actualizarVentas();
}

function actualizarVentas() {
  listaVentas.innerHTML = "";
  ventas.forEach(v => {
    listaVentas.innerHTML += `<li>${v.fecha} - ${v.cliente} - ${v.producto} x${v.cantidad}</li>`;
  });
}

// GASTOS
function registrarGasto() {
  gastos.push({
    descripcion: gastoDescripcion.value,
    monto: Number(gastoMonto.value),
    fecha: gastoFecha.value
  });
  actualizarGastos();
}

function actualizarGastos() {
  listaGastos.innerHTML = "";
  gastos.forEach(g => {
    listaGastos.innerHTML += `<li>${g.fecha} - ${g.descripcion} $${g.monto}</li>`;
  });
}
