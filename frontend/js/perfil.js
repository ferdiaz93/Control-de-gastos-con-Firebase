const logoutPerfil = document.querySelector(".logout");

logoutPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  // Si el cierre de la autenticacion ha sido correcto entonces que se muestre por consola 'sign out'
  auth.signOut().then(() => {
    console.log("sign out");
    setTimeout(() => {
      window.location = "http://127.0.0.1:5500/frontend/login.html";
    }, 3000);
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
      window.location = "http://127.0.0.1:5500/frontend/login.html";
    }, 3000);
  }
});
