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
  });
});

// Users
const usersList = document.querySelector("#users");
// recibe una lista de datos
const setupUsers = (data) => {
  // si la lista tiene datos, entonces recorrerlos
  if (data.length) {
    let html = "";
    // por cada documento que este dentro de la lista agrega al html
    data.forEach((doc) => {
      const user = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${user.name}</h5>
        <p>${user.mail}</p>
        </li>
      `;
      html += li;
    });
    usersList.innerHTML = html;
  } else {
    usersList.innerHTML = "<p>Logueate para ver los usuarios</p>";
  }
};

// List for auth state changes
auth.onAuthStateChanged((user) => {
  // si el objeto user existe significa que el usuario esta logueado
  if (user) {
    // si el usurario esta autenticado has una consulta a la coleccion 'user'
    fs.collection("users")
      .get()
      // una vez que obtenga los datos, mostrar el estado actual
      .then((snapshot) => {
        // console.log(snapshot.docs);
        setupUsers(snapshot.docs);
      });
  } else {
    setupUsers([]);
    setTimeout(() => {
      window.location = "http://127.0.0.1:5500/login.html";
    }, 3000);
  }
});

//Entidades
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
    console.log(this.restante);
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
  agregarGastoListado(gastos) {
    //Elimina el Html
    this.limpiarHtml();
    //  iterando sobre los gastos
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      //Creo un nuevo LI
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;

      //Agrego el Html del gasto
      nuevoGasto.innerHTML = `
      ${nombre}<span class="badge badge-primary badge-pill p-2"> $ ${cantidad}</span>`;

      //Boton para borrar el gasto
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "borrar-gasto");
      deleteButton.innerHTML = "borrar &times";
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

function agregarGasto(e) {
  e.preventDefault();

  //Leyendo los datos del form
  const nombre = document.getElementById("gasto").value;
  const cantidad = Number(document.getElementById("cantidad").value);

  //Validacion
  if (nombre === "" || cantidad === "") {
    ui.mostrarAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarAlerta("Cantidad no válida", "error");
    return;
  }
  //Nuevo Object Gasto
  const gasto = { nombre, cantidad, id: Date.now() };

  //Nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //Mensaje de que se guardo correctamente
  ui.mostrarAlerta("Gasto agregado correctamente");

  //Imprimir los gastos
  const { gastos, restante } = presupuesto;
  ui.agregarGastoListado(gastos);
  ui.actualizarRestante(restante);

  //Reset del form
  formulario.reset();
}
