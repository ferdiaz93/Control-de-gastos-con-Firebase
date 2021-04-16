const logoutPerfil = document.querySelector(".logout");
const emailUsuario = document.getElementById('emailPerfil');

logoutPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  // Si el cierre de la autenticacion ha sido correcto entonces que se muestre por consola 'sign out'
  auth.signOut().then(() => {
    console.log("sign out");
    setTimeout(() => {
      window.location = "http://localhost:8000/login";
    }, 3000);
  });
});

fetch('http://localhost:8000/api/usuario/'+ idUsuario)
.then(function(res){
  return res.json()
})
.then(function(res){
  emailUsuario.innerText = res.usuario.email;
})

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
  }
});
