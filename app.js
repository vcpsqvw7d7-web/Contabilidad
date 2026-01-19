let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

function guardar() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("ventas", JSON.stringify(ventas));
}

function agregarCliente() {
  const input = document.getElementById("clienteNombre");
  const nombre = input.value.trim();

  if (!nombre || clientes.includes(nombre)) return;

  clientes.push(nombre);
  input.value = "";
  guardar();
  mostrar();
}

function agregarProducto() {
  const nombre = document.getElementById("productoNombre").value.trim();
  const precio = Number(document.getElementById("productoPrecio").value);
  const costo = Number(document.getElementById("productoCosto").value);

  if (!nombre || precio <= 0 || costo < 0) return;
  if (productos.find(p => p.nombre === nombre)) return;

  productos.push({ nombre, precio, costo });

  document.getElementById("productoNombre").value = "";
  document.getElementById("productoPrecio").value = "";
  document.getElementById("productoCosto").value = "";

  guardar();
  mostrar();
}

function agregarVenta() {
  if (clientes.length === 0 || productos.length === 0) return;

  const cliente = document.getElementById("ventaCliente").value;
  const productoNombre = document.getElementById("ventaProducto").value;
  const cantidad = Number(document.getElementById("ventaCantidad").value);
  let fecha = document.getElementById("ventaFecha").value;

  if (cantidad <= 0) return;
  if (!fecha) {
    fecha = new Date().toISOString().split("T")[0];
  }

  const producto = productos.find(p => p.nombre === productoNombre);
  if (!producto) return;

  ventas.push({
    cliente,
    producto: producto.nombre,
    cantidad,
    ingreso: producto.precio * cantidad,
    costo: producto.costo * cantidad,
    fecha
  });

  document.getElementById("ventaCantidad").value = "";
  document.getElementById("ventaFecha").value = "";

  guardar();
  mostrar();
}

function mostrar() {
  document.getElementById("listaClientes").innerHTML =
    clientes.map(c => `<li>${c}</li>`).join("");

  document.getElementById("listaProductos").innerHTML =
    productos.map(p =>
      `<li>${p.nombre} | Venta $${p.precio} | Costo $${p.costo}</li>`
    ).join("");

  document.getElementById("listaVentas").innerHTML =
    ventas.map(v =>
      `<li>
        ${v.fecha} — ${v.cliente} compró ${v.cantidad} ${v.producto}
        | Ingreso $${v.ingreso}
        | Costo $${v.costo}
        | Utilidad $${v.ingreso - v.costo}
      </li>`
    ).join("");

  const totalIngresos = ventas.reduce((s, v) => s + v.ingreso, 0);
  const totalCostos = ventas.reduce((s, v) => s + v.costo, 0);

  document.getElementById("resumen").innerHTML = `
    Total ingresos: $${totalIngresos}<br>
    Total costos: $${totalCostos}<br>
    <strong>Utilidad: $${totalIngresos - totalCostos}</strong>
  `;

  document.getElementById("ventaCliente").innerHTML =
    clientes.map(c => `<option value="${c}">${c}</option>`).join("");

  document.getElementById("ventaProducto").innerHTML =
    productos.map(p => `<option value="${p.nombre}">${p.nombre}</option>`).join("");
}

mostrar();
