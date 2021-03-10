const logout = document.getElementById("logout");
const formulario = document.getElementById("agregar-gasto");
const gastosListado = document.getElementById("gastos ul");

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
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

// Events

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

function preguntarPresupuesto() {
  const presupuestoUser = prompt("¿Cuál es tu presupuesto?");
  console.log(parseFloat(presupuestoUser));

  if (
    presupuestoUser === "" ||
    presupuestoUser === null ||
    isNaN(presupuestoUser) ||
    presupuestoUser <= 0
  ) {
    window.location.reload();
  }
}
