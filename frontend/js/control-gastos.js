const logout = document.getElementById("logout");
const formulario = document.getElementById("agregar-gasto");
const formIngreso = document.getElementById("agregar-ingreso");
const gastoListado = document.querySelector("#gastos ul");
const btnPerfil = document.getElementById('perfil');
const formPresupuesto = document.getElementById("formPresupuesto");
const idUsuario = localStorage.getItem('idUsuario');
const contenedorGastos = document.getElementById('contenedor-gastos');
const contenedorIngresos = document.getElementById('contenedor-ingresos');
const btnIngreso = document.getElementById('btnIngreso');
const btnEditarGasto = document.getElementById('btnEditarGasto');
const btnGasto = document.getElementById('btnGasto');
const btnCancelarEditarGasto = document.getElementById('btnCancelarEditarGasto');
const inputCategoria = document.getElementById("categoria");
const inputNombre = document.getElementById("gasto");
const inputCantidad = document.getElementById("cantidad");
const inputFecha = document.getElementById("fecha");
const btnPresupuesto = document.getElementById("btnPresupuesto");
const inputPresupuesto = document.getElementById('presupuesto');
// Events

function actualizarGastos(){
  fetch('http://localhost:8000/api/gastos/' +idUsuario)
  .then(function(res){
    return res.json();
  })
  .then(function(res){
    mostrarGastos(res.gastos);
  })
}

function actualizarPresupuesto(){
  fetch('http://localhost:8000/api/get-presupuesto/' + idUsuario)
  .then(res => res.json())
  .then(res => {
    mostrarPresupuestoRestante(res.usuario.presupuesto, res.usuario.restante);
  })
}

function mostrarPresupuestoRestante(presupuesto, restante){
  const presupuestoYRestante = {presupuesto, restante};
  ui.insertarPresupuesto(presupuestoYRestante);
}
 
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
      btnBorrar.addEventListener('click', ()=>{
        fetch('http://localhost:8000/api/gastos-delete', {
          method: 'POST',
          body: JSON.stringify({
          gastoId: gasto._id
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          actualizarGastos();
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

eventListeners();
function eventListeners() {
  btnGasto.addEventListener("click", agregarGasto);
  formIngreso.addEventListener('submit', agregarIngreso);
}


fetch('http://localhost:8000/api/usuario/'+ idUsuario)
.then(function(res){
  return res.json()
})
.then(function(res){
  btnPerfil.innerText = res.usuario.email;
  mostrarGastos(res.gastos);
  mostrarIngresos(res.ingresos);
  ui.insertarPresupuesto(res.usuario);
})

formPresupuesto.addEventListener('submit', (e)=>{
  e.preventDefault();
  const presupuesto = inputPresupuesto.value;
  fetch('/api/presupuesto', {
    method: "POST",
    body: JSON.stringify({
      presupuesto: presupuesto,
      user_id: idUsuario
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
  } )
  .then(function(res){
    return res.json();
  })
  .then(function(res){
    console.log(res);
    ui.insertarPresupuesto(res.usuario);
  })
})

logout.addEventListener("click", (e) => {
  e.preventDefault();
  // Si el cierre de la autenticacion ha sido correcto entonces que se muestre por consola 'sign out'
  auth.signOut().then(() => {
    console.log("sign out");
    fetch('http://localhost:8000/logout')
    .then(res => res.json())
    .then(res => {
      localStorage.removeItem("idUsuario");
      window.location = 'http://localhost:8000/';
    }) 

  });
});

//ENTIDADES



class UI {
  insertarPresupuesto(presupuestoRecibido) {
    //Leyendo valores
    const { presupuesto, restante } = presupuestoRecibido;

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
  
    }
  }
}

//Instanciar
const ui = new UI();
let presupuesto;

//FUNCIONES

function agregarGasto(e) {
  e.preventDefault();

  //Leyendo los datos del form
  const categoria = inputCategoria.value;
  const nombre = inputNombre.value;
  const cantidad = Number(inputCantidad.value);
  const fecha = inputFecha.value;
  // const cantidadIngreso = document.getElementById("cantidadIngreso").value;
  //Validacion
  if (nombre === "" || cantidad === "" || fecha === "" || categoria == 0) {
    ui.mostrarAlerta("Ambos campos son obligatorios", "error");
    return;
  } 
  if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarAlerta("Cantidad no válida", "error");
    return;
  }
 
  //Nuevo Object Gasto
  const gasto = { categoria, nombre, cantidad, id: Date.now(), fecha };

  

  //Request 
  fetch('http://localhost:8000/api/gastos', {
    method: 'POST',
    body: JSON.stringify({
      categoria: categoria,
      nombre: nombre,
      cantidad: cantidad,
      fecha: fecha,
      user_id: idUsuario
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    actualizarGastos();
  }) 

  //Nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //Mensaje de que se guardo correctamente
  ui.mostrarAlerta("Gasto agregado correctamente");

  ui.comprobarPresupuesto(presupuesto);
  //Reset del form
  formulario.reset();
}


function actualizarIngresos(){
  fetch('http://localhost:8000/api/ingresos/' +idUsuario)
  .then(function(res){
    return res.json();
  })
  .then(function(res){
    mostrarIngresos(res.ingresos);
  })
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
      btnBorrar.addEventListener('click', ()=>{
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

function agregarIngreso(e) {
  e.preventDefault();

  //Leyendo los datos del form
  const nombre = document.getElementById("nombreIngreso").value;
  const cantidad = Number(document.getElementById("cantidadIngreso").value);
  const fecha = document.getElementById("fechaIngreso").value;

  //Validacion
  if (nombre === "" || cantidad === "" || fecha === "") {
    ui.mostrarAlerta("Ambos campos son obligatorios", "error");
    return;
  } 
  if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarAlerta("Cantidad no válida", "error");
    return;
  }
 

  //Request 
  fetch('http://localhost:8000/api/ingresos', {
    method: 'POST',
    body: JSON.stringify({
      nombre: nombre,
      cantidad: cantidad,
      fecha: fecha,
      user_id: idUsuario
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    actualizarPresupuesto()
    //Mensaje de que se guardo correctamente
    ui.mostrarAlerta("Ingreso agregado correctamente");
    formulario.reset();
  })
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

function autoCompletarFormulario(gasto){
  let gasto_id = gasto._id;
  inputCategoria.value = gasto.categoria
  inputNombre.value = gasto.nombre
  inputCantidad.value = gasto.cantidad
  inputFecha.value = gasto.fecha;

  btnEditarGasto.addEventListener('click', (e) => {
    e.preventDefault();
    let categoria = inputCategoria.value
    let nombre = inputNombre.value
    let cantidad = inputCantidad.value
    let fecha = inputFecha.value
    console.log({gasto_id, categoria, nombre, cantidad, fecha})
    fetch('/api/gastos', {
      method: 'POST',
      body: JSON.stringify({gasto_id, categoria, nombre, cantidad, fecha}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      actualizarGastos();
    })
  });

  btnCancelarEditarGasto.addEventListener('click', (e) => {
    e.preventDefault();
    inputCategoria.value = "";
    inputNombre.value = "";
    inputCantidad.value = "";
    inputFecha.value = "";
    btnCancelarEditarGasto.classList.add("d-none");
    btnEditarGasto.classList.add("d-none");
    btnGasto.classList.remove("d-none");

  })
}
// //Funcion que elimina los ingresos
function eliminarIngreso(id) {
  //Elimina del objeto
  presupuesto.eliminarIngreso(id);

  //Elimina los gastos del HTML
  const { ingresos, restante } = presupuesto;
  ui.mostrarGastos(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);
}

function autoCompletarFormulario(ingreso){
  let ingreso_id = ingreso._id;
  nombre.value = ingreso.nombre
  cantidad.value = ingreso.cantidad
  fecha.value = ingreso.fecha;

  btnEditarIngreso.addEventListener('click', (e) => {
    e.preventDefault();
    let nombre = nombre.value
    let cantidad = cantidad.value
    let fecha = fecha.value
    console.log({ingreso_id, nombre, cantidad, fecha})
    fetch('/ingresos', {
      method: 'POST',
      body: JSON.stringify({ingreso_id, nombre, cantidad, fecha}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      actualizarIngresos();
    })
  });

  btnCancelarEditarIngreso.addEventListener('click', (e) => {
    e.preventDefault();
    nombre.value = "";
    cantidad.value = "";
    fecha.value = "";
    btnCancelarEditarIngreso.classList.add("d-none");
    btnEditarIngreso.classList.add("d-none");
    btnIngreso.classList.remove("d-none");

  })
}