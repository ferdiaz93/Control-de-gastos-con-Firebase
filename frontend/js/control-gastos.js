const logout = document.getElementById("logout");
const formulario = document.getElementById("agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

// Events

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", agregarGasto);
}

logout.addEventListener("click", (e) => {
  e.preventDefault();
  // Si el cierre de la autenticacion ha sido correcto entonces que se muestre por consola 'sign out'
  auth.signOut().then(() => {
    console.log("sign out");
    setTimeout(() => {
      window.location = "http://127.0.0.1:5500/frontend/login.html";
    }, 3000);
  });
});

//ENTIDADES
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }
  calcularRestante() {
    const dineroGastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    this.restante = this.presupuesto - dineroGastado;
  }
  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id != id);
    this.calcularRestante();
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    //Leyendo valores
    const { presupuesto, restante } = cantidad;

    //Agregando al HTML
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }

  // Mostrar alerta
  mostrarAlerta(mensaje, tipo) {
    //Crea un nuevo Div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    //Mensaje de error
    divMensaje.textContent = mensaje;

    //Insertando mensaje en el HTML
    document.querySelector(".primario").insertBefore(divMensaje, formulario);
    //Borrar el msj
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
  mostrarGastos(gastos) {
    //Elimina el Html
    this.limpiarHtml();
    //  iterando sobre los gastos
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id, fecha } = gasto;

      //Creo un nuevo LI
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;

      //Agrego el Html del gasto
      nuevoGasto.innerHTML = `
      ${nombre}<span class="badge badge-primary badge-pill p-2"> $ ${cantidad}</span> ${fecha}`;

      //Boton para borrar el gasto
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "borrar-gasto");
      deleteButton.innerHTML = "borrar &times";
      deleteButton.onclick = () => {
        eliminarGasto(id);
      };
      nuevoGasto.appendChild(deleteButton);

      //Agregar al Html
      gastoListado.appendChild(nuevoGasto);
    });
  }
  limpiarHtml() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }
  actualizarRestante(restante) {
    document.querySelector("#restante").textContent = restante;
  }
  comprobarPresupuesto(presupuestoObject) {
    const { presupuesto, restante } = presupuestoObject;

    const restanteDiv = document.querySelector(".restante");
    //Comprobando el %25 del presupuesto
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-danger");
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.remove("alert-danger", "alert-warning");
      restanteDiv.classList.add("alert-success");
    }

    //Si el total es 0 o menor
    if (restante <= 0) {
      ui.mostrarAlerta("El presupuesto se ha agotado", "error");
      formulario.querySelector('button[type="submit"]').disabled = true;
      restante = 0;
    }
  }
}

//Instanciar
const ui = new UI();
let presupuesto;

//FUNCIONES

function preguntarPresupuesto() {
  const presupuestoUser = prompt("¿Cuál es tu presupuesto?");

  if (
    presupuestoUser === "" ||
    presupuestoUser === null ||
    isNaN(presupuestoUser) ||
    presupuestoUser <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUser);
  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

async function agregarGasto(e) {
  e.preventDefault();

  //Leyendo los datos del form
  const nombre = document.getElementById("gasto").value;
  const cantidad = Number(document.getElementById("cantidad").value);
  const fecha = document.getElementById("fecha").value;

  //Validacion
  if (nombre === "" || cantidad === "" || fecha === "") {
    ui.mostrarAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarAlerta("Cantidad no válida", "error");
    return;
  }
  //Nuevo Object Gasto
  const gasto = { nombre, cantidad, id: Date.now(), fecha };

  //Request 
  await fetch('http://localhost:8000/gastos', {
    method: 'POST',
    body: JSON.stringify({
      nombre,
      cantidad,
      fecha
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  //Nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //Mensaje de que se guardo correctamente
  ui.mostrarAlerta("Gasto agregado correctamente");

  //Imprimir los gastos
  const { gastos, restante } = presupuesto;

  ui.mostrarGastos(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);
  //Reset del form
  formulario.reset();
}
//Funcion que elimina los gastos
function eliminarGasto(id) {
  //Elimina del objeto
  presupuesto.eliminarGasto(id);

  //Elimina los gastos del HTML
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);
}
