//imports
import { getUser, deleteGasto, updateGastos, newGasto } from './requests.js';

//containers
const contenedorGastos = document.getElementById('contenedor-gastos');
const contenedorIngresos = document.getElementById('contenedor-ingresos');
const btnPerfil = document.getElementById('perfil');


//inputs
const inputPresupuesto = document.getElementById('input-presupuesto');
const inputCategoria = document.getElementById('select-categoria');
const inputNombreGasto = document.getElementById('input-nombre-gasto');
const inputCantidad = document.getElementById('input-cantidad');
const inputFecha = document.getElementById('input-fecha');

//forms
const formGasto = document.getElementById('form-gasto');
const formIngreso = document.getElementById('form-ingreso');
const formPresupuesto = document.getElementById('form-presupuesto');

//buttons
const btnAgregarGasto = document.getElementById('btnAgregarGasto');
const btnAgregarIngreso = document.getElementById('btnAgregarIngreso');
const btnEditarGasto = document.getElementById('btnEditarGasto');
const btnEditarIngreso = document.getElementById('btnEditarIngreso');
const btnCancelarEditarGasto = document.getElementById('btnCancelarEditarGasto');
const btnCancelarEditarIngreso = document.getElementById('btnCancelarEditarIngreso');

//User ID
const idUsuario = localStorage.getItem('idUsuario');


formGasto.addEventListener('submit', (e) => e.preventDefault());
formIngreso.addEventListener('submit', (e) => e.preventDefault());
btnAgregarGasto.addEventListener('click', (e) => agregarGasto(e));

getUser(idUsuario, (res) => {
  console.log("respuesta", res);
  mostrarGastos(res.gastos);
  mostrarIngresos(res.ingresos);
  insertarPresupuesto(res.usuario.presupuesto, res.usuario.restante);
  btnPerfil.innerText = res.usuario.email;
});

function mostrarGastos(gastos) {
  contenedorGastos.innerHTML = "";
  gastos.forEach(gasto => {
    contenedorGastos.innerHTML += `
      <li class='list-group-item d-flex justify-content-between align-items-center'>
        <span class="badge badge-primary badge-pill p-2"> ${gasto.categoria} </span> ${gasto.nombre}
        <span class="badge badge-primary badge-pill p-2"> $ ${gasto.cantidad}</span> ${gasto.fecha}
        <button class="btn btn-danger borrar-gasto" id="${gasto._id}-delete">Borrar</button>
        <button class="btn btn-success editar-gasto" id="${gasto._id}-edit">Editar</button>
      </li>
      `
  });
  gastos.forEach(gasto => {
    const btnBorrar = document.getElementById(gasto._id + "-delete");
    const btnEditar = document.getElementById(gasto._id + "-edit");
    btnBorrar.addEventListener('click', () => {
      deleteGasto(gasto._id, (res) => {
        if (res.success) {
          updateGastos(idUsuario, (res) => {
            mostrarGastos(res.gastos);
          });
        }
      })
    })
    btnEditar.addEventListener('click', () => {
      btnCancelarEditarGasto.classList.remove("d-none");
      btnEditarGasto.classList.remove("d-none");
      btnGasto.classList.add("d-none");
      autoCompletarFormulario(gasto);
    })
  });
}

function mostrarIngresos(ingresos) {
  contenedorIngresos.innerHTML = "";
  ingresos.forEach(ingreso => {
    contenedorIngresos.innerHTML += `
    <li class='list-group-item d-flex justify-content-between align-items-center'>
      ${ingreso.nombre}<span class="badge badge-primary badge-pill p-2"> $ ${ingreso.cantidad}</span> 
      ${ingreso.fecha}<button class="btn btn-danger borrar-ingreso" id="${ingreso._id}-delete">Borrar</button>
      <button class="btn btn-success editar-ingreso" id="${ingreso._id}-edit">Editar</button>
    </li>
    `
  });
  ingresos.forEach(ingreso => {
    const btnBorrar = document.getElementById(ingreso._id + "-delete");
    const btnEditar = document.getElementById(ingreso._id + "-edit");
    btnBorrar.addEventListener('click', () => {
      fetch('http://localhost:8000/api/ingresos-delete', {
        method: 'POST',
        body: JSON.stringify({
          ingresoId: ingreso._id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          actualizarIngresos();
          insertarPresupuesto(res.presupuesto, res.restante);
        })

    })
    btnEditar.addEventListener('click', () => {
      btnCancelarEditarIngreso.classList.remove("d-none");
      btnEditarIngreso.classList.remove("d-none");
      btnIngreso.classList.add("d-none");
      autoCompletarFormulario(ingreso);
    })
  });
}

function insertarPresupuesto(presupuesto, restante) {
  document.querySelector("#total").textContent = presupuesto;
  document.querySelector("#restante").textContent = restante;
}

function agregarGasto(event){
  const categoria = inputCategoria.value;
  const nombre = inputNombreGasto.value;
  const cantidad = Number(inputCantidad.value);
  const fecha = inputFecha.value;

  if (nombre === "" || cantidad === "" || fecha === "" || categoria == 0) {
    mostrarAlerta("Ambos campos son obligatorios", "error");
    return;
  } 
  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarAlerta("Cantidad no válida", "error");
    return;
  }

  const gasto = { categoria, nombre, cantidad, fecha, idUsuario };

  newGasto(gasto, (res) => {
    updateGastos(idUsuario, (res) => {
      mostrarGastos(res.gastos);
    })
  })
}

function mostrarAlerta(mensaje, tipo) {
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